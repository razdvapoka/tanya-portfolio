import {
  Box,
  FlexBox,
  Image
} from 'pss-components'
import { ps } from 'pss'
import React from 'react'
import { pxToRem } from '../constants'
import anime from 'animejs'
import styled from '@emotion/styled'
import handleInViewport from 'react-in-viewport'

const VELOCITY = 0.05
const InlineFlexBox = styled(FlexBox)({
  display: 'inline-flex'
})

const SliderContent = handleInViewport(({
  setSlidesRef,
  items,
  innerRef
}) => (
  <Box
    ov='hidden'
    pdy={10}
    ref={innerRef}
  >
    <InlineFlexBox
      alignItems='center'
      flexWrap={false}
      ref={setSlidesRef}
    >
      {items.map(item => {
        const image = item.fields.image.fields.file
        return (
          <Box
            key={item.sys.id}
            pdr={ps('&:last-child', 12)}
            mgx={12}
          >
            <Image
              src={image.url}
              minWidth={pxToRem(image.details.image.width / 2)}
            />
          </Box>
        )
      })}
    </InlineFlexBox>
  </Box>
))

class Slider extends React.Component {
  state = {
    animationTimeline: null
  }

  setSlidesRef = (ref) => {
    this.slides = ref
  }

  render () {
    const { items } = this.props
    return (
      <FlexBox
        position='absolute' left top width height
        alignItems='center'
        justifyContent='center'
        onClick={this.toggleAnimation}
      >
        <SliderContent
          items={items}
          onLeaveViewport={this.onLeaveViewport}
          onEnterViewport={this.onEnterViewport}
          setSlidesRef={this.setSlidesRef}
        />
      </FlexBox>
    )
  }

  animateSlides = () => {
    const rect = this.slides.getBoundingClientRect()
    const distance = rect.width - window.innerWidth
    const timeline = anime.timeline({
      duration: distance / VELOCITY,
      easing: 'linear',
      autoplay: false,
      direction: 'alternate',
      loop: true
    })
    timeline.add({
      targets: this.slides,
      translateX: -distance
    })
    this.setState({
      animationTimeline: timeline
    })
  }

  toggleAnimation = () => {
    const { animationTimeline } = this.state
    if (animationTimeline.paused) {
      animationTimeline.reverse()
      animationTimeline.play()
    } else {
      animationTimeline.pause()
    }
  }

  onEnterViewport = () => {
    const { animationTimeline } = this.state
    animationTimeline.reverse()
    animationTimeline.play()
  }

  onLeaveViewport = () => {
    const { animationTimeline } = this.state
    animationTimeline.pause()
  }

  componentDidMount () {
    this.animateSlides()
  }
}

export default Slider
