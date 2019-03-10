import { Box, Image } from 'pss-components'
import { ps } from 'pss'
import React from 'react'
import handleInViewport from 'react-in-viewport'

import { SLIDER_LAST_ITEM_PADDING, pxToRem } from '../../constants'
import InlineFlexBox from '../inline-flexbox'

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
        const image = item.fields.image.fields.file
        return (
          <Box
            key={item.sys.id}
            pdr={ps('&:last-child', SLIDER_LAST_ITEM_PADDING)}
            mgx={12}
          >
            <Image
              src={image.url}
              minWidth={pxToRem(image.details.image.width / 2)}
            />
          </Box>
        )
      })}
    </InlineFlexBox>
  </Box>
))

export default SliderContent
