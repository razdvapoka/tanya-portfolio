import { Box } from 'pss-components'
import React from 'react'
import anime from 'animejs'

import {
  SLIDER_HUMAN_DELTA_THRESHOLD,
  SLIDER_LAST_ITEM_PADDING,
  SLIDER_VELOCITY,
  SPACE_STEP,
  pxToRem,
  remToPx
} from '../../constants'
import SliderButton from './button'
import SliderContent from './content'

class Slider extends React.Component {
  state = {
    animationTimeline: null,
    currentSlideIndex: null,
    isInManualMode: false
  }

  lastScrollLeft = 0

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

  getAnimationDistance = () => {
    const slidesBoxRect = this.slides.getBoundingClientRect()
    return slidesBoxRect.width - window.innerWidth
  }

  createAnimation = () => {
    const distance = this.getAnimationDistance()
    const timeline = anime.timeline({
      duration: distance / SLIDER_VELOCITY,
      easing: 'linear',
      autoplay: false,
      direction: 'alternate',
      loop: true
    })
    timeline.add({
      targets: this.slides.parentNode,
      scrollLeft: distance
    })
    this.setState({
      animationTimeline: timeline
    })
  }

  pauseAnimation = () => {
    const { animationTimeline } = this.state
    animationTimeline.pause()
  }

  onEnterViewport = () => {
    const { animationTimeline, isInManualMode } = this.state
    if (!isInManualMode) {
      animationTimeline.play()
    }
  }

  onLeaveViewport = () => {
    const { animationTimeline, isInManualMode } = this.state
    if (!isInManualMode) {
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

    return -(
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
      targets: this.slides.parentNode,
      scrollLeft: this.getSlideCenterX(slide, isLastSlide),
      duration: 200,
      easing: 'easeInQuad'
    })
    this.setCurrenSlideIndex(index)
    this.setIsInManualMode(true)
  }

  componentDidMount () {
    this.createAnimation()
  }

  handleScroll = (e) => {
    const { animationTimeline } = this.state
    const delta = Math.abs(this.lastScrollLeft - this.slides.parentNode.scrollLeft)
    if (!animationTimeline.paused && delta > SLIDER_HUMAN_DELTA_THRESHOLD) {
      this.pauseAnimation()
    }

    this.updateCurrentSlideIndex()

    if (animationTimeline.paused) {
      const distance = this.getAnimationDistance()
      animationTimeline.seek(
        this.slides.parentNode.scrollLeft / distance * animationTimeline.duration
      )
    }

    this.lastScrollLeft = this.slides.parentNode.scrollLeft
  }

  render () {
    const { items } = this.props
    const { currentSlideIndex } = this.state
    const hasNextSlide = currentSlideIndex < items.length - 1
    const hasPrevSlide = currentSlideIndex > 0
    return (
      <Box
        mgt={{ all: 20, M: 0 }}
        onScroll={this.handleScroll}
      >
        <SliderContent
          items={items}
          onLeaveViewport={this.onLeaveViewport}
          onEnterViewport={this.onEnterViewport}
          setSlidesRef={this.setSlidesRef}
          pauseAnimation={this.pauseAnimation}
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
