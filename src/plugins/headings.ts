import type { Plugin } from '../types'

interface PluginContext {
  gaps: number
  cachedPositions: Array<{ offsetHeight: number, offsetTop: number }>
}

interface PluginParams {
  /**
   * Radius of the rounded rectangle
   * @default 4
   */
  radius?: number

  /**
   * CSS selector for headings
   * @default 'h1,h2,h3,h4,h5,h6'
   */
  selector?: string

  /**
   * Fill style for headings
   * @default '#00000025'
   */
  fillStyle?: string
}

export default ({
  radius = 4,
  fillStyle = '#00000025',
  selector = 'h1,h2,h3,h4,h5,h6'
}: PluginParams = {}): Plugin<PluginContext> => ({
  gaps: 0,
  cachedPositions: [],

  update (_, { viewport, canvas }) {
    this.gaps = Math.floor(canvas.width * 0.15)
    const headings = Array.from(viewport.querySelectorAll<HTMLElement>(selector))

    this.cachedPositions = headings.map(({ offsetHeight, offsetTop }) => ({ offsetHeight, offsetTop }))
  },

  draw (ctx, { canvas: { width }, states: { scaleRatio } }) {
    const { cachedPositions, gaps } = this

    ctx.fillStyle = fillStyle

    ctx.beginPath()
    cachedPositions.forEach(({ offsetHeight, offsetTop }) => {
      ctx.roundRect(gaps, offsetTop * scaleRatio, width - gaps * 2, offsetHeight * scaleRatio, radius)
    })
    ctx.closePath()

    ctx.fill()
  }
})
