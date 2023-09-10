import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import 'navmap/style.css'

import navmap from '../src/core'
import Contents from '../src/plugins/contents'

navmap({
  canvas: {
    // width: window.innerWidth * 0.03,
  },
  plugins: [
    Contents({
      radius: 0,
      selectors: {
        'h1,h2,h3': '#8e9eec',
        'h4,h5': '#42b883',
        'p:nth-child(odd)': '#ec8ebf',
        'p:nth-child(even)': '#f74e63',
        'pre': '#f8b85c',
        'table': '#6acab5'
      }
    }),
    // Popover({
    //   selector: 'h1,h2,h3,h4,h5,h6'
    // })
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

// custom plugin
import Contents from 'navmap/contents'

// hide scrollbar style
import 'navmap/style.css'

navmap({
  canvas: {
    width: 100
  },
  plugins: [
    Contents({
      radius: 8,
      selectors: {
        'h1,h2,h3': '#8e9eec',
        'h4,h5': '#42b883',
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

### Heading 3
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

#### Heading 4
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel debitis illum voluptatum dolor totam nobis dolorem, officiis, tenetur, deleniti dolorum excepturi? Dolor dolorem minus asperiores praesentium amet pariatur dicta.

##### Heading 5
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
