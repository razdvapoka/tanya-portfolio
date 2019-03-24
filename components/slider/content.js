import { Box, Image } from 'pss-components'
import { ps } from 'pss'
import React from 'react'
import handleInViewport from 'react-in-viewport'

import { SLIDER_LAST_ITEM_PADDING, pxToRem } from '../../constants'
import InlineFlexBox from '../inline-flexbox'
import VideoItem from '../video-item'

const SliderContent = handleInViewport(({
  setSlidesRef,
  items,
  innerRef,
  nextSlide,
  prevSlide,
  hasNextSlide,
  hasPrevSlide
}) => (
  <Box
    ov='hidden'
    pdy={10}
    position='relative'
    ref={innerRef}
    mgx={-6}
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
          <Box
            key={item.sys.id}
            pdr={ps('&:last-child', SLIDER_LAST_ITEM_PADDING)}
            mgx={12}
          >
            {video ? (
              <Box width={pxToRem(image.fields.file.details.image.width / 2)}>
                <VideoItem
                  video={video}
                  image={item.fields.image}
                />
              </Box>
            ) : (
              <Image
                src={image.fields.file.url}
                minWidth={pxToRem(image.fields.file.details.image.width / 2)}
              />
            )}
          </Box>
        )
      })}
    </InlineFlexBox>
  </Box>
))

export default SliderContent
