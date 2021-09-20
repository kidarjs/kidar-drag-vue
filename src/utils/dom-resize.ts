import ResizeObserver from 'resize-observer-polyfill'
import { debounce } from 'lodash-es'

function addResizeObserverEl() {
  const fnMap = new Map()
  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      fnMap.get(entry.target)(entry.contentRect, entry)
    }
  })
  return (el, fn?) => {
    if (fn) {
      fnMap.set(el, debounce(fn, 100, { maxWait: 100 }))
      ro.observe(el)
    } else {
      fnMap.delete(el)
      ro.unobserve(el)
    }
  }
}

export function listenElResize(el, fn) {
  addResizeObserverEl()(el, fn)
}
export function removeListenElResize(el) {
  addResizeObserverEl()(el)
}
