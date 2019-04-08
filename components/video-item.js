import React, { useRef, useState } from 'react'
import useInView from 'react-hook-inview'

import Cursor from './cursor'
import StyledText from './styled-text'

const VideoItem = ({
  video,
  image,
  inViewport,
  text,
  palette,
  withCursor
}) => {
  const [ cursorPos, setCursorPos ] = useState(null)
  const handleMouseMove = (e) => {
    if (withCursor) {
      setCursorPos({ left: e.clientX, top: e.clientY })
    }
  }

  const handleMouseLeave = () => {
    setCursorPos(null)
  }

  const videoRef = useRef(null)
  const [ isPlaying, setIsPlaying ] = useState(false)

  const play = () => {
    if (!videoRef.current.hasAttribute('muted')) {
      videoRef.current.setAttribute('muted', '')
    }
    videoRef.current.play()
    setIsPlaying(true)
  }

  const pause = () => {
    videoRef.current.pause()
    setIsPlaying(false)
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
      {withCursor && cursorPos && (
        <Cursor
          position='fixed'
          variant='sliderButton'
          fg={isPlaying ? 'red' : 'green'}
          {...cursorPos}
        >
          {isPlaying ? 'pause' : 'play'}
        </Cursor>
      )}
      <video
        src={video.fields.file.url}
        poster={image.fields.file.url}
        width='100%'
        ref={videoRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        cursor={withCursor ? 'none' : 'default'}
        playsInline
        loop
      />
      {text && (
        <StyledText palette={palette}>{text}</StyledText>
      )}
    </>
  )
}

export default VideoItem