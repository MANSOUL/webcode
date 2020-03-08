import React from 'react'

export default function useProgress() {
  const [progress, setProgress] = React.useState(0)
  const refProgress = React.useRef(0)

  React.useEffect(() => {
    let timer: number = -1
    const run = () => {
      timer = window.requestAnimationFrame(() => {
        if (refProgress.current < 100) {
          refProgress.current += 2
          setProgress(refProgress.current)
        } else {
          setProgress(100)
          window.cancelAnimationFrame(timer)
        }
        run()
      })
    }
    run()
    return () => {
      window.cancelAnimationFrame(timer)
    }
  }, [])

  return progress
}
