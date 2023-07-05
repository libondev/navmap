import navmap from './core/index'
import Headings from './plugins/headings'

navmap(
  {
    plugins: [
      Headings({
        fillStyle: '#eee',
        selector: 'h1, h2, h3, h4, h5, p'
      })
    ]
  }
)

// setTimeout(cleanup, 1000)
