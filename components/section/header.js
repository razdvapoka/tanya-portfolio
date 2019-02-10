import { FlexGrid, Text } from 'pss-components'
import Markdown from 'react-markdown'
import React from 'react'
import StyledText from '../styled-text'

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
        <StyledText
          as={Markdown}
          variant='body'
          linkTarget='_blank'
        >
          {description}
        </StyledText>
      </FlexGrid.Content>
    </FlexGrid.Item>
  </FlexGrid>
)

export default SectionHeader
