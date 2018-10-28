import React from 'react'
import withFonts from '../hoc/with-fonts'
import ReactDOM from 'react-dom'
import styled from 'react-emotion'
import { system } from 'pss'
import { Box } from '../components'
import randomWords from 'random-words'
import TextLoop from '../components/text-loop'

const Svg = styled.svg(system)

class Index extends React.Component {
  static defaultProps = {
    loops: [ ...Array(8) ].map((_, i) => ({
      text: randomWords(20 - i * 2).join('\u00A0').split('')
    })),
    shift: 40,
    velocity: 0.1
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
      <Box ht wd>
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
