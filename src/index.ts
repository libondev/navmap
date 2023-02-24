import './style.css'

interface Options {
  container?: Element | string

  /**
   * The width of the canvas element for final rendering
   * @default 80
   */
  canvasWidth?: number
}

function createCanvasElement ({ width, height }: { width: number, height: number }) {
  const canvas = Object.assign(
    document.createElement('canvas'),
    {
      width,
      height,
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
  const {
    container,
    canvasWidth
  } = Object.assign({
    container: document.body,
    canvasWidth: 20
  }, options)

  const viewport: HTMLElement = typeof container === 'string'
    ? document.querySelector(container)!
    : container

  if (viewport == null) {
    throw new Error('[navmap error]: Container not found!')
  }

  const { canvas, context } = createCanvasElement({ width: canvasWidth, height: window.innerHeight })

  let scale: number
  let unsubscribe: () => void

  function drawElementRects () {
    const { clientHeight } = viewport

    scale = canvas.clientHeight / clientHeight

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, canvasWidth, canvas.height)

    // 绘制底纹
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvasWidth, canvas.height)

    context.scale(1, scale)

    const elements = [...document.querySelectorAll('h1,h2,h3,h4,h5')]

    context.beginPath()
    context.fillStyle = '#f00'
    elements.forEach(el => {
      const { offsetHeight, offsetTop } = el as HTMLElement

      context.rect(0, offsetTop, canvasWidth, offsetHeight)
    })

    console.log(elements)

    context.closePath()
    context.fill()
  }

  function bindEvents (canvas: HTMLCanvasElement) {
    let timeoutId = 0

    const resize = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        canvas.height = window.innerHeight

        drawElementRects()
      }, 200)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', drawElementRects)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', resize)
    }
  }

  function initialize () {
    drawElementRects()

    document.body.classList.add('hide-scrollbar')
    unsubscribe = bindEvents(canvas)
  }

  function destroy () {
    document.body.classList.remove('hide-scrollbar')
    unsubscribe()
    canvas.remove()
  }

  initialize()

  return {
    destroy
  }
}

export default navmap
