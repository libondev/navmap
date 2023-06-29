import './style.css'

interface UserOptions {
  container?: Element | string

  /**
   * The width of the canvas element for final rendering
   * @default 20
   */
  canvasWidth?: number

  /**
   * The level of headings to be collected
   * @default [1,2,3,4,5]
   */
  elementStyles?: []
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

// function createHeadingElements(container: HTMLElement) {

// }

function navmap (options?: UserOptions) {
  const {
    container,
    canvasWidth,
    headingLevels
  } = Object.assign({
    headingLevels: [1, 2, 3, 4, 5],
    container: document.body,
    canvasWidth: 10
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
  let elements: HTMLElement[]

  const elementPositions: number[][] = []

  function drawElementRects () {
    const { clientHeight } = viewport

    scale = canvas.clientHeight / clientHeight

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, canvasWidth, canvas.height)

    // 绘制底纹
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvasWidth, canvas.height)

    context.scale(1, scale)

    context.beginPath()
    context.fillStyle = '#f00'

    elements.forEach(({ offsetHeight, offsetTop }) => {
      context.rect(0, offsetTop, canvasWidth, offsetHeight)
    })

    context.closePath()
    context.fill()

    context.fillStyle = 'rgba(0, 0, 0, .2)'
    context.fillRect(0, document.documentElement.scrollTop, canvasWidth, window.innerHeight)
  }

  function bindEvents (canvas: HTMLCanvasElement) {
    let timeoutId = 0

    const resize = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        canvas.height = window.innerHeight

        drawElementRects()
      }, 100)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', drawElementRects)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', drawElementRects)
    }
  }

  function initialize () {
    elements = [...document.querySelectorAll('h' + headingLevels.join(',h'))] as HTMLElement[]

    const fragment = Object.assign(document.createElement('div'), { className: 'heading-container' })

    drawElementRects()

    elements.forEach((item, index) => {
      item.setAttribute('data-nav-key', String(index))
      const position = [item.offsetTop, item.offsetHeight]

      const cloneElement = Object.assign(item.cloneNode(true), {
        className: 'map-heading',
        style: `top: ${position[0] * scale}px`
      })

      elementPositions.push(position)

      fragment.appendChild(cloneElement)
    })

    document.body.append(fragment)

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
