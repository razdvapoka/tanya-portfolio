import { Box, FlexBox, Text } from 'pss-components'
import React from 'react'
import ReactDOM from 'react-dom'

import { Header, TextLoop, Section, Svg, PeaceSign } from '../components'
import { THEME, WORD_SETS, pxToRem, remToPx } from '../constants'
import { debounce, randomPath } from '../utils'
import main from '../data/main'
import withFonts from '../hoc/with-fonts'

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
    shift: 0
  }

  stopResizing = () => {
    this.setState(() => ({
      isResizing: false
    }))
  }

  setIntroRef = (ref) => {
    this.introRef = ref
  }

  render () {
    const { loops, velocity } = this.props
    const { width, height, shift, isMounted, isResizing } = this.state
    const areLoopsVisible = isMounted && !isResizing
    return (
      <Box postion='relative'>
        <FlexBox
          height='100vh'
          flexDirection='column'
          pdx={4}
        >
          <FlexBox.Item>
            <Header />
          </FlexBox.Item>
          <FlexBox.Item
            flex={1}
            ref={this.setIntroRef}
            position='relative'
          >
            <FlexBox
              position='absolute'
              left={1 / 2}
              top={1 / 2}
              transform='translate(-50%, -50%)'
              justifyContent='center'
              alignItems='center'
            >
              <PeaceSign height={pxToRem(70)} />
              <Text mgx={13} variant='intro'>
                Tanya
              </Text>
              <PeaceSign height={pxToRem(70)} />
            </FlexBox>
            {areLoopsVisible && (
              <Svg viewBox={`0 0 ${width} ${height}`}>
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
          </FlexBox.Item>
          <FlexBox.Item>
            <Box height='marqueeHeight' />
          </FlexBox.Item>
        </FlexBox>
        <main>
          {main.fields.items.map(({ sys: { id }, fields }) => (
            <Section key={id} {...fields} />
          ))}
        </main>
      </Box>
    )
  }

  getSizeDependentState = () => {
    const introNode = ReactDOM.findDOMNode(this.introRef)
    const { width, height } = introNode.getBoundingClientRect()
    const rowHeight = remToPx(THEME.textStyle.intro.fontSize) * 1.2
    const shift = rowHeight + (height - 7 * rowHeight) / 6
    return {
      width,
      height,
      shift
    }
  }

  startResizing = () => {
    this.setState({
      ...this.getSizeDependentState(),
      isResizing: true
    })
  }

  finishResizing = debounce(this.stopResizing, 200)

  componentDidMount () {
    this.setState({
      ...this.getSizeDependentState(),
      isMounted: true
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

export default withFonts([ { family: 'Adieu' } ])(SafeIndex)
