import { Box } from 'pss-components'
import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import { Header, Section } from '../components'

const { publicRuntimeConfig } = getConfig()

class About extends React.Component {
  static async getInitialProps () {
    const res = await fetch(publicRuntimeConfig.siteUrl + '/api/page/about')
    const about = await res.json()
    return { about }
  }

  render () {
    const { about } = this.props
    return (
      <Box postion='relative' mgt={1}>
        <Box pdx={6}>
          <Header isHome={false} />
        </Box>
        <main>
          {about.fields.items.map(({ sys: { id }, fields }) => (
            <Section key={id} sections={about.fields.items} {...fields} />
          ))}
        </main>
      </Box>
    )
  }
}

export default About
