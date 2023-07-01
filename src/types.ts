export type LifecycleFn<Context> = (
  this: Context,
  ctx: CanvasRenderingContext2D,
  opt: Pick<Options, 'viewport' | 'canvas'>
) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Plugin<Params = Record<string, any>> = (config: UserOptions) => ({
  enforce?: 'pre' | 'post'
  init?: LifecycleFn<Params>
  draw?: LifecycleFn<Params>
  update?: LifecycleFn<Params>
  destroy?: LifecycleFn<Params>
} & Params)

export interface CanvasConfig {
  className?: string
}

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
