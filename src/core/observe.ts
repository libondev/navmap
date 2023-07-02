import type { Options } from '../types'

export function createElementObserver (
  { viewport }: Options,
  updater: MutationCallback
) {
  const observe = new MutationObserver(updater)

  observe.observe(viewport, { childList: true, subtree: true })

  return () => {
    observe.takeRecords()
    observe.disconnect()
  }
}

export function createWindowsObserver (
  { canvas }: Options,
  drawer: () => void
) {
  const resizeCanvasHeight = () => {
    canvas.height = window.innerHeight
    drawer()
  }

  document.addEventListener('scroll', drawer, { passive: true })
  window.addEventListener('resize', resizeCanvasHeight, { passive: true })

  return () => {
    document.removeEventListener('scroll', drawer)
    window.removeEventListener('resize', resizeCanvasHeight)
  }
}
