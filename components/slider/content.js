import { Box, Image } from 'pss-components'
import { ps } from 'pss'
import React, { useRef } from 'react'
import useInView from 'react-hook-inview'

import {
  SLIDER_LAST_ITEM_PADDING,
  SLIDER_LAST_ITEM_PADDING_M,
  pxToRem
} from '../../constants'
import InlineFlexBox from '../inline-flexbox'
import LazyMount from '../lazy-mount'
import VideoItem from '../video-item'

const SliderContent = ({
  setSlidesRef,
  items,
  nextSlide,
  prevSlide,
  hasNextSlide,
  hasPrevSlide,
  onEnterViewport,
  onLeaveViewport,
  pauseAnimation
}) => {
  const boxRef = useRef(null)

  useInView({
    target: boxRef,
    onEnter: onEnterViewport,
    onLeave: onLeaveViewport
  })

  return (
    <Box
      ov='auto'
      pdy={10}
      position='relative'
      ref={boxRef}
      mgx={{ all: -6, M: -2 }}
    >
      <InlineFlexBox
        alignItems='center'
        flexWrap={false}
        ref={setSlidesRef}
      >
        {items.map(item => {
          const video = item.fields.video
          const image = item.fields.image
          return (
            <LazyMount
              key={item.sys.id}
              pdr={{
                all: ps('&:last-child', SLIDER_LAST_ITEM_PADDING),
                M: ps('&:last-child', SLIDER_LAST_ITEM_PADDING_M)
              }}
              mgx={{ all: 12, M: 4 }}
              width={{ all: pxToRem(image.fields.file.details.image.width / 2), M: '85vw' }}
            >
              {video ? (
                <Box width>
                  <VideoItem
                    video={video}
                    image={item.fields.image}
                  />
                </Box>
              ) : (
                <Image
                  src={image.fields.file.url}
                  width
                />
              )}
            </LazyMount>
          )
        })}
      </InlineFlexBox>
    </Box>
  )
}

export default SliderContent
