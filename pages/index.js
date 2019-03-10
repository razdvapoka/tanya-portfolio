import { Box } from 'pss-components'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
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
  SecondaryHeader,
  Intro,
  Section
} from '../components'

const { publicRuntimeConfig } = getConfig()

class Index extends React.Component {
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
    isIntroVisible: null
  }

  setIsIntroVisible = (isIntroVisible) => {
    if (this.state.isIntroVisible != null || isIntroVisible) {
      this.setState({ isIntroVisible })
    }
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
        <Box pdx={4}>
          <Header worksHash={firstSectionHash} />
          {isIntroVisible === false && (
            <SecondaryHeader worksHash={firstSectionHash} />
          )}
          <Box
            position='relative'
            height={pxToRem(670)}
            mgt={2}
          >
            {fontsLoaded && (
              <Intro
                width={INTRO_WIDTH}
                height={INTRO_HEIGHT}
                loops={loops}
                velocity={velocity}
                shift={INTRO_SHIFT}
                padding={0}
                setIsIntroVisible={this.setIsIntroVisible}
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
}

const IndexWithFonts = withFonts([ { family: 'Suisse' } ])(Index)
hoistNonReactStatic(IndexWithFonts, Index)

export default IndexWithFonts
