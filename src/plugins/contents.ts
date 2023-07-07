import type { Plugin } from '../types'

interface Params {
  /**
   * Radius of the rounded rectangle
   * @default 4
   */
  radius?: number

  /**
   * CSS selector for view tag
   * @default {'h1,h2,h3,h4':'#eee'}
   */
  selectors?: Record<string, string>
}

interface Context {
  gaps: number
  cachedPositions: Record<string, Array<{ offsetHeight: number, offsetTop: number }>>
}

export default ({
  radius = 4,
  selectors = { 'h1,h2,h3,h4': '#eee' }
} = {} as Params): Plugin<Context> => ({
  gaps: 0,
  cachedPositions: {},

  update (_, { viewport, canvas }) {
    this.gaps = Math.floor(canvas.width * 0.1)

    for (const [selector, style] of Object.entries(selectors)) {
      const contents = Array.from(viewport.querySelectorAll<HTMLElement>(selector))

      this.cachedPositions[style] = contents.map(({ offsetHeight, offsetTop }) => ({ offsetHeight, offsetTop }))
    }
  },

  draw (ctx, { canvas: { width }, states: { scaleRatio } }) {
    const { cachedPositions, gaps } = this

    for (const [style, positions] of Object.entries(cachedPositions)) {
      ctx.beginPath()
      ctx.fillStyle = style
      positions.forEach(({ offsetHeight, offsetTop }) => {
        ctx.roundRect(gaps, offsetTop * scaleRatio, width - gaps * 2, offsetHeight * scaleRatio, radius)
      })
      ctx.closePath()
      ctx.fill()
    }
  }
})
