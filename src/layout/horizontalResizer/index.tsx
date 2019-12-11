import React from 'react'

export interface VerticalResizerProps {
  onChange: (offset: number) => void
}

export default function VerticalResizer({ onChange }: VerticalResizerProps) {
  const refMouse = React.useRef({
    down: false,
    initialY: 0,
    prevY: 0
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
    refMouse.current.prevY = event.clientY
    refMouse.current.initialY = event.clientY
  }
  const handleMouseMove = (event: MouseEvent) => {
    if (refMouse.current.down) {
      console.log(event.clientY - refMouse.current.prevY)
      onChange && onChange(event.clientY - refMouse.current.prevY)
      refMouse.current.prevY = event.clientY
    }
  }
  const handleMouseUp = (event: MouseEvent) => {
    refMouse.current.down = false
  }
  return (
    <span
      className="webcode-layout__resizer webcode-layout__resizer--horizontal"
      onMouseDown={handleMouseDown}
    />
  )
}
