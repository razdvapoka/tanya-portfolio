import React from 'react'
import withFonts from '../hoc/with-fonts'
import anime from 'animejs'
import ReactDOM from 'react-dom'
import styled from 'react-emotion'
import { system } from 'pss'
import { Box, Text } from '../components'
import randomWords from 'random-words'
import launch from '../utils/launch-animations'

const Svg = styled.svg(system)

const Char = styled.g({
  opacity: 0
})

const Letter = ({ children, groupIndex }) => (
  <Char className='char'>
    <Text component='text' textStyle='sporting'>
      {children}
    </Text>
  </Char>
)

const Path = ({ width, height, shift }) => {
  const singlePath = `${shift},${shift} ${width - shift},${shift} ${width - shift},${height - shift} ${shift},${height - shift}`
  return (
    <path
      fill='none'
      stroke='black'
      d={`M ${singlePath} ${singlePath} Z`}
    />
  )
}

class Index extends React.Component {
  static defaultProps = {
    groups: [ ...Array(5) ].map(() => ({
      text: randomWords(10).join(' ').split('')
    })),
    shift: 40
  }

  animationHandler = null

  state = {
    isMounted: false,
    width: null,
    height: null
  }

  render () {
    console.log('RENDER')
    const { groups, shift } = this.props
    const { width, height, isMounted } = this.state
    return (
      <Box ht wd>
        {isMounted && (
          <Svg wd ht='auto' viewBox={`0 0 ${width} ${height}`}>
            {groups.map((group, i) => (
              <g key={i} className={`group-${i}`}>
                <Path shift={(i + 1) * shift} width={width} height={height} />
                <g>
                  {group.text.map((letter, j) => (
                    <Letter key={j}>
                      {letter}
                    </Letter>
                  ))}
                </g>
              </g>
            ))}
          </Svg>
        )}
      </Box>
    )
  }

  launchAnimation = () => {
    const path = anime.path('.group-0 path')
    const distance = path().totalLength
    const duration = 50000
    const velocity = distance / duration

    const { groups } = this.props
    groups.forEach((g, i) => {
      launch(`.group-${i} path`, `.group-${i} .char`, velocity)
    })
  }

  componentDidMount () {
    const node = ReactDOM.findDOMNode(this)
    const { width, height } = node.getBoundingClientRect()
    this.setState({
      isMounted: true,
      width,
      height
    }, this.launchAnimation)
  }
}

const SafeIndex = ({ fontsLoaded }) => fontsLoaded && (
  <Index />
)

export default withFonts([ { family: 'Sporting-Grotesque' } ])(SafeIndex)
