import { Box } from 'pss-components'
import React, { useRef, useEffect, useState } from 'react'
import useInView from 'react-hook-inview'
import styled from '@emotion/styled'

import StyledText from './styled-text'

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

export default VideoItem
