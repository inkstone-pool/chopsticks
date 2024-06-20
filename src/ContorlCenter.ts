import { ChopStick } from './ChopStick'
import { ChopList } from './ChopStickList'
import { Listener } from './Listener'
import { Renderer } from './Renderer'

export class ControlCenter {
  chopList: ChopList
  listener: Listener
  render: Renderer
  skipStep: number
  constructor() {
    this.skipStep = 2
    this.render = new Renderer()
    this.chopList = new ChopList()
    this.listener = new Listener((dragId, dropId) => {
      this.dragFun(dragId, dropId)
    })
    this.render.init()
  }
  dragFun(dragId: number, dropId: number) {
    let dragItem = this.chopList.cells[dragId]
    let dropItem = this.chopList.cells[dropId]
    //起点与终点都是单只
    if (dropItem.value == 1) {
      let num
      if (dragId < dropId) {
        num = this.chopList.cells
          .slice(+dragId + 1, dropId)
          .reduce((pre, cur) => {
            return pre + cur.value
          }, 0)
      } else {
        num = this.chopList.cells
          .slice(+dropId + 1, dragId)
          .reduce((pre, cur) => {
            return pre + cur.value
          }, 0)
      }
      //真正的操作
      if (num == this.skipStep) {
        if (dragItem.value == 1) {
          dropItem.updateValue(2)
          this.chopList.cells.splice(+dragId, 1)
        } else if (dragItem.value == 2) {
          dragItem.updateValue(1)
          this.chopList.cells.splice(+dropId, 0, new ChopStick())
        }
        if (
          this.chopList.cells.every((item) => {
            return item.value === 2
          })
        ) {
          this.render.renderSuccess()
          setTimeout(() => {
            this.render.closeSuccess()
          }, 6000)
        }
      }
    }
    this.render.render(this.chopList)
  }
}
