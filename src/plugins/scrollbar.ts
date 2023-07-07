import type { PluginStates } from '../core/utils'
import type { Plugin } from '../types'

type Context = {
  deltaY: number
  states: PluginStates
  _bindPointEvents: () => void
} & Record<
  '_pointerDown' | '_pointerMove' | '_pointerUp',
  (this: Context, ev: PointerEvent) => void
>

const Scrollbar: Plugin<Context> = {
  enforce: 'post',

  states: {} as PluginStates,

  init (_, { canvas, states }) {
    this.states = states

    this._pointerDown = this._pointerDown.bind(this)
    this._pointerMove = this._pointerMove.bind(this)
    this._pointerUp = this._pointerUp.bind(this)

    canvas.addEventListener('pointerdown', this._pointerDown)

    // TODO: If the device supports touch events, indicates that the current side is mobile,
    // The 'pointermove' event conflicts with the default scrolling behavior,
    // There is no perfect solution for the moment, so it is temporarily disabled
    // 移动端浏览器的滚动行为和PC端不一样，会导致拖动滚动条时页面也会滚动，暂时禁用手机端的拖拽滚动行为
    if ('ontouchstart' in document) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this._bindPointEvents = () => { }
    }
  },

  draw (ctx, { canvas: { width, height }, states: { scrollTop, scaleRatio } }) {
    ctx.fillStyle = '#00000050'

    ctx.beginPath()
    ctx.roundRect(0, scrollTop * scaleRatio, width, height * scaleRatio, 8)
    ctx.closePath()

    ctx.fill()
  },

  destroy (_, { canvas }) {
    canvas.removeEventListener('pointerdown', this._pointerDown)
  },

  deltaY: 0,

  _bindPointEvents () {
    document.addEventListener('pointermove', this._pointerMove)
    document.addEventListener('pointerup', this._pointerUp, { once: true })
  },

  _pointerDown (ev) {
    ev.preventDefault()

    const y = ev.clientY
    const { scrollTop, scrollHeight, scaleRatio } = this.states

    // If the clicked position is a scroll bar, there is no need to scroll immediately
    if (y >= scrollTop * scaleRatio && y <= (scrollTop * scaleRatio + scrollHeight)) {
      this.deltaY = y - scrollTop * scaleRatio
    } else {
      // Otherwise, scroll to the clicked position immediately, and move the scroll bar to the center position
      this.deltaY = scrollHeight / 2
      document.documentElement.scrollTop = (y - this.deltaY) / scaleRatio
    }

    this._bindPointEvents()
  },

  _pointerMove ({ clientY }) {
    document.documentElement.scrollTop = (clientY - this.deltaY) / this.states.scaleRatio
  },

  _pointerUp (ev) {
    document.removeEventListener('pointermove', this._pointerMove)
  }
}

export default Scrollbar
