import type { Plugin } from '../types'

export const BoardsPlugin: Plugin = () => ({
  name: 'Boards',
  el: null,
  init(root) {
    const canvas = Object.assign(document.createElement('canvas'), {

    })

    root.appendChild(canvas)
    this.el = canvas
  },
  draw() { },
  destroy(root) {
    root.removeChild(this.el)
    this.el = null
  }
})

export const PresetPlugin: Plugin = () => ({
  init(root) {
    // Hide the scrollbar of the root element
    if (__DEV__ && root.clientHeight > window.innerHeight) {
      console.warn(`[navmap]: The root element is higher than the height of the window,
            which means the root element may not be a proper scrollable container.
            Usually you need to set "height: 100%;" attribute for html,body element.`)

      while (root.clientHeight > window.innerHeight) {
        root = root.parentNode as HTMLElement
      }
    }

    root.classList.add('hide-scrollbar')
  },
  draw() { },
  destroy() { }
})
