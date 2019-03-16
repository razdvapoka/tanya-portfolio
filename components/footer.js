import { FlexBox, FlexGrid, Text } from 'pss-components'
import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import { pxToRem } from '../constants'
import HashLink from './hashlink'

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
        <FlexGrid.Item col={12} mgt={10}>
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
      <FlexGrid space={4} zIndex={1}>
        <FlexGrid.Item col={6} />
        <FlexGrid.Item col={6}>
          <FlexGrid.Content mgt={10}>
            {listedSections.map((section, sectionIndex) => (
              <HashLink key={sectionIndex} hash={section.fields.hash}>
                <Text
                  variant='body'
                  fg='secondary'
                >
                  {section.fields.title}
                </Text>
              </HashLink>
            ))}
          </FlexGrid.Content>
        </FlexGrid.Item>
      </FlexGrid>
    </FooterBox>
  )
}

export default Footer
