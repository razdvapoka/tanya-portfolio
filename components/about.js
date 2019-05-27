import { Box, FlexGrid } from 'pss-components'
import React from 'react'
import StyledText from './styled-text'
import Markdown from 'react-markdown'

const AboutColumn = ({
  palette,
  children
}) => (
  <FlexGrid.Item col={{ all: 6, M: 12 }}>
    <StyledText
      as={Markdown}
      palette={palette}
      variant='body'
    >
      {children}
    </StyledText>
  </FlexGrid.Item>
)

const About = ({
  description,
  descriptionAlt,
  palette,
  ...rest
}) => (
  <Box mgt={{ all: 15, M: 0 }}>
    <FlexGrid space={4} flexDirection={{ M: 'column' }}>
      <AboutColumn palette={palette}>
        {description}
      </AboutColumn>
      <AboutColumn palette={palette}>
        {descriptionAlt}
      </AboutColumn>
    </FlexGrid>
  </Box>
)

export default About
