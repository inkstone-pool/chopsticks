export class Listener {
  dragged: EventTarget | null | Element | undefined

  constructor(public dargCallBack: (form: number, to: number) => void) {
    this.initDragListener()
    this.initTipListener()
  }
  initDragListener() {
    //拖动元素或选择文本时触发此事件
    this.dragged = null
    document.addEventListener('dragstart', (e) => {
      if (!e.target) return
      this.dragged = e.target
      ;(e.target as HTMLElement).style.opacity = '0.2'
      //设置拖拽缩略图
      let image = new Image()
      image.src = './public/hold.svg'
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.setDragImage(image, 50, 120)
      }
    })
    //当拖动操作结束时（释放鼠标按钮或按下退出键），会触发此事件
    document.addEventListener('dragend', (e) => {
      if (!e.target) return
      ;(e.target as HTMLElement).style.opacity = 'none'
    })
    //当拖动的元素或选择文本输入有效的放置目标时，会触发此事件。
    document.addEventListener('dragenter', (e) => {
      const target = e.target as HTMLElement
      let list = document.querySelectorAll('li')
      list.forEach((item) => {
        item.classList.remove('dropenter')
      })
      if (target.nodeName == 'LI') {
        target.classList.add('dropenter')
      }

      if (target.parentNode?.nodeName == 'LI') {
        ;(target.parentNode as HTMLElement).classList.add('dropenter')
      }
    })

    //  当将元素或文本选择拖动到有效放置目标（每几百毫秒）上时，会触发此事件。
    document.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    //  当在有效放置目标上放置元素或选择文本时触发此事件。
    document.addEventListener('drop', (e) => {
      e.preventDefault()
      let target = e.target as HTMLElement | HTMLImageElement
      if (!target) return
      let dragElement = this.dragged as HTMLElement
      dragElement.style.opacity = ''
      if (target.nodeName == 'LI') {
        this.dargCallBack(
          +(dragElement.parentNode as HTMLElement).id,
          +target.id
        )
      } else if (target.nodeName == 'IMG') {
        this.dargCallBack(
          +(dragElement.parentNode as HTMLElement).id,
          +(target.parentNode as HTMLElement).id
        )
      }
    })
  }
  initTipListener() {
    let toggle = false
    document.querySelector('.tip')!.addEventListener('click', () => {
      if (toggle) {
        document.querySelector('.container')!.classList.toggle('open', false)
        document.querySelector('nav')!.classList.toggle('open', false)
        document.querySelector('.container')!.classList.toggle('close', true)
        document.querySelector('nav')!.classList.toggle('close', true)
        toggle = !toggle
      } else {
        document.querySelector('.container')!.classList.toggle('open', true)
        document.querySelector('nav')!.classList.toggle('open', true)
        document.querySelector('.container')!.classList.toggle('close', false)
        document.querySelector('nav')!.classList.toggle('close', false)
        toggle = !toggle
      }
    })
  }
}
