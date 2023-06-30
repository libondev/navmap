export type LifecycleFn = (
  ctx: CanvasRenderingContext2D,
  opt: Pick<Options, 'viewport' | 'canvas'>
) => void

export type Plugin = (config: UserOptions) => ({
  enforce?: 'pre' | 'post'
  init?: LifecycleFn
  draw?: LifecycleFn
  render?: LifecycleFn
  destroy?: LifecycleFn
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

export interface Options {
  viewport: HTMLElement
  canvas: HTMLCanvasElement
  plugins: Array<ReturnType<Plugin>>
}
