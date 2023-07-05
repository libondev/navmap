import '../style.css'

import type { UserOptions } from '../types'
import { createElementObserver, createWindowsObserver } from './observe'
import { createPluginStates, getDefaultConfig, resolvePluginHooks } from './utils'

export type * from '../types'

export default function navmap (options: UserOptions = {}) {
  const states = createPluginStates()

  const config = getDefaultConfig(options, states)
  const { init, draw, update, destroy } = resolvePluginHooks(config, states)

  const rootObserve = createElementObserver(config, update)
  const windowsObserve = createWindowsObserver({ config, states, init, draw })

  return () => {
    destroy()
    rootObserve()
    windowsObserve()
  }
}
