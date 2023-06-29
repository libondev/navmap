import type { Options } from '../types'

export function createViewObserver (
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

export function onWindowSizeChange (fn) {
  window.addEventListener('resize', fn)

  return () => { window.removeEventListener('resize', fn) }
}
