import '../style.css'

import type { UserOptions } from '../types'
import { createElementObserver, createScrollObserver } from './observe'
import { createPluginHooks, getDefaultConfig } from './utils'

export type * from '../types'

export default function navmap (options: UserOptions = {}) {
  const config = getDefaultConfig(options)
  const { init, draw, render, destroy } = createPluginHooks(config)

  const rootObserve = createElementObserver(config.viewport, render)
  const scrollObserve = createScrollObserver(config.viewport, draw)

  new Promise<void>((resolve) => {
    init()
    resolve()
  }).then(draw)

  return () => {
    destroy()
    rootObserve()
    scrollObserve()
  }
}
