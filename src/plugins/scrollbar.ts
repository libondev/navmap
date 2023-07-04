import type { Plugin } from '../types'

type PluginContext = {
  data: {
    recordY: number
    deltaY: number
  }
} & Record<
  'onPointerDown' | 'onPointerMove' | 'onPointerUp',
  (this: PluginContext, ev: PointerEvent) => void
>

export const Scrollbar: Plugin<PluginContext> = (states) => ({
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

  draw (ctx, { canvas: { width, height } }) {
    // 绘制视口
    ctx.strokeStyle = '#f00'

    console.log([states.scrollTop, states.scaleRatio, states.scrollHeight])
    ctx.strokeRect(0, states.scrollTop * states.scaleRatio, width, height * states.scaleRatio)
  },

  destroy (_, { canvas, viewport }) {
    viewport.classList.remove('hide-scrollbar')
    viewport.removeChild(canvas)
    canvas.addEventListener('pointerdown', this.onPointerDown)
  },

  data: {
    deltaY: 0, // 鼠标按下的位置距离滚动条顶部的位置
    recordY: 0 // 记录鼠标按下时的位置
  },

  onPointerDown (ev) {
    ev.preventDefault()
    const { scrollTop, scrollHeight, scaleRatio } = states
    const { data } = this

    const y = ev.clientY

    data.recordY = y

    // 点击非滚动条的位置时, 将视口滚动到点击位置
    if (y <= scrollTop * scaleRatio || y >= scrollTop * scaleRatio + scrollHeight) {
      data.deltaY = y - scrollHeight / 2
      document.documentElement.scrollTop = data.deltaY / scaleRatio
    } else {
      // 点击滚动条时, 重新计算按下的位置与滚动条顶部的距离
      // data.deltaY = y - scrollTop + scrollHeight / 2

      // console.log(data.deltaY)
    }

    document.addEventListener('pointermove', this.onPointerMove)
    document.addEventListener('pointerup', this.onPointerUp, { once: true })
  },

  onPointerMove ({ clientY }) {
    const { recordY, deltaY } = this.data

    // 将在滚动条上的位置转换为视口上的位置
    document.documentElement.scrollTop = (clientY - recordY + deltaY) / states.scaleRatio
  },

  onPointerUp () {
    document.removeEventListener('pointermove', this.onPointerMove)
  }
})
