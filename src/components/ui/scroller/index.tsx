import './index.less'
import React from 'react'
import clsx from 'clsx'

const getIndicatorMovement = (scrollerSize: number, containerSize: number) => {
  const width = (scrollerSize / containerSize) * scrollerSize
  return {
    width,
    movement: scrollerSize - width
  }
}

const getIndicatorStyle = (
  direction: 'horizontal' | 'vertical',
  scrollerSize: number,
  containerSize: number
) => {
  if (scrollerSize >= containerSize) {
    return {}
  }
  let size = (scrollerSize / containerSize) * 100
  if (direction === 'horizontal') {
    return {
      width: `${size}%`,
      height: '100%'
    }
  }
  return {
    width: '100%',
    height: `${size}%`
  }
}

export interface Props {
  children: any
  direction: 'horizontal' | 'vertical'
}

export default class Scroller extends React.Component<Props> {
  static defaultProps = {
    direction: 'horizontal'
  }

  translate: number = 0
  maxTranslate: number = 0
  scrollerWidth: number = 0
  containerWidth: number = 0
  indicatorActive: boolean = false
  indicatorPrevPos: number = 0
  indicatorMovementSize = { width: 0, movement: 0 }
  refScroller: React.RefObject<HTMLDivElement> = React.createRef()
  refContainer: React.RefObject<HTMLDivElement> = React.createRef()
  refIndicator: React.RefObject<HTMLDivElement> = React.createRef()
  state: {
    movementStyle: any
    indicatorMovementStyle: any
    scrollerWidth: number
    containerWidth: number
    barActive: boolean
    indicatorActive: boolean
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      movementStyle: {},
      indicatorMovementStyle: {},
      scrollerWidth: 0,
      containerWidth: 0,
      barActive: false,
      indicatorActive: false
    }
  }

  componentDidMount() {
    this.attachIndicatorEvent()
  }

  componentDidUpdate(prevProps: Props) {
    const { children } = this.props
    if (prevProps.children.length !== children.length) {
      let scrollerWidth = 0
      let containerWidth = 0
      if (this.refScroller.current)
        scrollerWidth = this.refScroller.current.clientWidth
      if (this.refContainer.current)
        containerWidth = this.refContainer.current.clientWidth
      this.maxTranslate = containerWidth - scrollerWidth
      this.indicatorMovementSize = getIndicatorMovement(
        scrollerWidth,
        containerWidth
      )
      this.setState({
        scrollerWidth,
        containerWidth
      })
      this.move(0)
    }
  }

  handleMouseWheel = (event: React.WheelEvent) => {
    const useX = Math.abs(event.deltaX) > Math.abs(event.deltaY)
    this.move(useX ? -event.deltaX : event.deltaY)
  }

  handleIndicatorDown = (event: MouseEvent) => {
    this.indicatorActive = true
    this.indicatorPrevPos = event.clientX
  }

  handleIndicatorMove = (event: MouseEvent) => {
    if (!this.indicatorActive) return
    const movement = event.clientX - this.indicatorPrevPos
    this.indicatorPrevPos = event.clientX
    this.move(-movement)
    this.setState({
      indicatorActive: true
    })
  }

  handleIndicatorUp = () => {
    this.indicatorActive = false
    this.setState({
      indicatorActive: false
    })
  }

  handleBarMouseOver = () => {
    this.setState({
      barActive: true
    })
  }
  handleBarMouseOut = () => {
    this.setState({
      barActive: false
    })
  }

  handleIndicatorMouseOver = () => {
    this.setState({
      indicatorActive: true
    })
  }
  handleIndicatorMouseOut = () => {
    this.setState({
      indicatorActive: false
    })
  }

  attachIndicatorEvent() {
    if (this.refIndicator.current) {
      this.refIndicator.current.addEventListener(
        'mousedown',
        this.handleIndicatorDown
      )
      document.addEventListener('mousemove', this.handleIndicatorMove)
      document.addEventListener('mouseup', this.handleIndicatorUp)
    }
  }

  move(deltaY: number) {
    if (this.maxTranslate <= 0) {
      this.setState({
        indicatorMovementStyle: { transform: `translate(0, 0)` },
        movementStyle: { transform: `translate(0, 0)` }
      })
      return
    }
    this.translate -= deltaY
    if (this.translate <= 0) {
      this.translate = 0
    } else if (this.translate > this.maxTranslate) {
      this.translate = this.maxTranslate
    }
    this.setState({
      indicatorMovementStyle: {
        transform: `translate(${(this.translate / this.maxTranslate) *
          this.indicatorMovementSize.movement}px, 0px)`
      },
      movementStyle: {
        transform: `translate(${-this.translate}px, 0px)`
      }
    })
  }

  render() {
    const { direction, children } = this.props
    const {
      movementStyle,
      scrollerWidth,
      containerWidth,
      indicatorMovementStyle,
      barActive,
      indicatorActive
    } = this.state
    return (
      <div
        className={clsx('spui-scroller', `spui-scroller--${direction}`)}
        onWheel={this.handleMouseWheel}
        ref={this.refScroller}
        onMouseOver={this.handleBarMouseOver}
        onMouseOut={this.handleBarMouseOut}
      >
        <div
          className="spui-scroller__container"
          ref={this.refContainer}
          style={movementStyle}
        >
          {children}
        </div>
        <div
          className={clsx('spui-scroller__bar', {
            'spui-scroller__bar--active':
              scrollerWidth < containerWidth && (barActive || indicatorActive)
          })}
        >
          <div
            className={clsx('spui-scroller__indicator', {
              'spui-scroller__indicator--active': indicatorActive
            })}
            style={{
              ...getIndicatorStyle(direction, scrollerWidth, containerWidth),
              ...indicatorMovementStyle
            }}
            ref={this.refIndicator}
            onMouseOver={this.handleIndicatorMouseOver}
            onMouseOut={this.handleIndicatorMouseOut}
          ></div>
        </div>
      </div>
    )
  }
}
