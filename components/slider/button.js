import { Box } from 'pss-components'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Cursor } from '..'

const Button = styled(Box)(({ disabled }) => ({
  pointerEvents: disabled ? 'none' : 'auto',
  border: 0,
  outline: 0,
  position: 'absolute',
  top: 0,
  width: '25%',
  height: '100%',
  '&:hover': { cursor: 'none' }
})).withComponent('button')

const SliderButton = ({
  cursorText,
  onClick,
  ...rest
}) => {
  const [ cursorPos, setCursorPos ] = useState(null)
  const handleMouseMove = (e) => {
    setCursorPos({ left: e.clientX, top: e.clientY })
  }
  const handleMouseLeave = () => {
    setCursorPos(null)
  }

  const handleClick = () => {
    onClick()
  }

  return (
    <>
      {cursorPos && (
        <Cursor
          position='fixed'
          variant='sliderButton'
          fg='button'
          {...cursorPos}
        >
          {cursorText}
        </Cursor>
      )}
      <Button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...rest}
      />
    </>
  )
}

export default SliderButton
