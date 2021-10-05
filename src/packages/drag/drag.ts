import { throttle } from 'lodash-es'

let DRAG_ITEM: HTMLElement
let DRAG_CONTAINER: HTMLElement
let MOVE_TYPE: string
let innerX: number
let innerY: number

const setDotStyle = (el: HTMLDivElement) => {
  el.style.position = 'absolute'
  el.style.width = '8px'
  el.style.height = '8px'
  el.style.backgroundColor = '#ffffff'
  el.style.border = '1px solid #333'
}

const getSelectNodes = (() => {
  let nodes: Node[]
  return (): Node[] => {
    if (nodes) return nodes
    const borderEl = document.createElement('div')
    borderEl.className = '__border_line'
    borderEl.style.position = 'absolute'
    borderEl.style.left = '0'
    borderEl.style.right = '0'
    borderEl.style.top = '0'
    borderEl.style.bottom = '0'
    borderEl.style.border = '1px dashed #666'

    const lt = document.createElement('div')
    lt.className = '__dot_lt'
    setDotStyle(lt)
    lt.style.cursor = 'nw-resize'
    lt.style.left = '-4px'
    lt.style.top = '-4px'

    const lb = document.createElement('div')
    lb.className = '__dot_lb'
    setDotStyle(lb)
    lb.style.cursor = 'ne-resize'
    lb.style.left = '-4px'
    lb.style.bottom = '-4px'

    const rt = document.createElement('div')
    rt.className = '__dot_rt'
    setDotStyle(rt)
    rt.style.cursor = 'ne-resize'
    rt.style.right = '-4px'
    rt.style.top = '-4px'

    const rb = document.createElement('div')
    rb.className = '__dot_rb'
    setDotStyle(rb)
    rb.style.cursor = 'nw-resize'
    rb.style.right = '-4px'
    rb.style.bottom = '-4px'

    nodes = [borderEl, lt, lb, rt, rb]
    return nodes
  }
})()

const resetPos = (left: number, top: number, right?: number, bottom?: number) => {
  let { offsetHeight, offsetWidth } = DRAG_ITEM

  if (top < 0) {
    top = 0
  }
  if (left < 0) {
    left = 0
  }

  if (left + offsetWidth > DRAG_CONTAINER.offsetWidth) {
    left = DRAG_CONTAINER.offsetWidth - offsetWidth
  }

  if (top + offsetHeight > DRAG_CONTAINER.offsetHeight) {
    top = DRAG_CONTAINER.offsetHeight - offsetHeight
  }
  DRAG_ITEM.style.left = left + 'px'
  DRAG_ITEM.style.top = top + 'px'
  DRAG_ITEM.style.right = right + 'px'
  DRAG_ITEM.style.bottom = bottom + 'px'
}

const resize = throttle(function (left, top, width, height) {
  DRAG_ITEM.style.width = width + 'px'
  DRAG_ITEM.style.height = height + 'px'
  resetPos(left, top)
}, 100)

const select = (target: HTMLElement) => {
  if (DRAG_ITEM !== target) {
    DRAG_ITEM && unselect(DRAG_ITEM)
  }

  if (target.innerHTML.indexOf('__border_line') === -1) {
    target.append(...getSelectNodes())
  }
}
const unselect = (target: HTMLElement) => {
  if (target && target.innerHTML.indexOf('__border_line') > -1) {
    getSelectNodes().forEach(node => {
      target.removeChild(node)
    })
  }
}

const isSelect = (target: HTMLElement, currentTarget: HTMLElement): boolean => {
  if (target.parentElement === currentTarget) {
    select(target)
    DRAG_ITEM = target
    return true
  } else if (target.parentElement) {
    return isSelect(target.parentElement, currentTarget)
  } else {
    return false
  }
}

const down = (e: MouseEvent) => {
  let { target, currentTarget, pageX, pageY } = e
  if (target instanceof HTMLElement && currentTarget instanceof HTMLElement) {
    // 判断是移动，还是缩放
    if (target.className.startsWith('__dot')) {
      MOVE_TYPE = target.className.substring(6, 8)
      currentTarget.style.cursor = (MOVE_TYPE === 'lt' || MOVE_TYPE === 'rb') ? 'nw-resize' : 'ne-resize'
    } else if (isSelect(target, currentTarget)) {
      MOVE_TYPE = 'move'
      currentTarget.style.cursor = 'move'
      innerX = pageX - DRAG_ITEM.offsetLeft
      innerY = pageY - DRAG_ITEM.offsetTop
    } else {
      unselect(DRAG_ITEM)
    }
    DRAG_CONTAINER = currentTarget
  }
}

const up = (callback?: Function) => {
  return (e: MouseEvent) => {
    MOVE_TYPE = ''
    DRAG_CONTAINER && (DRAG_CONTAINER.style.cursor = 'auto')
    callback && callback(DRAG_ITEM)
  }
}
let updateDragItem: (this: HTMLElement, ev: MouseEvent) => any

const move = (e: MouseEvent) => {
  if (!MOVE_TYPE) { // 
    return
  }
  let { pageY, pageX } = e
  let { offsetLeft, offsetTop, offsetHeight, offsetWidth } = DRAG_ITEM
  let offsetX = pageX - DRAG_CONTAINER.offsetLeft
  let offsetY = pageY - DRAG_CONTAINER.offsetTop

  switch (MOVE_TYPE) {
    case 'rb':
      resize(offsetLeft, offsetTop, offsetX - offsetLeft, offsetY - offsetTop)
      break
    case 'rt':
      if (offsetY > offsetTop + offsetHeight) {
        offsetY = offsetTop + offsetHeight
      }
      resize(offsetLeft, offsetY, offsetX - offsetLeft, offsetHeight - offsetY + offsetTop)
      break
    case 'lt':
      if (offsetY > offsetTop + offsetHeight) {
        offsetY = offsetTop + offsetHeight
      }
      if (offsetX > offsetLeft + offsetWidth) {
        offsetX = offsetLeft + offsetWidth
      }
      resize(offsetX, offsetY, offsetWidth - offsetX + offsetLeft, offsetHeight - offsetY + offsetTop)
      break
    case 'lb':
      if (offsetX > offsetLeft + offsetWidth) {
        offsetX = offsetLeft + offsetWidth
      }
      resize(offsetX, offsetTop, offsetWidth - offsetX + offsetLeft, offsetY - offsetTop)
      break
    case 'move':
      DRAG_CONTAINER.style.cursor = 'move'
      resize(pageX - innerX, pageY - innerY, offsetWidth, offsetHeight)
      break
    default: break
  }
}

const active = (el: HTMLElement, callback: Function) => {
  updateDragItem = up(callback)
  el.style.userSelect = 'none'
  el.addEventListener('mousedown', down)
  el.addEventListener('mouseup', updateDragItem)
  el.addEventListener('mousemove', move)
}

const clear = (el: HTMLElement) => {
  el.style.userSelect = 'inherit'
  el.removeEventListener('mousedown', down)
  el.removeEventListener('mouseup', updateDragItem)
  el.removeEventListener('mousemove', move)

  // 移除选中状态
  DRAG_ITEM && unselect(DRAG_ITEM)
}

export default {
  active,
  clear
}