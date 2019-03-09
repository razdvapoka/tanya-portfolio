import { FlexBox, FlexGrid, Text } from 'pss-components'
import { withRouter } from 'next/router'
import React, { useMemo } from 'react'
import anime from 'animejs'
import styled from '@emotion/styled'

import { SCROLL_VELOCITY, pxToRem } from '../constants'

const handleLinkClick = (hash, router) => () => {
  const scrollTarget = document.querySelector(`#${hash}`)
  const { top } = scrollTarget.getBoundingClientRect()
  const duration = Math.abs(top, window.scrollY) / SCROLL_VELOCITY
  anime({
    targets: window.document.scrollingElement,
    scrollTop: top + window.scrollY,
    easing: 'linear',
    duration,
    complete: () => {
      router.push(`/#${hash}`)
    }
  })
}

const LinkText = styled(Text)({
  cursor: 'pointer',
  display: 'inline'
})

const ScrollToHashLink = withRouter(({
  router,
  hash,
  children,
  ...rest
}) => {
  const handleClick = useMemo(
    () => handleLinkClick(hash, router),
    [ hash ]
  )
  return (
    <LinkText
      onClick={handleClick}
      {...rest}
    >
      {children}
    </LinkText>
  )
})

const HugeLink = ({ href, children, ...rest }) => (
  <a href={href} target='_blank' rel='noopener noreferrer'>
    <FlexBox
      alignItems='center'
      justifyContent='center'
      width height={pxToRem(170)}
      radius={pxToRem(85)}
      pdt={3}
      {...rest}
    >
      <Text variant='intro' fg='black'>
        {children}
      </Text>
    </FlexBox>
  </a>
)

const FooterBox = styled(FlexBox)({
  flex: 1
})

const Footer = ({ sections }) => {
  const listedSections = useMemo(
    () => sections.filter(
      section => section.fields.isListedInFooter
    ),
    [ sections ]
  )
  return (
    <FooterBox flexDirection='column'>
      <FlexGrid space={4}>
        <FlexGrid.Item col={12} mgt={5}>
          <HugeLink href='mailto:hello@ermolaeva.co' tm='red'>
            hello@ermolaeva.co
          </HugeLink>
        </FlexGrid.Item>
      </FlexGrid>
      <FlexGrid space={4}>
        <FlexGrid.Item col={7} mgt={3}>
          <HugeLink href='https://instagram.com/ermlvaa/' tm='green'>
            instagram
          </HugeLink>
        </FlexGrid.Item>
        <FlexGrid.Item col={5} mgt={3}>
          <HugeLink href='https://www.are.na/tanya-ermolaeva' tm='blue'>
            are.na
          </HugeLink>
        </FlexGrid.Item>
      </FlexGrid>
      <FlexBox mgt='auto' flexWrap>
        {listedSections.map((section, sectionIndex) => (
          <FlexBox.Item
            key={sectionIndex}
            flex={1 / 2}
            mgt={4}
          >
            <ScrollToHashLink
              hash={section.fields.hash}
              variant='header'
              cursor='pointer'
            >
              {section.fields.title}
            </ScrollToHashLink>
          </FlexBox.Item>
        ))}
      </FlexBox>
    </FooterBox>
  )
}

export default Footer
