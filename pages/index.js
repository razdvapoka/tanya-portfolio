import { Box } from 'pss-components'
import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import withFonts from '../hoc/with-fonts'

import {
  INTRO_HEIGHT,
  INTRO_SHIFT,
  INTRO_WIDTH,
  WORD_SETS,
  pxToRem
} from '../constants'

import {
  Header,
  Intro
} from '../components'

class Index extends React.Component {
  static defaultProps = {
    loops: WORD_SETS,
    velocity: 0.1
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
      fontsLoaded
    } = this.props

    return (
      <Box postion='relative' mgt={1}>
        <Box pdx={4} minHeight={fontsLoaded ? 'auto' : '100vh'}>
          {fontsLoaded && (
            <>
              <Header pdx={2} isHome />
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
            </>
          )}
        </Box>
      </Box>
    )
  }
}

const IndexWithFonts = withFonts([ { family: 'Suisse' } ])(Index)
hoistNonReactStatic(IndexWithFonts, Index)

export default IndexWithFonts
