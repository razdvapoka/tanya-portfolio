import React from 'react'
import styled from 'react-emotion'
import { Text } from '../components'
import textTextLoopTimeline from '../utils/text-loop-timeline'
import { KEY_SPACE } from 'keycode-js'
import { rectPath } from '../utils/path-creators'

const PATH_CLASS_NAME = 'path'
const CHAR_CLASS_NAME = 'char'

const G = styled.g()
const Char = styled.g({ opacity: 0 })

const Letter = ({ children, groupIndex }) => (
  <Char className={CHAR_CLASS_NAME}>
    <Text component='text' textStyle='sporting'>
      {children}
    </Text>
  </Char>
)

const PathLoop = ({ pathCreator, ...rest }) => (
  <path
    className={PATH_CLASS_NAME}
    fill='none'
    stroke='none'
    d={pathCreator(rest)}
  />
)

const LetterGroup = ({ text }) => (
  <G>
    {text.map((letter, letterIndex) => (
      <Letter key={letterIndex}>
        {letter}
      </Letter>
    ))}
  </G>
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
    timeline: null
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
    return (
      <G className={className(index)}>
        <PathLoop
          shift={shift}
          width={width}
          height={height}
          pathCreator={pathCreator}
        />
        <LetterGroup text={text} />
      </G>
    )
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
    const { index, velocity } = this.props
    const timeline = textTextLoopTimeline(
      pathSelector(index),
      charSelector(index),
      velocity,
      0
    )
    timeline.play()
    this.setState({ timeline })
    window.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount () {
    const { timeline, index } = this.state
    if (timeline) {
      timeline.pause()
      timeline.remove(charSelector(index))
    }
    window.removeEventListener(this.handleKeyPress)
  }
}

export default TextLoop
