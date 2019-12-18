/**
 * 查找目标元素是否为给定类名元素的子元素
 * @param target
 * @param className
 * @param until
 */
export function isChildof(
  target: HTMLElement,
  className: string,
  until?: HTMLElement
) {
  let current: HTMLElement | null = target
  until = until || document.documentElement
  while (current && current !== until.parentElement) {
    if (current.classList.contains(className)) {
      return true
    }
    current = current.parentElement
  }
  return false
}

/**
 * 查找子元素在父元素中的位置
 * @param child
 * @param parent
 */
export function childIndex(child: HTMLElement, parent: HTMLElement) {
  return Array.prototype.slice.call(parent.children).indexOf(child)
}
