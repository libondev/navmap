import Scrollbar from '../plugins/scrollbar'
import type { Options, UserOptions } from '../types'

export type PluginStates = ReturnType<typeof createPluginStates>

export function getCanvasElement (options: UserOptions) {
  const canvasElement = Object.assign(
    document.createElement('canvas'),
    {
      height: window.innerHeight,
      width: options.canvas?.width || 15,
      style: 'position:fixed;right:0;top:0',
      className: options.canvas?.className ?? 'navmap-canvas'
    }
  )

  return canvasElement
}

export function getDefaultConfig (options: UserOptions) {
  if (__DEV__ && 'viewport' in options && options.viewport == null) {
    console.warn('[navmap]: The viewport must be a HTML element.')
  }
  options.viewport ??= document.body

  if (__DEV__ && !Array.isArray(options.plugins)) {
    console.warn('[navmap]: The plugins must be an array.')
  }

  // convert to array
  options.plugins = options.plugins ? Array.isArray(options.plugins) ? options.plugins : [options.plugins] : []

  // last draw
  options.plugins.push(Scrollbar)

  const states = createPluginStates()

  return {
    viewport: options.viewport as HTMLElement,
    canvas: getCanvasElement(options),
    states,
    plugins: options.plugins
  } as Options
}

// all plugins share the same states
export function createPluginStates () {
  return {
    scrollTop: 0,
    scaleRatio: 1,
    scrollHeight: 0
  }
}

// Gets all the correct plugin hooks
export function resolvePluginHooks ({ canvas, viewport, states, plugins }: Options) {
  const init = []
  const draw = []
  const update = []
  const destroy = []

  plugins.forEach(plugin => {
    const insertMethod = plugin.enforce === 'pre' ? 'unshift' : 'push'

    if (typeof plugin.init === 'function') {
      init[insertMethod](plugin.init.bind(plugin))
    }

    if (typeof plugin.draw === 'function') {
      draw[insertMethod](plugin.draw.bind(plugin))
    }

    if (typeof plugin.update === 'function') {
      update[insertMethod](plugin.update.bind(plugin))
    }

    if (typeof plugin.destroy === 'function') {
      destroy[insertMethod](plugin.destroy.bind(plugin))
    }
  })

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D & { reset: () => void }
  const opt = { canvas, viewport, states }

  return {
    init: () => { init.forEach(fn => fn(ctx, opt)) },
    draw: () => {
      typeof ctx.reset === 'function' ? ctx.reset() : ctx.restore()

      draw.forEach(fn => fn(ctx, opt))
    },
    update: () => { update.forEach(fn => fn(ctx, opt)) },
    destroy: () => { destroy.forEach(fn => fn(ctx, opt)) }
  }
}
