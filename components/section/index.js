import { Box, FlexGrid } from 'pss-components'
import Markdown from 'react-markdown'
import React from 'react'
import StyledText from '../styled-text'
import SectionHeader from './header'
import { pxToRem } from '../../constants'
import Gallery from '../gallery'
import Slider from '../slider'

const getSectionContentComp = (sectionType) => {
  switch (sectionType) {
    case 'gallery': return Gallery
    case 'slider': return Slider
    default: return Box
  }
}

const SectionBottom = ({ content }) => (
  <FlexGrid mgt={15} spacex={4} zIndex={1}>
    <FlexGrid.Item col={6} offset={6}>
      <FlexGrid.Content opacity={0.6}>
        {content && (
          <StyledText as={Markdown} variant='body'>
            {content}
          </StyledText>
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
    <Box
      pdt={7}
      pdb={29}
      pdx={4}
      as='section'
      minHeight={pxToRem(1190)}
      position='relative'
      tm={palette}
    >
      <SectionHeader
        title={title}
        description={description}
      />
      <SectionContent items={items} />
      <SectionBottom content={bottom} />
    </Box>
  )
}

export default Section
