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

  constructor (props) {
    super(props)
    this.introRef = React.createRef()
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
    const isSecondaryHeaderVisible = isIntroVisible != null && !isIntroVisible

    const firstSectionHash = main.fields.items[0].fields.hash

    return (
      <Box postion='relative' mgt={1}>
        <Box pdx={4} minHeight={fontsLoaded ? 'auto' : '100vh'}>
          {fontsLoaded && (
            <>
              <Header pdx={2} worksHash={firstSectionHash} isHome />
              <Transition in={isSecondaryHeaderVisible} timeout={300} mountOnEnter>
                {state => (
                  <SecondaryHeader
                    worksHash={firstSectionHash}
                    isVisible={isSecondaryHeaderVisible}
                    {...transitionStyles[state]}
                  />
                )}
              </Transition>
              <Box
                position='relative'
                height={pxToRem(670)}
                mgt={2}
                className='intro-box'
              >
                <Intro
                  ref={this.introRef}
                  width={INTRO_WIDTH}
                  height={INTRO_HEIGHT}
                  loops={loops}
                  velocity={velocity}
                  shift={INTRO_SHIFT}
                  padding={0}
                  onEnterViewport={this.setIntroVisible}
                  onLeaveViewport={this.setIntroHidden}
                  setIntroVisible={this.setIntroVisible}
                  setIntroHidden={this.setIntroHidden}
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
