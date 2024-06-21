import './style.css'
import './main.css'
import { ControlCenter } from './ContorlCenter'
import preLoadImg from './preloadImg'
preLoadImg(['/hold.svg', '/success.svg', '/single.svg', '/double.svg']).then(
  () => {
    console.log('link-start')
    new ControlCenter()
  }
)
