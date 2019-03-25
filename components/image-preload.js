import { Box, Image } from 'pss-components'
import React, { useState, useEffect } from 'react'

import { pxToRem } from '../constants'

const ImagePreload = ({ src, ...rest }) => {
  const [ isPreloaded, setIsPreloaded ] = useState(false)
  useEffect(() => {
    const image = new window.Image()
    image.addEventListener('load', () => setIsPreloaded(true))
    image.src = src
  }, [])
  return (
    <Box
      opacity={isPreloaded ? 1 : 0}
      transform={`translateY(${isPreloaded ? 0 : pxToRem(50)})`}
      transition='opacity 0.5s ease, transform 0.5s ease'
    >
      <Image
        src={src} {...rest}
      />
    </Box>
  )
}

export default ImagePreload
