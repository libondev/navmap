import '../style.css'

import type { UserOptions } from '../types'

import { getPluginLifecycle } from '../plugins/utils'
import { getDefaultConfig } from './utils'
import {
  destroyExecutor,
  drawExecutor,
  initExecutor
} from './lifecycle'

export default function navmap (options: UserOptions = {}) {
  const config = getDefaultConfig(options)
  console.log("🎃 14: config", config)

  const { init, draw, destroy } = getPluginLifecycle(config)

  init()
}
