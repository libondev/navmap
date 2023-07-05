import navmap from 'navmap'
import Headings from 'navmap/headings'
import 'navmap/style.css'

navmap({
  plugins: [
    Headings({
      fillStyle: '#eee',
      selector: 'h1, h2, h3, h4, h5, p'
    })
  ]
})
