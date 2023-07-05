import type { Plugin } from '../types'

type PluginContext = {
  deltaY: number
} & Record<
  '_pointerDown' | '_pointerMove' | '_pointerUp',
  (this: PluginContext, ev: PointerEvent) => void
>

const Scrollbar: Plugin<PluginContext> = (states) => ({
  init (_, { canvas, viewport }) {
    viewport.classList.add('hide-scrollbar')
    viewport.appendChild(canvas)

    this._pointerDown = this._pointerDown.bind(this)
    this._pointerMove = this._pointerMove.bind(this)
    this._pointerUp = this._pointerUp.bind(this)

    canvas.addEventListener('pointerdown', this._pointerDown)
  },

  draw (ctx, { canvas: { width, height } }) {
    const { scrollTop, scaleRatio, radius } = states

    ctx.fillStyle = '#00000060'

    ctx.beginPath()
    ctx.roundRect(0, scrollTop * scaleRatio, width, height * scaleRatio, radius)
    ctx.closePath()

    ctx.fill()
  },

  destroy (_, { canvas, viewport }) {
    viewport.classList.remove('hide-scrollbar')
    viewport.removeChild(canvas)
    canvas.addEventListener('pointerdown', this._pointerDown)
  },

  deltaY: 0,

  _pointerDown (ev) {
    ev.preventDefault()

    const y = ev.clientY
    const { scrollTop, scrollHeight, scaleRatio } = states

    // If the clicked position is a scroll bar, there is no need to scroll immediately
    if (y >= scrollTop * scaleRatio && y <= (scrollTop * scaleRatio + scrollHeight)) {
      this.deltaY = y - scrollTop * scaleRatio
    } else {
      // Otherwise, scroll to the clicked position immediately, and move the scroll bar to the center position
      this.deltaY = scrollHeight / 2
      document.documentElement.scrollTop = (y - this.deltaY) / scaleRatio
    }

    document.addEventListener('pointermove', this._pointerMove)
    document.addEventListener('pointerup', this._pointerUp, { once: true })
  },

  _pointerMove ({ clientY }) {
    document.documentElement.scrollTop = (clientY - this.deltaY) / states.scaleRatio
  },

  _pointerUp () {
    document.removeEventListener('pointermove', this._pointerMove)
  }
})

export default Scrollbar
