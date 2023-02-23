import './style.css'

interface Options {
  container?: Element | string
}

function createCanvasElement () {
  const canvas = Object.assign(
    document.createElement('canvas'),
    {
      width: 80,
      height: window.innerHeight,
      className: 'navmap-canvas'
    }
  )

  document.body.appendChild(canvas)

  return {
    canvas,
    context: canvas.getContext('2d')!
  }
}

function navmap (options?: Options) {
  const settings = Object.assign({
    container: document.body
  }, options)

  const viewport: HTMLElement = typeof settings.container === 'string'
    ? document.querySelector(settings.container)!
    : settings.container

  if (viewport == null) {
    throw new Error('[navmap error]: Container not found!')
  }

  const { canvas, context } = createCanvasElement()

  let scale: number
  let unsubscribe: () => void

  function draw () {
    const { clientHeight } = viewport

    scale = canvas.clientHeight / clientHeight

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制底纹
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.scale(1, scale)

    const elements = [...document.querySelectorAll('h1,h2,h3,h4,h5')]

    context.beginPath()
    context.fillStyle = '#f00'
    elements.forEach(el => {
      const { top, height } = el.getBoundingClientRect()

      context.rect(0, top, canvas.width, height)
    })

    console.log(elements)

    context.fill()
  }

  function bindEvents (canvas: HTMLCanvasElement) {
    let timeoutId = 0

    const resize = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        canvas.height = window.innerHeight

        draw()
      }, 200)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', draw)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', resize)
    }
  }

  function initialize () {
    draw()

    unsubscribe = bindEvents(canvas)
  }

  function destroy () {
    unsubscribe()
    canvas.remove()
  }

  initialize()

  return {
    destroy
  }
}

export default navmap
