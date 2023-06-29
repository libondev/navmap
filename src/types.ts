export type Plugin = (config: UserOptions) => ({
  init (container: Options['root']): void
  draw (container: Options['root']): void
  destroy(container: Options['root']): void
  [key: string]: any
})

export interface UserOptions {
  root?: HTMLElement | Element
  plugins?: Plugin[]
}

export interface Options {
  root: UserOptions['root']
  plugins: ReturnType<Plugin>[]
}
