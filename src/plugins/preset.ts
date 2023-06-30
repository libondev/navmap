import type { Plugin } from '../types'

export const PresetPlugin: Plugin = () => ({
  name: 'PresetPlugin',

  _cachedHeadingPositions: null,

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
  },

  render (_, { viewport }) {
    const headings = [...(viewport.querySelectorAll('h1, h2, h3, h4, h5, h6')! as unknown as HTMLElement[])]

    this._cachedHeadingPositions = headings.map(({ offsetHeight, offsetTop }) => ({ offsetHeight, offsetTop }))
  },

  draw (ctx, { canvas, canvas: { width, height }, viewport }) {
    const scaleRatio = canvas.offsetHeight / viewport.offsetHeight
    const scrollTop = visualViewport.pageTop

    // 清除画布
    ctx.clearRect(0, 0, width, height)

    // 绘制标题块
    this._cachedHeadingPositions.forEach(({ offsetHeight, offsetTop }) => {
      // 标题块的位置是固定的, 但是高度是缩放的, 所以需要乘以缩放比例
      ctx.fillRect(0, offsetTop * scaleRatio, width, offsetHeight * scaleRatio)
    })

    // 绘制视口
    ctx.strokeRect(0, scrollTop * scaleRatio, width, height * scaleRatio)
  },

  destroy (_, { canvas, viewport }) {
    viewport.classList.remove('hide-scrollbar')
    viewport.removeChild(canvas)
  }
})
