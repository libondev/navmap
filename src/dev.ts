import navmap from './core/index'
import { Headings } from './plugins/headings'

navmap(
  {
    plugins: [
      Headings
    ]
  }
)

// setTimeout(cleanup, 1000)
