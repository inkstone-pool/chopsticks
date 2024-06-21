import { ChopList } from './ChopStickList'

export class Renderer {
  ulContainer: Element | null
  constructor() {
    this.ulContainer = document.querySelector('.container ul')
  }
  init() {
    const chopList = new ChopList()
    this.render(chopList)
  }
  render(cellList: ChopList) {
    this.ulContainer!.innerHTML = ''
    cellList.cells.forEach((cell, index) => {
      const liDom = document.createElement('li')
      liDom.setAttribute('id', index.toString())
      liDom.classList.add(cell.value === 1 ? 'normal' : 'success')
      liDom.innerHTML = `<img src="${
        cell.value === 1 ? '/single.svg' : '/double.svg'
      }" 
            width="${cell.value === 1 ? '60%' : '100%'}" height='60%' 
            >`
      this.ulContainer!.appendChild(liDom)
    })
  }
  renderSuccess() {
    const divDom = document.createElement('div')
    divDom.className = 'successover'
    divDom.innerHTML = `
        <img src="/success.svg" draggable="false" alt="">
        <span>Keep think and keep Keen</span>`
    divDom.style.display = 'flex'
    document.querySelector('body')!.appendChild(divDom)
  }
  closeSuccess() {
    let successTip = document.querySelector('.successover')!
    successTip.remove()
  }
}
