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
  { config: { canvas, viewport, states }, draw, init }:
  { config: Options, draw: () => void, init: () => void }
) {
  const resizeCanvasHeight = () => {
    states.scrollTop = visualViewport.pageTop
    states.scaleRatio = (canvas.height = window.innerHeight) / viewport.offsetHeight
    states.scrollHeight = canvas.height * states.scaleRatio

    draw()
  }

  const scrollDrawerHandle = () => {
    states.scrollTop = visualViewport.pageTop
    draw()
  }

  // next frame
  new Promise<void>((resolve) => {
    init() // trigger plugins update hook
    resolve()
  }).then(resizeCanvasHeight)

  window.addEventListener('resize', resizeCanvasHeight, { passive: true })
  document.addEventListener('scroll', scrollDrawerHandle, { passive: true })

  return () => {
    window.removeEventListener('resize', resizeCanvasHeight)
    document.removeEventListener('scroll', scrollDrawerHandle)
  }
}
