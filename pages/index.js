import React from 'react'
import withFonts from '../hoc/with-fonts'
import ReactDOM from 'react-dom'
import styled from 'react-emotion'
import { system } from 'pss'
import { Box, FlexBox, Text } from '../components'
import randomWords from 'random-words'
import TextLoop from '../components/text-loop'
import { THEME, remToPx } from '../constants'

const Svg = styled.svg(system)
const Img = styled.img(system)

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
    loops: [ ...Array(3) ].map((_, i) => ({
      text: randomWords({ exactly: 6 - i, maxLength: 5 }).join('\u00A0').split('')
    })),
    shift: remToPx(THEME.textStyle.sporting.fontSize) * 1.2,
    velocity: 0.2
  }

  state = {
    isMounted: false,
    width: null,
    height: null
  }

  render () {
    const { loops, shift, velocity } = this.props
    const { width, height, isMounted } = this.state
    return (
      <Box ht wd prl>
        <Tanya>Tanya!</Tanya>
        {isMounted && (
          <Svg wd ht='auto' viewBox={`0 0 ${width} ${height}`}>
            {loops.map((group, i) => (
              <TextLoop
                key={i}
                index={i}
                shift={(i + 1) * shift}
                width={width}
                height={height}
                text={group.text}
                velocity={velocity}
              />
            ))}
          </Svg>
        )}
      </Box>
    )
  }

  componentDidMount () {
    const node = ReactDOM.findDOMNode(this)
    const { width, height } = node.getBoundingClientRect()
    this.setState({
      isMounted: true,
      width,
      height
    })
  }
}

const SafeIndex = ({ fontsLoaded }) => fontsLoaded && (
  <Index />
)

export default withFonts([ { family: 'Sporting-Grotesque' } ])(SafeIndex)
