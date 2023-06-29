export type LifecycleFn = (
  ctx: CanvasRenderingContext2D,
  opt: Pick<Options, 'viewport' | 'canvas'>
) => void

export type Plugin = (config: UserOptions) => ({
  init: LifecycleFn
  draw: LifecycleFn
  render: LifecycleFn
  destroy: LifecycleFn
})

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

export type Options = Required<
  Omit<UserOptions, 'plugins' | 'canvas'>
> & {
  canvas: HTMLCanvasElement
  plugins: Array<ReturnType<Plugin>>
}
