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
            <HashLink
              hash={section.fields.hash}
              variant='header'
              cursor='pointer'
            >
              {section.fields.title}
            </HashLink>
          </FlexBox.Item>
        ))}
      </FlexBox>
    </FooterBox>
  )
}

export default Footer
