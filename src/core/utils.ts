// import { Headings } from '../plugins/headings'
import { Scrollbar } from '../plugins/scrollbar'
import type { Options, UserOptions } from '../types'

export type PluginStates = ReturnType<typeof createPluginStates>

export function getCanvasElement (options: UserOptions) {
  const canvasEl = Object.assign(
    document.createElement('canvas'),
    {
      width: options.canvas?.width ?? 20,
      height: options.canvas?.height ?? window.innerHeight,
      className: `navmap-canvas ${options.canvas?.className || ''}`,
      style: 'position:fixed;right:0;top:0'
    }
  )

  return canvasEl
}

export function getDefaultConfig (options: UserOptions, states: PluginStates) {
  if (__DEV__ && 'viewport' in options && options.viewport == null) {
    console.warn('[navmap]: The viewport must be a HTML element.')
  }
  options.viewport ??= document.body

  if (__DEV__ && !Array.isArray(options.plugins)) {
    console.warn('[navmap]: The plugins must be an array.')
  }

  // convert to array
  options.plugins = options.plugins ? Array.isArray(options.plugins) ? options.plugins : [options.plugins] : []

  options.plugins.unshift(Scrollbar)

  const normalizedPlugins = options.plugins.map(plugin => plugin(states))

  return {
    viewport: options.viewport as HTMLElement,
    canvas: getCanvasElement(options),
    plugins: normalizedPlugins
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
export function resolvePluginHooks ({ canvas, viewport, plugins }: Options) {
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

  const ctx = canvas.getContext('2d')
  const opt = { canvas, viewport }

  return {
    init: () => { init.forEach(fn => fn(ctx, opt)) },
    draw: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      draw.forEach(fn => fn(ctx, opt))
    },
    update: () => { update.forEach(fn => fn(ctx, opt)) },
    destroy: () => { destroy.forEach(fn => fn(ctx, opt)) }
  }
}
