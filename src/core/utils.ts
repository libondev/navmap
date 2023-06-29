import type { UserOptions, Options } from '../types'
import { BoardsPlugin, PresetPlugin } from '../plugins/preset'


export function getDefaultConfig(options: UserOptions): Options {
  if (options.root == null) {
    options.root = document.body
    __DEV__ && console.warn('[navmap]: The root must be a HTML element, now use "document.body".')
  }

  if (options.plugins == null) {
    options.plugins = []
  } else if (!Array.isArray(options.plugins)) {
    options.plugins = [options.plugins]
    __DEV__ && console.warn('[navmap]: The plugins must be an array, now use "[plugins]".')
  }

  const normalizedPlugins = options.plugins.map(plugin => plugin(options))

  return {
    root: options.root,
    plugins: [
      BoardsPlugin(options),
      PresetPlugin(options),
      ...normalizedPlugins
    ]
  }
}
