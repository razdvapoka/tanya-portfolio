import { Box, FlexGrid, Text } from 'pss-components'
import { cs, ps } from 'pss'
import LazyLoad from 'react-lazyload'
import Link from 'next/link'
import React from 'react'

import { pxToRem } from '../constants'
import ImagePreload from './image-preload'

const Gallery = ({ items }) => (
  <FlexGrid spacex={4} spacey={24}>
    {items.map(item => (
      <FlexGrid.Item
        col={6}
        key={item.sys.id}
        id={item.fields.hash}
      >
        <FlexGrid.Content className='gallery-item'>
          <LazyLoad
            placeholder={<Box height={pxToRem(385)} />}
            offset={100}
            once
          >
            <Box
              className='highlighter'
              outline={`${pxToRem(5)} solid transparent`}
            >
              <Link href={`/project/${item.fields.hash}`}>
                <a>
                  <ImagePreload
                    height={pxToRem(385)}
                    src={item.fields.image.fields.file.url}
                    bg='grey'
                  />
                </a>
              </Link>
            </Box>
          </LazyLoad>
          <Box
            opacity={cs(0, ps('.gallery-item: hover &', 0.6))}
            mgt={1}
            transition='opacity 0.2s ease'
          >
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
