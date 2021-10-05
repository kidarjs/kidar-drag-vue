import { VueConstructor } from 'vue'
import DragContainer from './KiDragContainer.vue'

DragContainer.install = (vue: VueConstructor) => {
  vue.component(DragContainer.name, DragContainer)
}

export default DragContainer