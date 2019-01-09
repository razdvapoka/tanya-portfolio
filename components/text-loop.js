import React from 'react'
import styled from '@emotion/styled'
import { Text } from 'pss-components'
import { KEY_SPACE } from 'keycode-js'
import { WHITESPACE } from '../constants'
import {
  textLoopTimeline,
  repeat,
  rectPath
} from '../utils'

const PATH_CLASS_NAME = 'path'
const CHAR_CLASS_NAME = 'char'

const Group = styled('g')()
const Char = styled(Group)({ opacity: 0 })

const Letter = ({ children, groupIndex, innerRef, ...rest }) => (
  <Char className={CHAR_CLASS_NAME} ref={innerRef} {...rest}>
    <Text as='text' variant='sporting'>
      {children}
    </Text>
  </Char>
)

const PathLoop = ({ pathCreator, innerRef, ...rest }) => (
  <path
    className={PATH_CLASS_NAME}
    fill='none'
    stroke='none'
    ref={innerRef}
    d={pathCreator(rest)}
  />
)

const LetterGrouproup = ({ letters, innerRef, ...rest }) => (
  <Group ref={innerRef} {...rest}>
    {letters.map((letter, letterIndex) => (
      <Letter key={letterIndex}>
        {letter}
      </Letter>
    ))}
  </Group>
)

const className = index => `group-${index}`
const prePt = cn => `.${cn}`
const pathSelector = index => `${prePt(className(index))} ${prePt(PATH_CLASS_NAME)}`
const charSelector = index => `${prePt(className(index))} ${prePt(CHAR_CLASS_NAME)}`

class TextLoop extends React.Component {
  static defaultProps = {
    pathCreator: rectPath
  }

  state = {
    timeline: null,
    whitespaceCount: 0,
    readyToAnimate: false
  }

  render () {
    const {
      index,
      shift,
      height,
      width,
      text,
      pathCreator
    } = this.props
    const { whitespaceCount, readyToAnimate } = this.state
    const separator = repeat(whitespaceCount, WHITESPACE).join('')
    const letters = text.join(separator).split('')
    return (
      <Group className={className(index)}>
        <PathLoop
          shift={shift}
          width={width}
          height={height}
          pathCreator={pathCreator}
          innerRef={this.setPathRef}
        />
        <LetterGrouproup letters={letters} innerRef={this.setLetterGrouproupRef} />
        {!readyToAnimate && (
          <Letter innerRef={this.setWhitespaceRef}>
            {WHITESPACE}
          </Letter>
        )}
      </Group>
    )
  }

  setWhitespaceRef = (ref) => {
    const { text } = this.props
    console.log('SET REF:', text, ref)
    this.whitespace = ref
  }

  setPathRef = (ref) => {
    this.path = ref
  }

  setLetterGrouproupRef = (ref) => {
    this.letterGrouproup = ref
  }

  toggleAnimation = () => {
    const { timeline } = this.state
    if (timeline.paused) {
      timeline.play()
    } else {
      timeline.pause()
    }
  }

  handleKeyPress = (e) => {
    if (e.which === KEY_SPACE) {
      this.toggleAnimation()
    }
  }

  componentDidMount () {
    const { text } = this.props
    console.log('MOUNT', text)
    const pathNode = this.path
    const whitespaceNode = this.whitespace
    const chars = Array.from(this.letterGrouproup.querySelectorAll('g'))
    const totalCharWidth = chars.reduce(
      (w, n) => w + n.getBoundingClientRect().width,
      0
    )
    const pathLength = pathNode.getTotalLength() / 2
    console.log(whitespaceNode.getBoundingClientRect())
    const whitespaceWidth = whitespaceNode.getBoundingClientRect().width
    console.log('PL', pathLength, totalCharWidth, text.length, whitespaceWidth)
    const whitespaceCount = Math.max(
      Math.floor((pathLength - totalCharWidth) / text.length / whitespaceWidth),
      1
    )
    this.setState({
      whitespaceCount,
      readyToAnimate: true
    })
  }

  componentDidUpdate (_, { readyToAnimate: wasReadyToAnimate }) {
    const { readyToAnimate } = this.state
    const { index, velocity } = this.props
    if (readyToAnimate && !wasReadyToAnimate) {
      const timeline = textLoopTimeline(
        pathSelector(index),
        charSelector(index),
        velocity,
        0
      )
      timeline.play()
      this.setState({ timeline })
      window.addEventListener('keypress', this.handleKeyPress)
      window.addEventListener('resize', this.handleResize)
    }
  }

  componentWillUnmount () {
    const { timeline } = this.state
    if (timeline) {
      timeline.pause()
    }
    window.removeEventListener('keypress', this.handleKeyPress)
    window.removeEventListener('resize', this.handleResize)
  }
}

export default TextLoop
