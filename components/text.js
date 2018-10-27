import { base, typography, propStylesInTheme } from 'pss'
import styled from 'react-emotion'
import { Base } from './base'

const Text = styled(Base)(
  base,
  typography,
  propStylesInTheme('textStyleFlag')
)

export default Text
