import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import navmap from '../src/core/index'
import Contents from '../src/plugins/contents'

navmap({
  canvas: {
    width: window.innerWidth * 0.05,
  },
  plugins: [
    Contents({
      selectors: {
        'h1, h2': '#8e9eec',
        'h3': '#4997f0',
        'p:nth-child(odd)': '#ec8ebf',
        'p:nth-child(even)': '#f74e63',
        'pre': '#f8b85c',
        'table': '#6acab5'
      }
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
\`Playground code\`
\`\`\`js
import navmap from 'navmap'
import Contents from 'navmap/contents'

navmap({
  canvas: {
    width: 100
  },
  plugins: [
    Contents({
      selectors: {
        'h1, h2': '#8e9eec',
        'h3': '#4997f0',
        'p:nth-child(odd)': '#ec8ebf',
        'p:nth-child(even)': '#f74e63',
        'pre': '#f8b85c',
        'table': '#6acab5'
      }
    })
  ]
})
\`\`\`

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

## Table
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

`)

document.querySelector('#app')!.innerHTML = html
