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
    Headings({
      fillStyle: '#ccc',
      selector: 'h1, h2, h3, h4, h5, p'
    })
  ]
}

navmap(options)
```

### Plugin Types
```ts
type PluginStates = {
  scrollTop: number;
  scaleRatio: number;
  scrollHeight: number;
}

export type LifecycleFn<PluginContext> = (
  this: PluginContext,
  ctx: CanvasRenderingContext2D,
  opt: { states: PluginStates } & Pick<Options, 'viewport' | 'canvas'>
) => void

export type Plugin<Context = Record<string, any>> = {
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
} & Context
```

## Custom Plugin

The plugin has 4 hook functions, but they are all optional, meaning it is allowed not to set them. If you want to develop your own plugin, you can check the [headings plugin](https://github.com/libondev/navmap/blob/main/src/plugins/headings.ts) example for extended development. The this inside the plug-in hook function points to the plug-in itself, so you can set other properties on the plug-in to help you complete the function you want.

```ts
import navmap, { Plugin } from 'navmap'

const MyObjectPlugin: Plugin = {
  init() {
    // ...
  },
  draw() {
    // ...
  },
  update() {
    // ...
  },
  destroy() {
    // ...
  }
}

const MyFunctionPlugin = (): Plugin => ({
  init() {
    // ...
  },
  draw() {
    // ...
  },
  update() {
    // ...
  },
  destroy() {
    // ...
  }
})

const options: Options = {
  plugins: [
    MyObjectPlugin,
    MyFunctionPlugin()
  ]
}

navmap(options)
```

Thank you for using. Finally, I wish you a good time. If you have any questions or dissatisfaction, you can leave a message in [issues](https://github.com/libondev/navmap/issues) to discuss together.
