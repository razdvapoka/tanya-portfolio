import { FlexGrid, Text } from 'pss-components'
import Markdown from 'react-markdown'
import React from 'react'
import StyledText from '../styled-text'

const SectionHeader = ({
  title,
  description,
  headerColumns = [],
  palette,
  textComponent: TextComponent = StyledText,
  ...rest
}) => (
  <FlexGrid space={4} zIndex={1} flexWrap='wrap' mgb={{ M: 6 }} {...rest}>
    <FlexGrid.Item col={{ all: 6, M: 12 }} mgb={{ M: 6 }}>
      <FlexGrid.Content>
        <Text variant='header'>
          {title}
        </Text>
      </FlexGrid.Content>
    </FlexGrid.Item>
    {headerColumns.map((col, colIndex) => (
      <FlexGrid.Item
        key={colIndex}
        col={{
          all: 6 / headerColumns.length,
          M: 12 / headerColumns.length
        }}
      >
        <FlexGrid.Content>
          <TextComponent
            as={Markdown}
            variant='body'
            linkTarget='_blank'
            fg='secondary'
            palette={palette}
          >
            {col.fields.content}
          </TextComponent>
        </FlexGrid.Content>
      </FlexGrid.Item>
    ))}
  </FlexGrid>
)

export default SectionHeader
