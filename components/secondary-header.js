import { FlexBox, Text } from 'pss-components'
import React from 'react'
import { ps } from 'pss'

import HashLink from './hashlink'

const SecondaryHeader = ({
  worksHash,
  ...rest
}) => (
  <Text
    as={FlexBox}
    variant='body'
    position='fixed' top left
    width height='headerHeight'
    pdb={1}
    pdx={6}
    alignItems='flex-end'
    justifyContent='flex-end'
    tm='dark'
    zIndex={10}
    fg='secondary'
    mgl={ps('& > * + *', 10)}
    transition='opacity 0.3s ease'
    {...rest}
  >
    <FlexBox.Item mgr='auto'>
      <a href='/'>Tanya E.</a>
    </FlexBox.Item>
    <FlexBox.Item>
      About
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
