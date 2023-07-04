import type { Plugin } from '../types'

type PluginContext = {
  deltaY: number
} & Record<
  '_pointerDown' | '_pointerMove' | '_pointerUp',
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

    this._pointerDown = this._pointerDown.bind(this)
    this._pointerMove = this._pointerMove.bind(this)
    this._pointerUp = this._pointerUp.bind(this)

    canvas.addEventListener('pointerdown', this._pointerDown)
  },

  draw (ctx, { canvas: { width, height } }) {
    // 绘制视口
    ctx.strokeStyle = '#f00'

    ctx.strokeRect(0, states.scrollTop * states.scaleRatio, width, height * states.scaleRatio)
  },

  destroy (_, { canvas, viewport }) {
    viewport.classList.remove('hide-scrollbar')
    viewport.removeChild(canvas)
    canvas.addEventListener('pointerdown', this._pointerDown)
  },

  deltaY: 0,

  _pointerDown (ev) {
    ev.preventDefault()
    const { scrollTop, scrollHeight, scaleRatio } = states

    const y = ev.clientY

    // 判断用户是否点击了滚动条
    if (y >= scrollTop * scaleRatio && y <= (scrollTop * scaleRatio + scrollHeight)) {
      // 如果用户点击了滚动条，那么我们只需要记录偏移量，不需要滚动
      this.deltaY = y - (scrollTop * scaleRatio)
    } else {
      // 如果用户点击了滚动条以外的位置，那么我们需要立即滚动到目标位置，并且让滚动条在点击位置的中心
      this.deltaY = scrollHeight / 2
      document.documentElement.scrollTop = (y - this.deltaY) / scaleRatio
    }

    document.addEventListener('pointermove', this._pointerMove)
    document.addEventListener('pointerup', this._pointerUp, { once: true })
  },

  _pointerMove ({ clientY }) {
    // 将在滚动条上的位置转换为视口上的位置
    document.documentElement.scrollTop = (clientY - this.deltaY) / states.scaleRatio
  },

  _pointerUp () {
    document.removeEventListener('pointermove', this._pointerMove)
  }
})
