import type { PluginStates } from './core/utils'

export type LifecycleFn<PluginContext> = (
  this: PluginContext,
  ctx: CanvasRenderingContext2D,
  opt: { states: PluginStates } & Pick<Options, 'viewport' | 'canvas'>
) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Plugin<Context = Record<string, any>> = {
  enforce?: 'pre' | 'post'
  init?: LifecycleFn<Context>
  draw?: LifecycleFn<Context>
  update?: LifecycleFn<Context>
  destroy?: LifecycleFn<Context>
} & Context

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
  states: PluginStates
  canvas: HTMLCanvasElement
  plugins: Plugin[]
}
