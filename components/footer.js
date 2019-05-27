import { Box, FlexBox, FlexGrid, Text } from 'pss-components'
import { cs, ps } from 'pss'
import React from 'react'
import styled from '@emotion/styled'

import { pxToRem } from '../constants'
import StyledText from './styled-text'

const HugeLinkBox = styled(FlexBox)({
  transition: '0.2s ease'
})

const HugeLink = ({ href, children, ...rest }) => (
  <a href={href} target='_blank' rel='noopener noreferrer'>
    <HugeLinkBox
      alignItems='center'
      justifyContent='center'
      width height={{ all: pxToRem(170), M: pxToRem(80) }}
      radius={{ all: pxToRem(85), M: pxToRem(40) }}
      {...rest}
    >
      <Text variant={{ all: 'intro', M: 'header' }} fg='black'>
        {children}
      </Text>
    </HugeLinkBox>
  </a>
)

const FooterBox = styled(FlexBox)({ flex: 1 })

const Footer = (props) => {
  return (
    <FooterBox flexDirection='column' mgt={{ M: -6 }} {...props}>
      <FlexGrid space={4}>
        <FlexGrid.Item col={12} mgt={{ all: 10, M: 0 }}>
          <HugeLink
            href='mailto:hello@ermolaeva.co'
            tm={cs('inverted', ps('&:hover', 'red'))}
            hideOn='M'
          >
            hello@ermolaeva.co
          </HugeLink>
          <Box display={{ all: 'none', M: 'block' }}>
            <HugeLink
              href='mailto:hello@ermolaeva.co'
              tm='red'
            >
              email
            </HugeLink>
          </Box>
        </FlexGrid.Item>
      </FlexGrid>
      <FlexGrid space={{ all: 4, M: 2 }} spacex={{ M: 1 }} flexWrap='wrap'>
        <FlexGrid.Item col={{ all: 7, M: 12 }} mgt={{ all: 3, M: 0 }}>
          <HugeLink
            href='https://instagram.com/ermlvaa/'
            tm={cs('inverted', ps('&:hover', 'green'))}
            hideOn='M'
          >
            instagram
          </HugeLink>
          <Box display={{ all: 'none', M: 'block' }}>
            <HugeLink
              href='https://instagram.com/ermlvaa/'
              tm='green'
            >
              ig
            </HugeLink>
          </Box>
        </FlexGrid.Item>
        <FlexGrid.Item col={{ all: 5, M: 12 }} mgt={{ all: 3, M: 0 }}>
          <HugeLink
            href='https://www.are.na/tanya-ermolaeva'
            tm={cs('inverted', ps('&:hover', 'blue'))}
            hideOn='M'
          >
            are.na
          </HugeLink>
          <Box display={{ all: 'none', M: 'block' }}>
            <HugeLink
              href='https://instagram.com/ermlvaa/'
              tm='blue'
            >
              are.na
            </HugeLink>
          </Box>
        </FlexGrid.Item>
      </FlexGrid>
      <Box mgt='auto'>
        <FlexGrid spacex={4}>
          <FlexGrid.Item
            offset={6}
            col={6}
            mgt={7}
          >
            <StyledText
              variant='caption'
              fg='lightGrey'
              linkHoverFg='white'
            >
              Web development by{' '}
              <a
                href='https://sergeyzakharov.dev'
                target='_blank'
                rel='noopener noreferrer'
              >
                Sergey Zakharov
              </a>
            </StyledText>
          </FlexGrid.Item>
        </FlexGrid>
      </Box>
    </FooterBox>
  )
}

export default Footer
