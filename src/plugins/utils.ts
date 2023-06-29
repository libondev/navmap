import type { Options } from '../types'

export function getPluginLifecycle (options: Options) {
  const { plugins, root } = options

  const init = () => {
    plugins.forEach(plugin => { plugin.init(root) })
  }

  const draw = () => {
    plugins.forEach(plugin => { plugin.draw(root) })
  }

  const destroy = () => {
    plugins.forEach(plugin => { plugin.destroy(root) })
  }

  return {
    init,
    draw,
    destroy
  }
}
