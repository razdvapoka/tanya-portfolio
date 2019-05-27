import { FlexGrid, Text } from 'pss-components'
import Link from 'next/link'
import React from 'react'
import styled from '@emotion/styled'
import { system } from 'pss'

import HashLink from './hashlink'

const HeaderBox = styled(FlexGrid)(({ isVisible }) => ({
  pointerEvents: isVisible ? 'auto' : 'none',
  '& a': {
    transition: 'color 0.5s ease-out'
  },
  '& a:hover': {
    color: 'white'
  }
}))

const Name = styled.span(system)

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
    pdx={{ all: 4, M: 0 }}
    mgx={0}
    alignItems='center'
    justifyContent='flex-end'
    tm='dark'
    zIndex={10}
    fg='secondary'
    transition='opacity 0.3s ease'
    isVisible={isVisible}
    spacex={4}
    {...rest}
  >
    <FlexGrid.Item col={{ all: 6, M: 3 }}>
      <a href='/'>
        <Name hideOn='M'>Tanya Ermolaeva</Name>
        <Name display={{ all: 'none', M: 'block' }}>Tanya E.</Name>
      </a>
    </FlexGrid.Item>
    <FlexGrid.Item col={3}>
      <Link href='/about'>
        <a>
          About
        </a>
      </Link>
    </FlexGrid.Item>
    <FlexGrid.Item col={{ all: 2, M: 3 }}>
      <a
        href='https://instagram.com/ermlvaa'
        target='_blank'
        rel='noopener noreferrer'
      >
        Instagram
      </a>
    </FlexGrid.Item>
    <FlexGrid.Item col={{ all: 1, M: 3 }}>
      <HashLink
        hash='footer'
        modifyUrl={false}
      >
        <a>
          Contacts
        </a>
      </HashLink>
    </FlexGrid.Item>
  </Text>
)

export default SecondaryHeader
