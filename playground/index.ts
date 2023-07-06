import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import navmap from '../src/core/index'
import Headings from '../src/plugins/headings'

navmap({
  canvas: {
    width: window.innerWidth * 0.05,
  },
  plugins: [
    Headings({
      fillStyle: '#eee',
      selector: 'h1, h2, h3, p:nth-child(even), pre'
    })
  ]
})


const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value
          }</code></pre>`
      } catch (_) { }
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

const html = md.render(`
# Heading 1
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

## Heading 2
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

### Heading 3
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

#### Heading 4
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

##### Heading 5
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.


\`\`\`js
import navmap from 'navmap'
import Headings from 'navmap/headings'

navmap({
  canvas: {
    width: 100
  },
  plugins: [
    Headings({
      fillStyle: '#eee',
      selector: 'h1, h2, h3, p:first-child'
    })
  ]
})
\`\`\`
`)

document.querySelector('#app')!.innerHTML = html
