# navmap

Show all the titles on your page in the scrollbar. [Playground](https://libondev.github.io/navmap)

## Install

```sh
npm install navmap
```

## Usage

```ts
import navmap from 'navmap'
// hide scrollbar styles
import 'navmap/style.css'

const options: Options = { ... }

const unmount = navmap(options)

// cleanup
unmount()
```

## Options
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `viewport` | `HTMLElement` \| `Element` | `document.body` | The scrolling container you want to observe. |
| `plugins` | `Array` | `[]` | The plugins you want to use. |
| `canvas` | `{width?:number; height?:number; className?:string}` | `{width: 15, height:window.innerHeight, className: ''}` | The canvas options. |

### Basic Plugin

The library has a built-in [scrollbar plugin](https://github.com/libondev/navmap/blob/main/src/plugins/scrollbar.ts), and an additional [headings plugin](https://github.com/libondev/navmap/blob/main/src/plugins/headings.ts) is available, and you can also build your own plugin according to the effect you want.

**use `Headings` plugin**
```ts
import Headings from 'navmap/headings'

const options: Options = {
  plugins: [
    Headings
  ]
}

navmap(options)
```

### Plugin Types
```ts
export type LifecycleFn<PluginContext> = (
  this: PluginContext,
  ctx: CanvasRenderingContext2D,
  opt: Pick<Options, 'viewport' | 'canvas'>
) => void

export type Plugin<Context = Record<string, any>> = (config: PluginStates) => ({
  // The order in which the plug-in executes when invoked
  enforce?: 'pre' | 'post'

  // The plugin initializes the hook function (which executes only once)
  init?: LifecycleFn<Context>

  // Executed when viewport scrolls / viewport size changes
  draw?: LifecycleFn<Context>

  // When the viewport descendant element changes
  // (it will be executed immediately after the application is mounted)
  update?: LifecycleFn<Context>

  // The plugin destroys the hook function (which executes only once)
  destroy?: LifecycleFn<Context>
} & Context)
```

Thank you for using.
