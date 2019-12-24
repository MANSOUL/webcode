export default function insert() {
  let prevCssText = ''
  let $prevStyle: HTMLStyleElement | null = null
  const insertCss = (cssText: string) => {
    if (prevCssText === cssText) return
    $prevStyle && $prevStyle.parentElement?.removeChild($prevStyle)
    const $style = document.createElement('style')
    $style.innerHTML = cssText
    $prevStyle = $style
    document.head.appendChild($style)
  }
  return insertCss
}
