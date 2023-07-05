import type { Plugin } from '../types'

interface PluginContext {
  gaps: number
  cachedPositions: Array<{ offsetHeight: number, offsetTop: number }>
}

export const Headings: Plugin<PluginContext> = (states) => ({
  gaps: 0,
  cachedPositions: [],

  update (_, { viewport, canvas }) {
    this.gaps = Math.floor(canvas.width * 0.15)
    const headings = Array.from(viewport.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'))

    this.cachedPositions = headings.map(({ offsetHeight, offsetTop }) => ({ offsetHeight, offsetTop }))
  },

  draw (ctx, { canvas: { width } }) {
    const { cachedPositions, gaps } = this
    const { scaleRatio, radius } = states

    ctx.fillStyle = '#00000025'

    ctx.beginPath()
    cachedPositions.forEach(({ offsetHeight, offsetTop }) => {
      ctx.roundRect(gaps, offsetTop * scaleRatio, width - gaps * 2, offsetHeight * scaleRatio, radius)
    })
    ctx.closePath()

    ctx.fill()
  }
})
