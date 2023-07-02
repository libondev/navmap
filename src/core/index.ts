import '../style.css'

import type { UserOptions } from '../types'
import { createElementObserver, createWindowsObserver } from './observe'
import { createPluginHooks, getDefaultConfig } from './utils'

export type * from '../types'

export default function navmap (options: UserOptions = {}) {
  const config = getDefaultConfig(options)
  const { init, draw, update, destroy } = createPluginHooks(config)

  const rootObserve = createElementObserver(config, update)
  const windowsObserve = createWindowsObserver(config, draw)

  new Promise<void>((resolve) => {
    init()
    resolve()
  }).then(draw)

  return () => {
    destroy()
    rootObserve()
    windowsObserve()
  }
}
