import React from 'react'
import withFonts from '../hoc/with-fonts'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { system } from 'pss'
import { Box, FlexBox, Text } from 'pss-components'
import { TextLoop } from '../components'
import { THEME, remToPx, remToInt, WORD_SETS } from '../constants'
import { debounce, randomPath } from '../utils'

const Svg = styled.svg(system)
const Img = styled.img(system)

const Placeholder = ({ width, height, ...rest }) => (
  <Svg width='100%' height='auto' viewBox={`0 0 ${width} ${height}`} {...rest}>
    <path
      d={randomPath({ width, height })}
      fill='none'
      stroke='black'
      strokeWidth={2}
    />
  </Svg>
)

const CentralPiece = ({ children }) => (
  <FlexBox
    align='center'
    position='absolute'
    left={1 / 2} top={1 / 2}
    transform='translate(-50%, -50%)'
    mgt={2}
  >
    <Img src='/static/peace-sign.svg' mgb={3} />
    <Text variant='sporting' mgx={2}>
      {children}
    </Text>
    <Img src='/static/peace-sign.svg' mgb={3} />
  </FlexBox>
)

class Index extends React.Component {
  static defaultProps = {
    loops: WORD_SETS,
    velocity: 0.2
  }

  state = {
    isMounted: false,
    isResizing: false,
    width: null,
    height: null,
    shift: remToPx(THEME.textStyle.sporting.fontSize) * 1.1
  }

  stopResizing = () => {
    this.setState(() => ({
      isResizing: false
    }))
  }

  render () {
    const { loops, velocity } = this.props
    const { width, height, shift, isMounted, isResizing } = this.state
    const fontSize = remToInt(THEME.textStyle.sporting.fontSize)
    return (
      <Box
        height
        width
        postion='relative'
        minHeight={`${7 * fontSize * 1.2}rem`}
        maxWidth='100vw'
      >
        <CentralPiece>Tanya!</CentralPiece>
        {isMounted && !isResizing && (
          <Svg
            width='100%'
            height='auto'
            viewBox={`0 0 ${width} ${height}`}
          >
            {loops.map((loop, i) => (
              <TextLoop
                key={i}
                index={i}
                shift={(i + 1) * shift}
                width={width}
                height={height}
                text={loop}
                velocity={velocity}
              />
            ))}
          </Svg>
        )}
        {isMounted && isResizing && (
          <Placeholder width={width} height={height} />
        )}
      </Box>
    )
  }

  startResizing = () => {
    const node = ReactDOM.findDOMNode(this)
    const { width, height } = node.getBoundingClientRect()
    this.setState({
      width,
      height,
      shift: remToPx(THEME.textStyle.sporting.fontSize) * 1.2,
      isResizing: true
    })
  }

  finishResizing = debounce(this.stopResizing, 200)

  componentDidMount () {
    const node = ReactDOM.findDOMNode(this)
    const { width, height } = node.getBoundingClientRect()
    this.setState({
      isMounted: true,
      width,
      height
    })
    window.addEventListener('resize', this.startResizing)
    window.addEventListener('resize', this.finishResizing)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.finishResizing)
    window.removeEventListener('resize', this.startResizing)
  }
}

const SafeIndex = ({ fontsLoaded }) => fontsLoaded && (
  <Index />
)

export default withFonts([ { family: 'Sporting-Grotesque' } ])(SafeIndex)
