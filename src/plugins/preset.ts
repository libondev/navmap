import type { Plugin } from '../types'

type PluginContext = {
  states: {
    recordY: number
    scaleRatio: number
    scrollHeight: number
    scrollTop: number
    deltaY: number
  }
  cachedPositions: Array<{ offsetHeight: number, offsetTop: number }>
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

    this.cachedPositions = headings.map(({ offsetHeight, offsetTop }) => ({ offsetHeight, offsetTop }))
  },

  draw (ctx, { canvas, canvas: { width, height }, viewport }) {
    const { states, states: { scrollTop }, cachedPositions } = this
    const scaleRatio = canvas.offsetHeight / viewport.offsetHeight

    Object.assign(states, {
      scaleRatio,
      scrollHeight: height * scaleRatio
    })

    ctx.fillStyle = '#00000030'
    ctx.beginPath()

    // 绘制标题块
    cachedPositions.forEach(({ offsetHeight, offsetTop }) => {
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

  cachedPositions: [],

  states: {
    recordY: 0, // 记录鼠标按下时的位置
    deltaY: 0, // 鼠标按下的位置距离滚动条顶部的位置
    scaleRatio: 0, // 缩放比例
    scrollHeight: 0, // 滚动条高度
    get scrollTop () {
      return visualViewport.pageTop
    } // 上一次滚动的位置
  },

  onPointerDown (ev) {
    ev.preventDefault()
    const { states, states: { scrollTop, scrollHeight, scaleRatio } } = this

    const y = ev.clientY

    states.recordY = y

    // 点击非滚动条的位置时, 将视口滚动到点击位置
    if (y <= scrollTop * scaleRatio || y >= scrollTop * scaleRatio + scrollHeight) {
      states.deltaY = y - scrollHeight / 2
      document.documentElement.scrollTop = states.deltaY / scaleRatio
    } else {
      // 点击滚动条时, 重新计算按下的位置与滚动条顶部的距离
      // states.deltaY = y - scrollTop + scrollHeight / 2

      console.log(states.deltaY)
    }

    document.addEventListener('pointermove', this.onPointerMove)
    document.addEventListener('pointerup', this.onPointerUp, { once: true })
  },

  onPointerMove ({ clientY }) {
    const { recordY, scaleRatio, deltaY } = this.states

    // 将在滚动条上的位置转换为视口上的位置
    document.documentElement.scrollTop = (clientY - recordY + deltaY) / scaleRatio
  },

  onPointerUp () {
    document.removeEventListener('pointermove', this.onPointerMove)
  }
})
