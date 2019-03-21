import { Box, Text } from 'pss-components'
import { KEY_SPACE } from 'keycode-js'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import handleInViewport from 'react-in-viewport'
import styled from '@emotion/styled'

import { INTRO_SPACING, THEME, WHITESPACE, pxToRem } from '../constants'
import { Svg } from './'
import { doubleRectPath } from '../utils/path-creators'
import { textLoopTimeline } from '../utils'

const letterStyle = {
  position: 'absolute',
  opacity: 0,
  transformOrigin: 'bottom left',
  transition: 'opacity 1s ease'
}

const LetterBox = styled(Text)(letterStyle)
const LetterText = styled(Box)({
  transform: `translateY(-${pxToRem(8)})`
})

const Letter = ({ children, ...rest }) => (
  <LetterBox {...rest}>
    <LetterText>{children}</LetterText>
  </LetterBox>
)

const Spacer = styled(Box)(letterStyle)

class Letters extends React.Component {
  render () {
    const {
      words,
      letterBox
    } = this.props
    const letters = words.join(WHITESPACE).split('')
    return ReactDOM.createPortal((
      <Box>
        {letters.map((letter, letterIndex) => letter === WHITESPACE ? (
          <Spacer key={letterIndex} width={pxToRem(INTRO_SPACING)} />
        ) : (
          <Letter key={letterIndex} as='div' variant='intro'>
            {letter}
          </Letter>
        ))}
      </Box>
    ), letterBox)
  }
}

const Loop = ({
  loop,
  index,
  width,
  height,
  shift,
  padding,
  letterBox,
  velocity,
  inViewport
}) => {
  const [ path, setPath ] = useState(null)
  const [ timeline, setTimeline ] = useState(null)

  useEffect(() => {
    if (timeline) {
      if (inViewport) {
        timeline.play()
      } else {
        timeline.pause()
      }
    }
  }, [ inViewport ])

  useEffect(() => {
    if (path) {
      const loopLetters = Array.from(letterBox.children[index].children)
      const newTimeline = textLoopTimeline(
        path,
        loopLetters,
        velocity,
        0
      )
      newTimeline.play()
      setTimeline(newTimeline)
    }
  }, [ path ])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.which === KEY_SPACE) {
        if (timeline.paused) {
          timeline.play()
        } else {
          timeline.pause()
        }
        e.preventDefault()
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  })

  return (
    <React.Fragment>
      <path
        ref={setPath}
        fill='none'
        d={doubleRectPath({ width, height, shift: (index + 1) * shift, padding })}
      />
      <Letters
        words={loop}
        letterBox={letterBox}
      />
    </React.Fragment>
  )
}

const IntroBox = styled(Box)({
  overflow: 'hidden'
})

class Intro extends React.Component {
  constructor (props) {
    super(props)
    this.introRef = React.createRef()
  }

  state = {
    letterBox: null
  }

  setLetterBox = (letterBox) => {
    this.setState({ letterBox })
  }

  componentDidMount () {
    const { setIntroVisible, setIntroHidden } = this.props
    const target = this.introRef.current
    const observer = new window.IntersectionObserver(function (entries) {
      if (entries[0].intersectionRatio === 0) {
        setIntroHidden()
      } else {
        setIntroVisible()
      }
      this.unobserve(target)
    })
    observer.observe(target)
  }

  render () {
    const {
      width,
      height,
      loops,
      velocity,
      shift,
      innerRef,
      inViewport,
      padding
    } = this.props

    const { letterBox } = this.state
    return (
      <IntroBox ref={this.introRef}>
        <Box
          ref={this.setLetterBox}
          transform={`translateY(-${THEME.textStyle.intro.fontSize})`}
        />
        <Svg
          viewBox={`0 0 ${width} ${height}`}
          ref={innerRef}
        >
          {loops.map((loop, loopIndex) => letterBox && (
            <Loop
              key={loopIndex}
              index={loopIndex}
              loop={loop}
              width={width}
              height={height}
              shift={shift}
              padding={padding}
              letterBox={letterBox}
              velocity={velocity}
              inViewport={inViewport}
            />
          ))}
          <g transform='translate(320 376)'>
            <Text variant='introFixed' as='text'>tanya</Text>
          </g>
          <g transform='translate(760 376)'>
            <Text variant='introFixed' as='text'>tanya</Text>
          </g>
        </Svg>
      </IntroBox>
    )
  }
}

export default handleInViewport(Intro)
