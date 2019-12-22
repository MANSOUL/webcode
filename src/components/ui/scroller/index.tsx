import './index.less'
import React from 'react'
import clsx from 'clsx'

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
  refScroller: React.RefObject<HTMLDivElement> = React.createRef()
  refContainer: React.RefObject<HTMLDivElement> = React.createRef()
  state: {
    movementStyle: any
    indicatorMovementStyle: any
    scrollerWidth: number
    containerWidth: number
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      movementStyle: {},
      indicatorMovementStyle: {},
      scrollerWidth: 0,
      containerWidth: 0
    }
  }

  componentDidMount() {}

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
      this.setState({
        scrollerWidth,
        containerWidth
      })
    }
  }

  handleMouseWheel = (event: React.WheelEvent) => {
    if (this.maxTranslate <= 0) {
      return
    }
    this.translate -= event.deltaY
    if (this.translate <= 0) {
      this.translate = 0
    }
    if (this.translate > this.maxTranslate) {
      this.translate = this.maxTranslate
    }
    this.setState({
      indicatorMovementStyle: {
        transform: `translate(${this.translate}px, 0px)`
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
      indicatorMovementStyle
    } = this.state
    return (
      <div
        className={clsx('spui-scroller', `spui-scroller--${direction}`)}
        onWheel={this.handleMouseWheel}
        ref={this.refScroller}
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
            'spui-scroller__bar--hidden': scrollerWidth >= containerWidth
          })}
        >
          <div
            className="spui-scroller__indicator"
            style={{
              ...getIndicatorStyle(direction, scrollerWidth, containerWidth),
              ...indicatorMovementStyle
            }}
          ></div>
        </div>
      </div>
    )
  }
}
