import navmap from '../src/core/index'
import Headings from '../src/plugins/headings'

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
