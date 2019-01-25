import React from 'react'
import { FlexBox, FlexGrid, Text } from 'pss-components'

const Header = () => (
  <FlexGrid as='header' height='headerHeight' spacex={4}>
    <FlexGrid.Item col={6}>
      <FlexBox width height alignItems='center' justifyContent='space-between'>
        <Text variant='menuItem'>Tanya E.</Text>
        <Text variant='menuItem'>About</Text>
        <Text />
        <Text />
      </FlexBox>
    </FlexGrid.Item>
    <FlexGrid.Item col={6}>
      <FlexBox width height alignItems='center' justifyContent='space-between'>
        <Text variant='menuItem'>Criticism online</Text>
        <Text variant='menuItem'>Instagram</Text>
        <Text variant='menuItem'>Works</Text>
        <Text variant='menuItem'>Contact</Text>
      </FlexBox>
    </FlexGrid.Item>
  </FlexGrid>
)

export default Header
