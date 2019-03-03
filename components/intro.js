import React from 'react'
import handleInViewport from 'react-in-viewport'

import { Svg, TextLoop } from './'
import { pxToRem } from '../constants'

const Intro = handleInViewport(({
  width,
  height,
  loops,
  velocity,
  shift,
  innerRef,
  inViewport
}) => (
  <Svg
    viewBox={`0 0 ${width} ${height}`}
    ref={innerRef}
    mgt={`-${pxToRem(30)}`}
  >
    {loops.map((loop, i) => (
      <TextLoop
        key={i}
        index={i}
        shift={(i + 1) * shift}
        width={width}
        height={height}
        text={loop}
        velocity={velocity}
        inViewport={inViewport}
      />
    ))}
  </Svg>
))

export default Intro
