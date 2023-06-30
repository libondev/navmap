import type { Options } from '../types'

export function createElementObserver (
  root: Options['viewport'],
  renderHandler: MutationCallback
) {
  const observe = new MutationObserver(renderHandler)

  observe.observe(root, { childList: true, subtree: true })

  return () => {
    observe.takeRecords()
    observe.disconnect()
  }
}

export function createWindowsObserver (
  config: Options,
  redraw: () => void
) {
  const resizeCanvasHeight = () => {
    config.canvas.height = window.innerHeight
    redraw()
  }

  document.addEventListener('scroll', redraw, { passive: true })
  window.addEventListener('resize', resizeCanvasHeight, { passive: true })

  return () => {
    document.removeEventListener('scroll', redraw)
    window.removeEventListener('resize', resizeCanvasHeight)
  }
}
