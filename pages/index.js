import { Box, FlexBox, Text } from 'pss-components'
import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { Header, Intro, PeaceSign, Section } from '../components'
import { THEME, WORD_SETS, pxToRem, remToPx } from '../constants'
import { debounce } from '../utils'
import withFonts from '../hoc/with-fonts'

const { publicRuntimeConfig } = getConfig()

class IndexContent extends React.Component {
  static defaultProps = {
    loops: WORD_SETS,
    velocity: 0.1
  }

  static async getInitialProps () {
    const res = await fetch(publicRuntimeConfig.siteUrl + '/api/section/main')
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
      <Box postion='relative' mgt={1}>
        <Box pdx={4}>
          <Header />
          <Box
            ref={this.setIntroRef}
            position='relative'
            height={pxToRem(670)}
            mgt={2}
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
          </Box>
          <Box height='marqueeHeight' />
        </Box>
        <main>
          {main.fields.items.map(({ sys: { id }, fields }) => (
            <Section key={id} sections={main.fields.items} {...fields} />
          ))}
        </main>
      </Box>
    )
  }

  getSizeDependentState = () => {
    const introNode = ReactDOM.findDOMNode(this.introRef)
    const { width, height } = introNode.getBoundingClientRect()
    const rowHeight = remToPx(THEME.textStyle.intro.fontSize)
    return {
      width,
      height: height + remToPx(pxToRem(60)),
      shift: rowHeight
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

const Index = withFonts([ { family: 'Suisse' } ])(IndexContent)
hoistNonReactStatic(Index, IndexContent)

export default Index
