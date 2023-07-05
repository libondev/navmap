import navmap from './core/index'
import { Headings } from './plugins/headings'

const cleanup = navmap(
  {
    plugins: [
      Headings
    ]
  }
)

// setTimeout(cleanup, 1000)
