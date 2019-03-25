import { Box } from 'pss-components'
import React from 'react'
import anime from 'animejs'

import {
  pxToRem,
  remToPx,
  SPACE_STEP,
  SLIDER_LAST_ITEM_PADDING,
  SLIDER_VELOCITY
} from '../../constants'
import SliderButton from './button'
import SliderContent from './content'

class Slider extends React.Component {
  state = {
    animationTimeline: null,
    currentSlideIndex: null,
    isInManualMode: false
  }

  setSlidesRef = (ref) => {
    this.slides = ref
  }

  setCurrenSlideIndex = (currentSlideIndex) => {
    if (this.state.currentSlideIndex !== currentSlideIndex) {
      this.setState({ currentSlideIndex })
    }
  }

  setIsInManualMode = (isInManualMode) => {
    this.setState({ isInManualMode })
  }

  createAnimation = () => {
    const slidesBoxRect = this.slides.getBoundingClientRect()
    const distance = slidesBoxRect.width - window.innerWidth
    const timeline = anime.timeline({
      duration: distance / SLIDER_VELOCITY,
      easing: 'linear',
      autoplay: false,
      direction: 'alternate',
      loop: true,
      update: this.updateCurrentSlideIndex
    })
    console.log('DISTANCE:', slidesBoxRect.width, distance)
    timeline.add({
      targets: this.slides,
      translateX: -distance
    })
    this.setState({
      animationTimeline: timeline
    })
  }

  pauseAnimation = () => {
    const { animationTimeline } = this.state
    console.log('pauSe')
    animationTimeline.pause()
  }

  onEnterViewport = () => {
    const { animationTimeline, isInManualMode } = this.state
    if (!isInManualMode) {
      console.log('PLAY')
      animationTimeline.play()
    }
  }

  onLeaveViewport = () => {
    const { animationTimeline, isInManualMode } = this.state
    if (!isInManualMode) {
      console.log('pauSe')
      animationTimeline.pause()
    }
  }

  nextSlide = () => {
    const { currentSlideIndex } = this.state
    this.selectSlide(currentSlideIndex + 1)
  }

  prevSlide = () => {
    const { currentSlideIndex } = this.state
    this.selectSlide(currentSlideIndex - 1)
  }

  getSlideCenterX = (slide, isLastSlide) => {
    const { width: slideWidth } = slide.getBoundingClientRect()
    const lastItemPadding = isLastSlide
      ? remToPx(pxToRem(SLIDER_LAST_ITEM_PADDING * SPACE_STEP))
      : 0

    return (
      window.innerWidth / 2 -
      slide.offsetLeft -
      slideWidth / 2 +
      lastItemPadding / 2
    )
  }

  getSlideDistToCenter = (slide) => {
    const slideRect = slide.getBoundingClientRect()
    const slideDistToCenterLeft = Math.abs(slideRect.left - window.innerWidth / 2)
    const slideDistToCenterRight = Math.abs(slideRect.right - window.innerWidth / 2)
    return Math.min(slideDistToCenterLeft, slideDistToCenterRight)
  }

  getClosestToCenterSlideIndex = (slides) => {
    const [ resultIndex ] = Array
      .from(slides.children)
      .reduce((
        [ closestSlideIndex, distToCenter ],
        slide,
        slideIndex
      ) => {
        const slideDistToCenter = this.getSlideDistToCenter(slide)
        if (slideDistToCenter < distToCenter) {
          return [ slideIndex, slideDistToCenter ]
        } else {
          return [ closestSlideIndex, distToCenter ]
        }
      }, [ null, Infinity ])
    return resultIndex
  }

  updateCurrentSlideIndex = () => this.slides &&
    this.setCurrenSlideIndex(
      this.getClosestToCenterSlideIndex(this.slides)
    )

  selectSlide = (index) => {
    const { items } = this.props
    const slide = Array.from(this.slides.children)[index]
    const isLastSlide = index === items.length - 1
    this.pauseAnimation()
    anime({
      targets: this.slides,
      translateX: this.getSlideCenterX(slide, isLastSlide),
      duration: 200,
      easing: 'easeInQuad'
    })
    this.setCurrenSlideIndex(index)
    this.setIsInManualMode(true)
  }

  componentDidMount () {
    this.createAnimation()
  }

  render () {
    const { items } = this.props
    const { currentSlideIndex } = this.state
    const hasNextSlide = currentSlideIndex < items.length - 1
    const hasPrevSlide = currentSlideIndex > 0
    return (
      <Box mgt={20}>
        <SliderContent
          items={items}
          onLeaveViewport={this.onLeaveViewport}
          onEnterViewport={this.onEnterViewport}
          setSlidesRef={this.setSlidesRef}
        />
        <SliderButton
          left
          onClick={this.prevSlide}
          disabled={!hasPrevSlide}
          cursorText='Previous'
        />
        <SliderButton
          right
          onClick={this.nextSlide}
          disabled={!hasNextSlide}
          cursorText='Next'
        />
      </Box>
    )
  }
}

export default Slider
