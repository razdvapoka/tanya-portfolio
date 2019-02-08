import hoistNonReactStatic from 'hoist-non-react-statics'
import fetch from 'isomorphic-unfetch'
import { Box, FlexBox, Text } from 'pss-components'
import React from 'react'
import ReactDOM from 'react-dom'
import { Header, TextLoop, Section, Svg, PeaceSign } from '../components'
import { THEME, WORD_SETS, pxToRem, remToPx } from '../constants'
import { debounce, randomPath } from '../utils'
import withFonts from '../hoc/with-fonts'
import handleInViewport from 'react-in-viewport'
import config from 'config'

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

const Intro = handleInViewport(({
  width,
  height,
  loops,
  velocity,
  shift,
  innerRef,
  inViewport
}) => (
  <Svg viewBox={`0 0 ${width} ${height}`} ref={innerRef}>
    {loops.map((loop, i) => (
      <TextLoop
        key={i}
        index={i}
        shift={(i + 1) * shift}
        width={width}
        height={height}
        text={loop}
        velocity={velocity}
        inViewport={inViewport}
      />
    ))}
  </Svg>
))

class IndexContent extends React.Component {
  static defaultProps = {
    loops: WORD_SETS,
    velocity: 0.1
  }

  static async getInitialProps () {
    const res = await fetch(config.siteUrl + '/api/section/main')
    const main = await res.json()
    return { main }
  }

  state = {
    canRenderIntro: false,
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
    const { loops, velocity, main } = this.props
    const { width, height, shift, canRenderIntro, isResizing } = this.state
    const isIntroVisible = canRenderIntro && !isResizing
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
            {isIntroVisible && (
              <Intro
                width={width}
                height={height}
                loops={loops}
                velocity={velocity}
                shift={shift}
              />
            )}
            {canRenderIntro && isResizing && (
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

  componentDidUpdate ({ fontsLoaded: fontsLoadedPrev }) {
    const { fontsLoaded } = this.props
    if (!fontsLoadedPrev && fontsLoaded) {
      this.setState({
        ...this.getSizeDependentState(),
        canRenderIntro: true
      })
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.startResizing)
    window.addEventListener('resize', this.finishResizing)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.finishResizing)
    window.removeEventListener('resize', this.startResizing)
  }
}

const Index = withFonts([ { family: 'Adieu' } ])(IndexContent)
hoistNonReactStatic(Index, IndexContent)

export default Index
