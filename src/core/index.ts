import '../style.css'

import type { UserOptions } from '../types'
import { createViewObserver } from './observe'
import { createPluginHooks, getDefaultConfig } from './utils'

export default function navmap (options: UserOptions = {}) {
  const config = getDefaultConfig(options)
  const { init, draw, render, destroy } = createPluginHooks(config)

  const observe = createViewObserver(config.viewport, render)

  new Promise<void>((resolve) => {
    init()
    resolve()
  }).then(draw)

  return () => {
    destroy()
    observe()
  }
}
