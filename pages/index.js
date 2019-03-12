import { Box } from 'pss-components'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import hoistNonReactStatic from 'hoist-non-react-statics'
import withFonts from '../hoc/with-fonts'
import Transition from 'react-transition-group/Transition'

import {
  INTRO_HEIGHT,
  INTRO_SHIFT,
  INTRO_WIDTH,
  WORD_SETS,
  pxToRem
} from '../constants'

import {
  Header,
  SecondaryHeader,
  Intro,
  Section
} from '../components'

const { publicRuntimeConfig } = getConfig()

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

class Index extends React.Component {
  static defaultProps = {
    loops: WORD_SETS,
    velocity: 0.1
  }

  static async getInitialProps () {
    const res = await fetch(publicRuntimeConfig.siteUrl + '/api/page/main')
    const main = await res.json()
    return { main }
  }

  state = {
    isIntroVisible: null
  }

  setIntroVisible = () => {
    this.setState({ isIntroVisible: true })
  }

  setIntroHidden = () => {
    this.setState({ isIntroVisible: false })
  }

  render () {
    const {
      loops,
      velocity,
      main,
      fontsLoaded
    } = this.props
    const { isIntroVisible } = this.state

    const firstSectionHash = main.fields.items[0].fields.hash

    return (
      <Box postion='relative' mgt={1}>
        <Box pdx={4} minHeight={fontsLoaded ? 'auto' : '100vh'}>
          {fontsLoaded && (
            <>
              <Header worksHash={firstSectionHash} />
              <Transition in={isIntroVisible === false} timeout={300}>
                {state => (
                  <SecondaryHeader
                    worksHash={firstSectionHash}
                    {...transitionStyles[state]}
                  />
                )}
              </Transition>
              <Box
                position='relative'
                height={pxToRem(670)}
                mgt={2}
              >
                <Intro
                  width={INTRO_WIDTH}
                  height={INTRO_HEIGHT}
                  loops={loops}
                  velocity={velocity}
                  shift={INTRO_SHIFT}
                  padding={0}
                  onEnterViewport={this.setIntroVisible}
                  onLeaveViewport={this.setIntroHidden}
                />
              </Box>
              <Box height='marqueeHeight' />
            </>
          )}
        </Box>
        <main>
          {main.fields.items.map(({ sys: { id }, fields }) => (
            <Section key={id} sections={main.fields.items} {...fields} />
          ))}
        </main>
      </Box>
    )
  }
}

const IndexWithFonts = withFonts([ { family: 'Suisse' } ])(Index)
hoistNonReactStatic(IndexWithFonts, Index)

export default IndexWithFonts
