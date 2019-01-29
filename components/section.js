import { Box, FlexBox, FlexGrid, Text } from 'pss-components'
import Markdown from 'react-markdown'
import React from 'react'
import styled from '@emotion/styled'

import { pxToRem } from '../constants'
import Gallery from './gallery'
import Slider from './slider'

const getSectionContentComp = (sectionType) => {
  switch (sectionType) {
    case 'gallery': return Gallery
    case 'slider': return Slider
    default: return Box
  }
}

const SectionText = styled(Text)`
  & a {
    color: ${props => props.theme.color.grey}
  }
  & a:hover {
    text-decoration: underline
  }
`

const SectionHeader = ({
  title,
  description
}) => (
  <FlexGrid space={4} zIndex={1}>
    <FlexGrid.Item col={6}>
      <FlexGrid.Content>
        <Text variant='header'>
          {title}
        </Text>
      </FlexGrid.Content>
    </FlexGrid.Item>
    <FlexGrid.Item col={6}>
      <FlexGrid.Content opacity={0.6}>
        <SectionText
          as={Markdown}
          variant='body'
          linkTarget='_blank'
        >
          {description}
        </SectionText>
      </FlexGrid.Content>
    </FlexGrid.Item>
  </FlexGrid>
)

const SectionBottom = ({ content }) => (
  <FlexGrid mgt={15} spacex={4} zIndex={1}>
    <FlexGrid.Item col={6} offset={6}>
      <FlexGrid.Content opacity={0.6}>
        {content && (
          <SectionText as={Markdown} variant='body'>
            {content}
          </SectionText>
        )}
      </FlexGrid.Content>
    </FlexGrid.Item>
  </FlexGrid>
)

const Section = ({
  title,
  description,
  items,
  palette,
  type,
  bottom
}) => {
  const SectionContent = getSectionContentComp(type)
  return (
    <FlexBox
      pdt={7}
      pdb={29}
      pdx={4}
      as='section'
      minHeight={pxToRem(1190)}
      position='relative'
      tm={palette}
      flexDirection='column'
      justifyContent='space-between'
      alignItems='stretch'
    >
      <SectionHeader
        title={title}
        description={description}
      />
      <SectionContent items={items} />
      <SectionBottom content={bottom} />
    </FlexBox>
  )
}

export default Section
