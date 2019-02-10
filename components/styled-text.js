import { Text } from 'pss-components'
import styled from '@emotion/styled'

const StyledText = styled(Text)`
  & a {
    color: ${props => props.theme.color.grey}
  }
  & a:hover {
    text-decoration: underline
  }
`

export default StyledText
