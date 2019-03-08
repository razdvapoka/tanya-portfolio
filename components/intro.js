/* eslint react/jsx-no-bind: 0 */

import { Box, Text } from 'pss-components'
import { KEY_SPACE } from 'keycode-js'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import handleInViewport from 'react-in-viewport'
import styled from '@emotion/styled'

import { CANONIC_SCREEN_WIDTH, THEME, WHITESPACE } from '../constants'
import { Svg, LoopPath } from './'
import { doubleRectPath } from '../utils/path-creators'
import { repeat, textLoopTimeline } from '../utils'

const Letter = styled(Text)({
  position: 'absolute',
  opacity: 0,
  transformOrigin: 'bottom left'
})

const LetterBox = ({ children }) => (
  <Letter
    as='div'
    variant='intro'
  >
    {children}
  </Letter>
)

class Whitespace extends React.Component {
  render () {
    return (
      <LetterBox>
        {WHITESPACE}
      </LetterBox>
    )
  }

  componentDidMount () {
    const { setWhitespaceWidth } = this.props
    const width = ReactDOM.findDOMNode(this).getBoundingClientRect().width
    setWhitespaceWidth(width)
  }
}

class Letters extends React.Component {
  render () {
    const {
      words,
      whitespaceCount,
      letterBox
    } = this.props
    const separator = repeat(whitespaceCount, WHITESPACE).join('')
    const letters = words.join(separator).split('')
    return ReactDOM.createPortal((
      <Box>
        {letters.map((letter, letterIndex) => (
          <LetterBox key={letterIndex}>
            {letter}
          </LetterBox>
        ))}
      </Box>
    ), letterBox)
  }

  componentDidMount () {
    const { setLettersWidth } = this.props
    const letters = Array.from(ReactDOM.findDOMNode(this).children)
    const width = letters.reduce((w, n) => w + n.getBoundingClientRect().width, 0)
    setLettersWidth(width)
  }
}

const Loop = ({
  whitespaceWidth,
  loop,
  index,
  width,
  height,
  shift,
  padding,
  letterBox,
  velocity
}) => {
  const [ whitespaceCount, setWhitespaceCount ] = useState(0)
  const [ lettersWidth, setLettersWidth ] = useState(null)
  const [ path, setPath ] = useState(null)
  const [ timeline, setTimeline ] = useState(null)

  const handlePathMount = (mountedPath) => {
    const pathLength = mountedPath.getTotalLength() / 2
    const count = Math.max(Math.floor(
      (window.innerWidth / CANONIC_SCREEN_WIDTH * pathLength - lettersWidth) /
      loop.length /
      whitespaceWidth
    ), 1)
    setWhitespaceCount(count)
    setPath(mountedPath)
  }

  useEffect(() => {
    if (whitespaceCount > 0) {
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
      {lettersWidth && (
        <LoopPath
          shift={(index + 1) * shift}
          width={width}
          height={height}
          padding={padding}
          pathCreator={doubleRectPath}
          setPath={handlePathMount}
        />
      )}
      <Letters
        words={loop}
        whitespaceCount={whitespaceCount}
        setLettersWidth={setLettersWidth}
        letterBox={letterBox}
      />
    </React.Fragment>
  )
}

const Intro = ({
  width,
  height,
  loops,
  velocity,
  shift,
  innerRef,
  inViewport,
  padding
}) => {
  const [ whitespaceWidth, setWhitespaceWidth ] = useState(null)
  const [ letterBox, setLetterBox ] = useState(null)
  const canRenderLoop = whitespaceWidth != null && letterBox != null
  return (
    <Box>
      <Whitespace setWhitespaceWidth={setWhitespaceWidth} />
      <Box
        ref={setLetterBox}
        transform={`translateY(-${THEME.textStyle.intro.fontSize})`}
      />
      <Svg
        viewBox={`0 0 ${width} ${height}`}
        ref={innerRef}
      >
        {loops.map((loop, loopIndex) => canRenderLoop && (
          <Loop
            key={loopIndex}
            index={loopIndex}
            loop={loop}
            whitespaceWidth={whitespaceWidth}
            width={width}
            height={height}
            shift={shift}
            padding={padding}
            letterBox={letterBox}
            velocity={velocity}
          />
        )
        )}
      </Svg>
    </Box>
  )
}

export default handleInViewport(Intro)
