import { Box, FlexGrid, Image, Text } from 'pss-components'
import LazyLoad from 'react-lazyload'
import React from 'react'
import { pxToRem } from '../constants'

const Gallery = ({ items }) => (
  <FlexGrid spacex={4} spacey={24}>
    {items.map(item => (
      <FlexGrid.Item col={6} key={item.sys.id}>
        <FlexGrid.Content>
          <LazyLoad
            placeholder={<Box height={pxToRem(385)} />}
            offset={100}
            once
          >
            <Image
              width
              height={pxToRem(385)}
              src={item.fields.image.fields.file.url}
              bg='grey'
            />
          </LazyLoad>
          <Box opacity={0.6} mgt={1}>
            <Text variant='caption'>
              {item.fields.caption}
            </Text>
          </Box>
        </FlexGrid.Content>
      </FlexGrid.Item>
    ))}
  </FlexGrid>
)

export default Gallery
