import { Box, FlexGrid, Image, Text } from 'pss-components'
import { ps } from 'pss'
import Markdown from 'react-markdown'
import React, { useState, useRef, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import styled from '@emotion/styled'

import useInView from 'react-hook-inview'

import StyledText from '../components/styled-text'

const { publicRuntimeConfig } = getConfig()

const Video = styled(Box)().withComponent('video')

const VideoItem = ({ video, image, inViewport }) => {
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
    console.log('COMPLETE')
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
    <Video
      src={video.fields.file.url}
      poster={image.fields.file.url}
      width='100%'
      ref={videoRef}
      onClick={handleClick}
    />
  )
}

const ImageItem = ({ image, text }) => (
  <Box position='relative'>
    <Image width src={image.fields.file.url} />
    {text && (
      <Box position='absolute' left='50%' top='100%' maxWidth={1 / 3} opacity={0.6}>
        <Text variant='caption' mgt={1}>{text}</Text>
      </Box>
    )}
  </Box>
)

const TextItem = ({ text, palette }) => (
  <StyledText
    variant='large'
    as={Markdown}
    palette={palette}
    fg='secondary'
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

class Project extends React.Component {
  static async getInitialProps (props) {
    const projectId = props.query.id
    const res = await fetch(publicRuntimeConfig.siteUrl + '/api/project/' + projectId)
    const project = await res.json()
    return { project }
  }

  render () {
    const { project, palette = 'dark' } = this.props
    const contentRows = project.fields.content
    return (
      <Box postion='relative' mgt={1} pdx={4} pdb={40} tm={palette}>
        <main>
          {contentRows.map((row, rowIndex) => {
            return (
              <Box key={rowIndex} mgt={ps('&:not(:first-child)', 20)} {...row.fields.props}>
                <FlexGrid space={4}>
                  {row.fields.columns.map((column, columnIndex) => {
                    return (
                      <FlexGrid.Item
                        key={columnIndex}
                        col={column.fields.width}
                        offset={column.fields.offset ? column.fields.offset : 0}
                      >
                        <ProjectItem {...column.fields.items.fields} palette={palette} />
                      </FlexGrid.Item>
                    )
                  })}
                </FlexGrid>
              </Box>
            )
          })}
        </main>
      </Box>
    )
  }
}

export default Project
