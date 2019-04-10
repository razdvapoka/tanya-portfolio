import { Text } from 'pss-components'
import styled from '@emotion/styled'

import { pxToRem } from '../constants'

const StyledText = styled(Text)(({
  theme,
  palette = 'default',
  iconWidth = pxToRem(11),
  iconHeight = pxToRem(11),
  iconMgl = pxToRem(7),
  iconWidthM = pxToRem(8),
  iconHeightM = pxToRem(7),
  iconMglM = pxToRem(4)
}) => ({
  '& a': {
    borderBottom: `solid ${pxToRem(0.5)}`
  },
  '& a:after': {
    color: 'inherit',
    display: 'inline-block',
    content: '" "',
    width: iconWidth,
    height: iconHeight,
    marginLeft: iconMgl,
    backgroundImage: `url('data:image/svg+xml;utf8,
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 12 12">
        <g fill="none" fill-rule="evenodd" stroke="${theme.palette[palette].secondary.replace('#', '%23')}" transform="translate(0 1)">
          <path stroke-linecap="square" d="M-8.52651283e-14,10.5 L10.111627,0.388373029"/>
          <polyline points=".5 0 10.5 0 10.5 10"/>
        </g>
      </svg>'
    )`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    [`@media ${theme.media.M}`]: {
      width: iconWidthM,
      height: iconHeightM,
      marginLeft: iconMglM,
      backgroundImage: `url('data:image/svg+xml;utf8,
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 12 12">
          <g fill="none" fill-rule="evenodd" stroke="${theme.palette[palette].secondary.replace('#', '%23')}" transform="translate(0 1)">
            <path stroke-linecap="square" d="M-8.52651283e-14,10.5 L10.111627,0.388373029"/>
            <polyline points=".5 0 10.5 0 10.5 10"/>
          </g>
        </svg>'
      )`
    }
  }
}))

export const ContentText = styled(Text)`
  & strong {
     font-weight: normal;
     color: white;
  }
  & a {
    border-bottom: solid ${pxToRem(2)};
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  & a:hover {
    color: white;
  }
`

export default StyledText
