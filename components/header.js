import { FlexBox, Text, Box } from 'pss-components'
import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import HashLink from './hashlink'

const Name = styled.span()
const About = styled.span({
  display: 'none',
  position: 'absolute',
  left: '50%',
  top: 0,
  height: '100%',
  transform: 'translateX(-50%)'
})

const Tanya = styled(Text)(({ theme, isHome }) => ({
  position: 'relative',
  [`&:hover ${Name}`]: isHome ? {
    opacity: 0
  } : {},
  [`&:hover ${About}`]: isHome ? {
    display: 'block'
  } : {},
  [`@media ${theme.media.M}`]: {
    pointerEvents: 'none'
  }
}))

const Header = ({ worksHash, isHome, ...rest }) => (
  <FlexBox
    as='header'
    justifyContent='space-between'
    flexDirection={{ M: 'column' }}
    {...rest}
  >
    <Link href={isHome ? '/about' : '/'}>
      <a>
        <Tanya
          variant='header'
          fg='blue'
          isHome={isHome}
        >
          <Name>Tanya E.</Name>
          <About>About</About>
        </Tanya>
      </a>
    </Link>
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
