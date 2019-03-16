import { FlexBox, Text } from 'pss-components'
import { ps } from 'pss'
import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

import HashLink from './hashlink'

const HeaderBox = styled(FlexBox)(({ isVisible }) => ({
  pointerEvents: isVisible ? 'auto' : 'none'
}))

const SecondaryHeader = ({
  worksHash,
  isVisible,
  ...rest
}) => (
  <Text
    as={HeaderBox}
    variant='body'
    position='fixed' top left
    width height='headerHeight'
    pdx={6}
    alignItems='center'
    justifyContent='flex-end'
    tm='dark'
    zIndex={10}
    fg='secondary'
    mgl={ps('& > * + *', 10)}
    transition='opacity 0.3s ease'
    isVisible={isVisible}
    {...rest}
  >
    <FlexBox.Item mgr='auto'>
      <a href='/'>Tanya E.</a>
    </FlexBox.Item>
    <FlexBox.Item>
      <Link href='/about'>
        <a>
          About
        </a>
      </Link>
    </FlexBox.Item>
    <FlexBox.Item>
      <a
        href='http://criticism.online'
        target='_blank'
        rel='noopener noreferrer'
      >
        Criticism.online
      </a>
    </FlexBox.Item>
    <FlexBox.Item>
      <a
        href='https://instagram.com/ermlvaa'
        target='_blank'
        rel='noopener noreferrer'
      >
        Instagram
      </a>
    </FlexBox.Item>
    <FlexBox.Item>
      <HashLink
        hash={worksHash}
        modifyUrl={false}
      >
        Works
      </HashLink>
    </FlexBox.Item>
    <FlexBox.Item>
      <HashLink
        hash='footer'
        modifyUrl={false}
      >
        Contacts
      </HashLink>
    </FlexBox.Item>
  </Text>
)

export default SecondaryHeader
