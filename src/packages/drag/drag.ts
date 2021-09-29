import { throttle } from 'lodash-es'

let DRAG_ITEM: HTMLElement
let DRAG_CONTAINER: HTMLElement
let ISMOVE: boolean
let MOVE_TYPE: string
let innerX: number
let innerY: number

const BorderLineHtmlText = `
<div class="__border_line" style="border: 1px dashed #666;position: absolute;left: 0;right: 0;top: 0;bottom: 0;"></div>
<div class="__dot_lt" style="left: -4px;top: -4px;cursor: nw-resize;position: absolute;width: 8px;height: 8px;background-color: #fff;border: 1px solid #333;"></div>
<div class="__dot_lb" style="left: -4px;bottom: -4px;cursor: ne-resize;position: absolute;width: 8px;height: 8px;background-color: #fff;border: 1px solid #333;"></div>
<div class="__dot_rt" style="right: -4px;top: -4px;cursor: ne-resize;position: absolute;width: 8px;height: 8px;background-color: #fff;border: 1px solid #333;"></div>
<div class="__dot_rb" style="right: -4px;bottom: -4px;cursor: nw-resize;position: absolute;width: 8px;height: 8px;background-color: #fff;border: 1px solid #333;"></div>
`

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

  if (target.innerHTML.indexOf(BorderLineHtmlText) === -1) {
    target.innerHTML = target.innerHTML + BorderLineHtmlText
  }
}
const unselect = (target: HTMLElement) => {
  target.innerHTML = target.innerHTML.replaceAll(BorderLineHtmlText, '')
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

const up = (e: MouseEvent) => {
  MOVE_TYPE = ''
  DRAG_CONTAINER && (DRAG_CONTAINER.style.cursor = 'auto')
}

const move = (e: MouseEvent) => {
  console.log(MOVE_TYPE)
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
      console.log(innerX, innerY, pageX, pageY)
      DRAG_CONTAINER.style.cursor = 'move'
      resize(pageX - innerX, pageY - innerY, offsetWidth, offsetHeight)
      break
    default: break
  }
}

const active = (el: HTMLElement) => {
  el.addEventListener('mousedown', down)
  el.addEventListener('mouseup', up)
  el.addEventListener('mousemove', move)
}

const clear = (el: HTMLElement) => {
  el.removeEventListener('mousedown', down)
  el.removeEventListener('mouseup', up)
  el.removeEventListener('mousemove', move)
}

export default {
  active,
  clear
}