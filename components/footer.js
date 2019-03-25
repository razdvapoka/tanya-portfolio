import { FlexBox, FlexGrid, Text } from 'pss-components'
import { cs, ps } from 'pss'
import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import { ContentText } from './styled-text'
import { pxToRem } from '../constants'
import HashLink from './hashlink'

const HugeLinkBox = styled(FlexBox)({
  transition: '0.2s ease'
})

const HugeLink = ({ href, children, ...rest }) => (
  <a href={href} target='_blank' rel='noopener noreferrer'>
    <HugeLinkBox
      alignItems='center'
      justifyContent='center'
      width height={pxToRem(170)}
      radius={pxToRem(85)}
      {...rest}
    >
      <Text variant='intro' fg='black'>
        {children}
      </Text>
    </HugeLinkBox>
  </a>
)

const FooterBox = styled(FlexBox)({
  flex: 1
})

const Footer = ({ sections = [], ...rest }) => {
  const listedSections = useMemo(
    () => sections.filter(
      section => section.fields.isListedInFooter
    ),
    [ sections ]
  )
  return (
    <FooterBox flexDirection='column' {...rest}>
      <FlexGrid space={4}>
        <FlexGrid.Item col={12} mgt={10}>
          <HugeLink
            href='mailto:hello@ermolaeva.co'
            tm={cs('inverted', ps('&:hover', 'red'))}
          >
            hello@ermolaeva.co
          </HugeLink>
        </FlexGrid.Item>
      </FlexGrid>
      <FlexGrid space={4}>
        <FlexGrid.Item col={7} mgt={3}>
          <HugeLink
            href='https://instagram.com/ermlvaa/'
            tm={cs('inverted', ps('&:hover', 'green'))}
          >
            instagram
          </HugeLink>
        </FlexGrid.Item>
        <FlexGrid.Item col={5} mgt={3}>
          <HugeLink
            href='https://www.are.na/tanya-ermolaeva'
            tm={cs('inverted', ps('&:hover', 'blue'))}
          >
            are.na
          </HugeLink>
        </FlexGrid.Item>
      </FlexGrid>
      {listedSections.length > 0 && (
        <FlexGrid space={4} zIndex={1}>
          <FlexGrid.Item col={6} />
          <FlexGrid.Item col={6}>
            <FlexGrid.Content mgt={10}>
              {listedSections.map((section, sectionIndex) => (
                <HashLink key={sectionIndex} hash={section.fields.hash}>
                  <ContentText
                    variant='body'
                    fg='secondary'
                  >
                    <a>{section.fields.title}</a>
                  </ContentText>
                </HashLink>
              ))}
            </FlexGrid.Content>
          </FlexGrid.Item>
        </FlexGrid>
      )}
    </FooterBox>
  )
}

export default Footer
