import { Box, FlexBox, FlexGrid } from 'pss-components'
import Markdown from 'react-markdown'
import React from 'react'

import { pxToRem } from '../../constants'
import Footer from '../footer'
import Gallery from '../gallery'
import SectionHeader from './header'
import Slider from '../slider'
import StyledText from '../styled-text'

const getSectionProps = (sectionType) => {
  switch (sectionType) {
    case 'gallery': return { component: Gallery }
    case 'slider': return { component: Slider }
    case 'footer': return {
      component: Footer,
      minHeight: pxToRem(790),
      pdb: 14,
      as: 'footer'
    }
    default: return { component: Box }
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
  hash,
  title,
  description,
  items,
  palette,
  type,
  bottom,
  sections
}) => {
  const {
    component: SectionContent,
    ...rest
  } = getSectionProps(type)
  return (
    <FlexBox
      id={hash}
      flexDirection='column'
      pdt={7}
      pdb={29}
      pdx={4}
      as='section'
      minHeight={pxToRem(1190)}
      position='relative'
      tm={palette}
      {...rest}
    >
      <SectionHeader
        title={title}
        description={description}
      />
      <SectionContent items={items} sections={sections} />
      {bottom && <SectionBottom content={bottom} />}
    </FlexBox>
  )
}

export default Section
