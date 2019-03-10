import { FlexBox, Text } from 'pss-components'
import React from 'react'

import HashLink from './hashlink'

const Header = ({ worksHash }) => (
  <FlexBox as='header' justifyContent='space-between'>
    <a href='/'>
      <Text variant='header' fg='blue'>Tanya E.</Text>
    </a>
    <HashLink
      hash={worksHash}
      variant='header'
      fg='red'
      modifyUrl={false}
    >
      works
    </HashLink>
    <a href='mailto:hello@ermolaeva.co'>
      <Text variant='header' fg='green'>contact</Text>
    </a>
  </FlexBox>
)

export default Header
