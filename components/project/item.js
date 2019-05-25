import { Box, Image, Text } from 'pss-components'
import Markdown from 'react-markdown'
import React from 'react'
import { pxToRem } from '../../constants'

import StyledText from '../styled-text'
import VideoItem from '../video-item'

const ImageItem = ({ image, text }) => (
  <Box position='relative'>
    <Box
      width
      ratio={image.fields.file.details.image.width / image.fields.file.details.image.height}
      bg='lightGrey'
    >
      <Image width src={image.fields.file.url} />
    </Box>
    {text && (
      <Box position='absolute' left='50%' top='100%' maxWidth={1 / 3}>
        <Text mgt={1}>{text}</Text>
      </Box>
    )}
  </Box>
)

const TextItem = ({ text, palette, fg, style, variant }) => (
  <StyledText
    as={Markdown}
    palette={palette}
    variant={variant}
    linkTarget='_blank'
    iconWidth={pxToRem(20)}
    iconHeight={pxToRem(20)}
    iconWidthM={pxToRem(15)}
    iconHeightM={pxToRem(15)}
  >
    {text}
  </StyledText>
)

const getItemComponent = (type) => {
  switch (type) {
    case 'video': return VideoItem
    case 'image': return ImageItem
    case 'text': return TextItem
    default: return Box
  }
}

const ProjectItem = ({ type, ...rest }) => {
  const ItemComponent = getItemComponent(type)
  return (
    <ItemComponent withCursor {...rest} />
  )
}

export default ProjectItem
