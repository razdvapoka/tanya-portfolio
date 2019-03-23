import { Text } from 'pss-components'
import styled from '@emotion/styled'

import { pxToRem } from '../constants'

const StyledText = styled(Text)`
  & strong {
     color: white;
  }
  & a {
    border-bottom: solid ${pxToRem(2)};
  }
  & a:after {
    color: inherit;
    display: inline-block;
    content: ' ';
    width: ${pxToRem(13)};
    height: ${pxToRem(13)};
    margin-left: ${pxToRem(7)};
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13"><polygon fill="${({ theme, palette }) => theme.palette[palette].secondary.replace('#', '%23')}" points="1242.5 5283.18 1250.82 5283.18 1250.82 5291.5 1249.18 5291.5 1249.18 5286 1239.5 5295.68 1238.32 5294.5 1248 5284.82 1242.5 5284.82" transform="translate(-1238 -5283)"/></svg>');
    background-repeat: no-repeat;
    background-size: contain;
  }
`

export default StyledText
