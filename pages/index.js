import { Box } from 'pss-components'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { Header, Intro, Section } from '../components'
import { WORD_SETS, pxToRem } from '../constants'
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
    this.setState({ isResizing: false })
  }

  setIntroRef = (ref) => {
    this.introRef = ref
  }

  render () {
    const { loops, velocity, main } = this.props
    const { canRenderIntro, isResizing } = this.state
    const isIntroVisible = canRenderIntro
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
            {isIntroVisible && (
              <Intro
                width={1386}
                height={671}
                loops={loops}
                velocity={velocity}
                shift={100}
                padding={0}
                isResizing={isResizing}
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

  startResizing = () => {
    this.setState({ isResizing: true })
  }

  finishResizing = debounce(this.stopResizing, 200)

  componentDidUpdate ({ fontsLoaded: fontsLoadedPrev }) {
    const { fontsLoaded } = this.props
    if (!fontsLoadedPrev && fontsLoaded) {
      this.setState({ canRenderIntro: true })
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
