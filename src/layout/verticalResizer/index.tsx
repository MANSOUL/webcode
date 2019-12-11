import React from 'react'

export interface VerticalResizerProps {
  onChange: (offset: number) => void
}

export default function VerticalResizer({ onChange }: VerticalResizerProps) {
  const refMouse = React.useRef({
    down: false,
    initialX: 0,
    prevX: 0
  })

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const handleMouseDown = (event: React.MouseEvent) => {
    refMouse.current.down = true
    refMouse.current.prevX = event.clientX
    refMouse.current.initialX = event.clientX
  }
  const handleMouseMove = (event: MouseEvent) => {
    if (refMouse.current.down) {
      onChange && onChange(event.clientX - refMouse.current.prevX)
      refMouse.current.prevX = event.clientX
    }
  }
  const handleMouseUp = (event: MouseEvent) => {
    refMouse.current.down = false
  }
  return (
    <span
      className="webcode-layout__resizer webcode-layout__resizer--vertical"
      onMouseDown={handleMouseDown}
    />
  )
}
