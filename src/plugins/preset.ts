import type { Plugin } from '../types'

export const PresetPlugin: Plugin = () => ({
  name: 'PresetPlugin',

  _cachedHeading: null,

  init (_, { canvas, viewport }) {
    // Hide the scrollbar of the viewport element
    if (__DEV__ && viewport.clientHeight > window.innerHeight) {
      console.warn(
        `[navmap]: The viewport element is higher than the height of the window,
            which means the viewport element may not be a proper scrollable container.
            Usually you need to set "height: 100%;" attribute for html,body element.`
      )
    }

    viewport.classList.add('hide-scrollbar')
    viewport.appendChild(canvas)
  },

  render (_, { viewport }) {
    this._cachedHeading = [...(viewport.querySelectorAll('h1, h2, h3, h4, h5, h6')! as unknown as HTMLElement[])]
    console.log('🎐 32: this._cachedHeading', this._cachedHeading)
  },

  draw (ctx) {
    ctx.rect(0, 0, 100, 20)
    ctx.fillStyle = 'red'

    ctx.fill()

    console.log(this)
  },

  destroy (_, { canvas, viewport }) {
    viewport.classList.remove('hide-scrollbar')
    viewport.removeChild(canvas)
  }
})
