import React from 'react'
import { FlexBox, Text } from 'pss-components'

const Header = () => (
  <FlexBox as='header' justifyContent='space-between'>
    <Text variant='header' fg='blue'>Tanya E.</Text>
    <Text variant='header' fg='red'>works</Text>
    <Text variant='header' fg='green'>contact</Text>
  </FlexBox>
)

export default Header
