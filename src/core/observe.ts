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

export function createScrollObserver (
  viewport: Options['viewport'],
  scrollHandler: EventListener
) {
  document.addEventListener('scroll', scrollHandler, { passive: true })

  return () => {
    document.removeEventListener('scroll', scrollHandler)
  }
}

// export function onWindowSizeChange (fn) {
//   window.addEventListener('resize', fn)

//   return () => { window.removeEventListener('resize', fn) }
// }
