import { typography } from 'pss'
import styled from 'react-emotion'
import FlexBox from '../components/flexbox'

const Big = styled.h1(typography)

export default () => (
  <FlexBox
    maxWd='site'
    align='center'
    justify='center'
    column
    ht
  >
    <Big size={100} transform='uppercase' textStyle='sporting'>
      Tanya!
    </Big>
  </FlexBox>
)
