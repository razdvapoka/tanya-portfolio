import { Box, Image, Text } from 'pss-components'
import React, { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useInView from 'react-hook-inview'
import Markdown from 'react-markdown'

import StyledText from '../styled-text'

const Video = styled(Box)().withComponent('video')

const VideoItem = ({
  video,
  image,
  inViewport,
  text,
  palette
}) => {
  const videoRef = useRef(null)
  const [ isPlaying, setIsPlaying ] = useState(false)
  useEffect(() => {
    videoRef.current.addEventListener('ended', handleComplete)
    return () => {
      videoRef.current.removeEventListener('ended', handleComplete)
    }
  }, [ videoRef ])

  const play = () => {
    videoRef.current.play()
    setIsPlaying(true)
  }

  const pause = () => {
    videoRef.current.pause()
    setIsPlaying(false)
  }

  const handleComplete = () => {
    pause()
    videoRef.current.currentTime = 0
    play()
  }

  const handleClick = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  useInView({
    target: videoRef,
    onEnter: play,
    onLeave: pause
  })

  return (
    <>
      <Video
        src={video.fields.file.url}
        poster={image.fields.file.url}
        width='100%'
        ref={videoRef}
        onClick={handleClick}
      />
      {text && (
        <StyledText palette={palette}>{text}</StyledText>
      )}
    </>
  )
}

const ImageItem = ({ image, text }) => (
  <Box position='relative'>
    <Image width src={image.fields.file.url} />
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
    <ItemComponent {...rest} />
  )
}

export default ProjectItem
