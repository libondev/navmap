import type { Plugin } from '../types'

type PluginContext = {
  states: {
    recordY: number
    scaleRatio: number
    scrollHeight: number
    scrollTo: number
    positions: Array<{ offsetHeight: number, offsetTop: number }>
  }
} & Record<
  'onPointerDown' | 'onPointerMove' | 'onPointerUp',
  (this: PluginContext, ev: PointerEvent) => void
>

export const PresetPlugin: Plugin<PluginContext> = () => ({
  init (_, { canvas, viewport }) {
    // if (__DEV__ && viewport.clientHeight > window.innerHeight) {
    //   console.warn(
    //     `[navmap]: The viewport element is higher than the height of the window,
    //         which means the viewport element may not be a proper scrollable container.
    //         Usually you need to set "height: 100%;" attribute for html,body element.`
    //   )
    // }

    viewport.classList.add('hide-scrollbar')
    viewport.appendChild(canvas)

    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)

    canvas.addEventListener('pointerdown', this.onPointerDown)
  },

  update (_, { viewport }) {
    const headings = Array.from(viewport.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'))

    this.states.positions = headings.map(({ offsetHeight, offsetTop }) => ({ offsetHeight, offsetTop }))
  },

  draw (ctx, { canvas, canvas: { width, height }, viewport }) {
    const { states } = this
    const scaleRatio = canvas.offsetHeight / viewport.offsetHeight
    const scrollTop = visualViewport.pageTop

    Object.assign(states, {
      scaleRatio,
      scrollHeight: height * scaleRatio
    })

    ctx.beginPath()

    ctx.fillStyle = '#00000030'
    // 绘制标题块
    states.positions.forEach(({ offsetHeight, offsetTop }) => {
      // 标题块的位置是固定的, 但是高度是缩放的, 所以需要乘以缩放比例
      ctx.rect(0, offsetTop * scaleRatio, width, offsetHeight * scaleRatio)
    })
    ctx.closePath()

    ctx.fill()

    // 绘制视口
    ctx.fillStyle = '#000'

    ctx.strokeRect(0, scrollTop * scaleRatio, width, height * scaleRatio)
  },

  destroy (_, { canvas, viewport }) {
    viewport.classList.remove('hide-scrollbar')
    viewport.removeChild(canvas)
    canvas.addEventListener('pointerdown', this.onPointerDown)
  },

  states: {
    recordY: 0, // 记录鼠标按下时的位置
    scaleRatio: 0, // 缩放比例
    scrollHeight: 0, // 滚动条高度
    scrollTo: document.documentElement.scrollTop, // 上一次滚动的位置
    positions: [] // 标题块的位置
  },

  onPointerDown (ev) {
    ev.preventDefault()
    const { states, states: { scrollTo, scrollHeight, scaleRatio } } = this

    const y = ev.clientY

    states.recordY = y

    // 只有按下的位置不在滚动条上才会触发滚动
    // if (y < scrollTo * scaleRatio && y > scrollTo * scaleRatio + scrollHeight) {
    this.states.scrollTo = document.documentElement.scrollTop = (y - scrollHeight / 2) / scaleRatio
    // }

    document.addEventListener('pointermove', this.onPointerMove)
    document.addEventListener('pointerup', this.onPointerUp, { once: true })
  },

  onPointerMove ({ clientY }) {
    const { states } = this

    const targetScrollTop = states.scrollTo + (clientY - states.recordY) / states.scaleRatio

    // 将在滚动条上的鼠标位置转换为视口上的位置
    document.documentElement.scrollTop = targetScrollTop
  },

  onPointerUp () {
    document.removeEventListener('pointermove', this.onPointerMove)
  }
})
