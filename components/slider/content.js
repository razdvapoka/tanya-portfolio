import {
  Box,
  Image
} from 'pss-components'
import { ps } from 'pss'
import React from 'react'
import handleInViewport from 'react-in-viewport'
import styled from '@emotion/styled'
import { SLIDER_LAST_ITEM_PADDING, pxToRem } from '../../constants'
import InlineFlexBox from '../inline-flexbox'

const SliderButton = styled(Box)(({ disabled }) => ({
  pointerEvents: disabled ? 'none' : 'auto',
  border: 0,
  outline: 0,
  position: 'absolute',
  top: 0,
  width: '25%',
  height: '100%'
})).withComponent('button')

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
    ref={innerRef}
    position='relative'
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
    <SliderButton
      left
      onClick={prevSlide}
      disabled={!hasPrevSlide}
      cursor='url(/static/images/cursor-arrow-left.png) 60 50, auto'
    />
    <SliderButton
      right
      onClick={nextSlide}
      disabled={!hasNextSlide}
      cursor='url(/static/images/cursor-arrow-right.png) 60 50, auto'
    />
  </Box>
))

export default SliderContent
