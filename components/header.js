import { FlexBox, Text } from 'pss-components'
import React from 'react'

const Header = ({ worksHash, isHome, ...rest }) => (
  <FlexBox
    as='header'
    justifyContent='space-between'
    {...rest}
  >
    <a href='/'>
      <Text variant='header' fg='blue'>Tanya E.</Text>
    </a>
    <Text variant='header' fg='red'>Works</Text>
    <a href='mailto:hello@ermolaeva.co'>
      <Text variant='header' fg='green'>contact</Text>
    </a>
  </FlexBox>
)

export default Header
