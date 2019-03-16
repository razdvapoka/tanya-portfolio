import { FlexBox, Text, Box } from 'pss-components'
import React from 'react'
import Link from 'next/link'

import HashLink from './hashlink'

const Header = ({ worksHash, isHome, ...rest }) => (
  <FlexBox
    as='header'
    justifyContent='space-between'
    {...rest}
  >
    <a href='/'>
      <Text variant='header' fg='blue'>Tanya E.</Text>
    </a>
    {isHome ? (
      <HashLink
        hash={worksHash}
        variant='header'
        fg='red'
        modifyUrl={false}
      >
        works
      </HashLink>
    ) : (
      <Link href='/#digital-design'>
        <Box cursor='pointer'>
          <Text as='a' fg='red' variant='header'>
            works
          </Text>
        </Box>
      </Link>
    )}
    <a href='mailto:hello@ermolaeva.co'>
      <Text variant='header' fg='green'>contact</Text>
    </a>
  </FlexBox>
)

export default Header
