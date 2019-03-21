import { Box, Text } from 'pss-components'
import styled from '@emotion/styled'

import { pxToRem } from '../constants'

const Cursor = styled(Text)({
  'WebkitTextStroke': `${pxToRem(1)} black`,
  transform: 'translateX(-50%)',
  willChange: 'left, top'
}).withComponent(Box)

export default Cursor
