import type { PluginStates } from './core/utils'

export type LifecycleFn<PluginContext> = (
  this: PluginContext,
  ctx: CanvasRenderingContext2D,
  opt: Pick<Options, 'viewport' | 'canvas'>
) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Plugin<Context = Record<string, any>> = (config: PluginStates) => ({
  enforce?: 'pre' | 'post'
  init?: LifecycleFn<Context>
  draw?: LifecycleFn<Context>
  update?: LifecycleFn<Context>
  destroy?: LifecycleFn<Context>
} & Context)

export interface UserOptions {
  viewport?: HTMLElement | Element
  plugins?: Plugin[]
  canvas?: {
    width?: number
    height?: number
    className?: string
  }
}

export interface Options {
  viewport: HTMLElement
  canvas: HTMLCanvasElement
  plugins: Array<ReturnType<Plugin>>
}
