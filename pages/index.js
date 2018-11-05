import React from 'react'
import withFonts from '../hoc/with-fonts'
import ReactDOM from 'react-dom'
import styled from 'react-emotion'
import { system } from 'pss'
import { Box, FlexBox, Text } from '../components'
import TextLoop from '../components/text-loop'
import { THEME, remToPx, WORD_SETS } from '../constants'
import { debounce, randomPath } from '../utils'

const Svg = styled.svg(system)
const Img = styled.img(system)

const Placeholder = ({ width, height, ...rest }) => (
  <Svg wd ht='auto' viewBox={`0 0 ${width} ${height}`} {...rest}>
    <path
      d={randomPath({ width, height })}
      fill='none'
      stroke='black'
      strokeWidth={2}
    />
  </Svg>
)

const Tanya = ({ children }) => (
  <FlexBox align='center' pab l={1 / 2} t={1 / 2} transform='translate(-50%, -50%)' mgt={2}>
    <Img src='/static/peace-sign.svg' mgb={3} />
    <Text textStyle='sporting' mgx={2}>
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
    shift: remToPx(THEME.textStyle.sporting.fontSize) * 1.2
  }

  stopResizing = () => {
    this.setState(() => ({
      isResizing: false
    }))
  }

  render () {
    const { loops, velocity } = this.props
    const { width, height, shift, isMounted, isResizing } = this.state
    return (
      <Box ht wd prl>
        <Tanya>Tanya!</Tanya>
        {isMounted && !isResizing && (
          <Svg wd ht='auto' viewBox={`0 0 ${width} ${height}`}>
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
