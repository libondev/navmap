// import type { Plugin } from './core'
import navmap from './core/index'
import { Headings } from './plugins/headings'

const cleanup = navmap(
  {
    plugins: [
      Headings
    ]
  }
)

console.log(cleanup)
// cleanup()
