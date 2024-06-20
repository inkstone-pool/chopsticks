import { ChopStick } from './ChopStick'

export class ChopList {
  constructor(public size = 10, public cells: Array<ChopStick> = []) {
    this.init()
  }
  init() {
    this.cells = Array(this.size)
      .fill('')
      .map(() => {
        return new ChopStick()
      })
  }
}
