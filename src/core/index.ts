import '../style.css'

import type { UserOptions } from '../types'
import { createElementObserver, createWindowsObserver } from './observe'
import { getDefaultConfig, resolvePluginHooks } from './utils'

export default function navmap (options: UserOptions = {}) {
  const config = getDefaultConfig(options)
  const { init, draw, update, destroy } = resolvePluginHooks(config)

  const rootObserve = createElementObserver(config, update)
  const windowsObserve = createWindowsObserver({ config, init, draw })

  return () => {
    destroy()
    rootObserve()
    windowsObserve()
  }
}
