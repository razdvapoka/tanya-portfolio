import { Box } from 'pss-components'
import React from 'react'
import Transition from 'react-transition-group/Transition'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import hoistNonReactStatic from 'hoist-non-react-statics'

import {
  Header,
  Intro,
  MobileIntro,
  SecondaryHeader,
  Section
} from '../components'
import {
  INTRO_HEIGHT,
  INTRO_SHIFT,
  INTRO_WIDTH,
  WORD_SETS,
  pxToRem
} from '../constants'
import { isMobile as checkIfMobile } from '../constants/theme'
import withFonts from '../hoc/with-fonts'

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
    isIntroVisible: null,
    isMobile: null
  }

  setIntroVisible = () => {
    this.setState({ isIntroVisible: true })
  }

  setIntroHidden = () => {
    this.setState({ isIntroVisible: false })
  }

  updateIsMobile = () => {
    this.setState({ isMobile: checkIfMobile() })
  }

  componentDidMount () {
    this.updateIsMobile()
    window.addEventListener('resize', this.updateIsMobile)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateIsMobile)
  }

  render () {
    const {
      loops,
      velocity,
      main,
      fontsLoaded
    } = this.props
    const { isIntroVisible, isMobile } = this.state
    const isSecondaryHeaderVisible = isIntroVisible != null && !isIntroVisible

    const firstSectionHash = main.fields.items[0].fields.hash

    return (
      <Box postion='relative' mgt={1}>
        <Box pdx={{ all: 4, M: 2 }} minHeight={fontsLoaded ? 'auto' : '100vh'}>
          {fontsLoaded && (
            <>
              <Header pdx={{ all: 2, M: 0 }} worksHash={firstSectionHash} isHome />
              <Transition in={isSecondaryHeaderVisible} timeout={300} mountOnEnter>
                {state => (
                  <SecondaryHeader
                    worksHash={firstSectionHash}
                    isVisible={isSecondaryHeaderVisible}
                    {...transitionStyles[state]}
                  />
                )}
              </Transition>
              {!isMobile && (
                <Box
                  position='relative'
                  height={pxToRem(670)}
                  mgt={2}
                  className='intro-box'
                  hideOn='M'
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
              )}
              <Box hideOn='M' height='marqueeHeight' />
              {isMobile && (
                <Box display={{ all: 'none', M: 'block' }}>
                  <MobileIntro
                    setIntroVisible={this.setIntroVisible}
                    setIntroHidden={this.setIntroHidden}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
        <Box as='main'>
          {main.fields.items.map(({ sys: { id }, fields }) => (
            <Section key={id} sections={main.fields.items} {...fields} />
          ))}
        </Box>
      </Box>
    )
  }
}

const IndexWithFonts = withFonts([ { family: 'Suisse' } ])(Index)
hoistNonReactStatic(IndexWithFonts, Index)

export default IndexWithFonts
