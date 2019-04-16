import { Box, FlexGrid, Text } from 'pss-components'
import { cs, ps } from 'pss'
import LazyLoad from 'react-lazyload'
import Link from 'next/link'
import React from 'react'

import { pxToRem } from '../constants'
import ImagePreload from './image-preload'

const placeholder = (
  <Box
    height={{
      all: pxToRem(385),
      M: pxToRem(200)
    }}
  />
)

const Gallery = ({ items }) => (
  <FlexGrid
    spacex={4}
    spacey={{ all: 24, M: 4 }}
    flexWrap={{ M: 'wrap' }}
  >
    {items.map(item => (
      <FlexGrid.Item
        col={{ all: 6, M: 12 }}
        key={item.sys.id}
        id={item.fields.hash}
      >
        <FlexGrid.Content className='gallery-item'>
          <Link href={`/project/${item.fields.hash}`}>
            <a>
              <LazyLoad
                placeholder={placeholder}
                offset={100}
                once
              >
                <Box
                  className='highlighter'
                  outline={`${pxToRem(5)} solid transparent`}
                >
                  <ImagePreload
                    height={{ all: pxToRem(385), M: pxToRem(200) }}
                    src={item.fields.image.fields.file.url}
                    bg='grey'
                  />
                </Box>
              </LazyLoad>
              <Box
                mgt={1}
                fg={cs('grey', ps('.gallery-item: hover &', 'white'))}
                transition='color 0.2s ease'
                hideOn='M'
              >
                <Text variant='caption'>
                  {item.fields.caption}
                </Text>
              </Box>
              <Box
                display={{ all: 'none', M: 'block' }}
                mgt={1}
                opacity={0.6}
              >
                <Text variant='caption'>
                  {item.fields.caption}
                </Text>
              </Box>
            </a>
          </Link>
        </FlexGrid.Content>
      </FlexGrid.Item>
    ))}
  </FlexGrid>
)

export default Gallery
