import './style.css'
import './main.css'
import { ControlCenter } from './ContorlCenter'
import preLoadImg from './preloadImg'
preLoadImg([
  './public/hold.svg',
  './public/success.svg',
  './public/single.svg',
  './public/double.svg',
]).then(() => {
  console.log('link-start')
  new ControlCenter()
})
