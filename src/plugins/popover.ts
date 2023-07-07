import type { Plugin } from '../types'

interface Params {
  selector: string
}

interface Context {
  cachedContents: Map<[number, number], string>
}

export default ({
  selector
} = {} as Params): Plugin<Context> => ({
  cachedContents: null,

  update (_, { states: { scaleRatio } }) {
    // const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))

    // console.log('🥎 14: elements', elements)
    // this.cachedContents = new Map(elements.map(({ offsetTop, offsetHeight, textContent }) =>
    //   [[offsetTop * scaleRatio, offsetHeight * scaleRatio], textContent]))

    // console.log(this.cachedContents)
  }
})
