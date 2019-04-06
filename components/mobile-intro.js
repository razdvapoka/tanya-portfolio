import { Box, Text } from 'pss-components'
import { ps } from 'pss'
import React, { useState, useRef } from 'react'
import anime from 'animejs'
import styled from '@emotion/styled'
import useInView from 'react-hook-inview'

import {
  MOBILE_INTRO_DURATION,
  MOBILE_INTRO_LINE_COUNT,
  WORD_SETS
} from '../constants'
import { sequence } from '../constants/theme'

const WORDS = WORD_SETS.reduce((words, set) => words.concat(set), [])

const OVHBox = styled(Box)({
  overflow: 'hidden'
})

const Marquee = ({ reversed }) => {
  const innerBoxRef = useRef()
  const [ animation, setAnimation ] = useState(null)
  if (!animation && innerBoxRef.current) {
    const newAnimation = anime({
      targets: innerBoxRef.current,
      translateX: window.innerWidth - innerBoxRef.current.getBoundingClientRect().width,
      easing: 'linear',
      autoplay: false,
      duration: MOBILE_INTRO_DURATION,
      direction: reversed ? 'reverse' : 'normal',
      complete: () => {
        newAnimation.pause()
        newAnimation.seek(MOBILE_INTRO_DURATION / 2)
        newAnimation.play()
      }
    })
    newAnimation.seek(MOBILE_INTRO_DURATION * Math.random())
    newAnimation.play()
    setAnimation(newAnimation)
  }

  const content = WORDS.map((word, wordIndex) => (
    <Text
      as='span'
      key={wordIndex}
      variant='header'
      mgl={ps('& + &', 4)}
    >
      {word}
    </Text>
  ))

  return (
    <OVHBox
      opacity={animation ? 1 : 0}
      transition='opacity 0.3s ease'
    >
      <Box ref={innerBoxRef} display='inline-block'>
        {content}{content}
      </Box>
    </OVHBox>
  )
}

const MobileIntro = ({
  setIntroHidden,
  setIntroVisible,
  ...rest
}) => {
  const elementRef = useRef(null)

  useInView({
    target: elementRef,
    onEnter: setIntroVisible,
    onLeave: setIntroHidden,
    unobserveOnEnter: false
  })

  return (
    <Box mgx={-2} ref={elementRef} {...rest}>
      {sequence(MOBILE_INTRO_LINE_COUNT).map((index) => (
        <Marquee key={index} reversed={index % 2 === 0} />
      ))}
    </Box>
  )
}

export default MobileIntro
