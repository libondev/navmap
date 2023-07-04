import type { Plugin } from '../types'

interface PluginContext {
  cachedPositions: Array<{ offsetHeight: number, offsetTop: number }>
}

export const Headings: Plugin<PluginContext> = (states) => ({
  cachedPositions: [],

  update (_, { viewport }) {
    const headings = Array.from(viewport.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'))

    this.cachedPositions = headings.map(({ offsetHeight, offsetTop }) => ({ offsetHeight, offsetTop }))
  },

  draw (ctx, { canvas: { width } }) {
    const { cachedPositions } = this

    ctx.fillStyle = '#00000030'
    ctx.beginPath()

    cachedPositions.forEach(({ offsetHeight, offsetTop }) => {
      ctx.roundRect(2, offsetTop * states.scaleRatio, width - 4, offsetHeight * states.scaleRatio, 5)
    })

    ctx.closePath()
    ctx.fill()
  }
})
