import {
  Box,
  FlexBox,
  Image
} from 'pss-components'
import { ps } from 'pss'
import React from 'react'

import { pxToRem } from '../constants'

class Slider extends React.Component {
  render () {
    const { items } = this.props
    return (
      <FlexBox
        position='absolute' left top width height
        alignItems='center'
        justifyContent='center'
      >
        <Box ov='auto' pdy={10}>
          <FlexBox
            alignItems='center'
            flexWrap={false}
          >
            {items.map(item => {
              const image = item.fields.image.fields.file
              return (
                <Box
                  key={item.sys.id}
                  pdr={ps('&:last-child', 12)}
                  mgx={12}
                >
                  <Image
                    src={image.url}
                    minWidth={pxToRem(image.details.image.width / 2)}
                  />
                </Box>
              )
            })}
          </FlexBox>
        </Box>
      </FlexBox>
    )
  }
}

export default Slider
