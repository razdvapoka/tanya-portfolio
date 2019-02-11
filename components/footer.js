import { Box, FlexBox, FlexGrid, Text } from 'pss-components'
import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { withRouter } from 'next/router'
import anime from 'animejs'
import { SCROLL_VELOCITY } from '../constants'

const List = styled(FlexBox)({
  margin: 0,
  padding: 0,
  textIndent: 0,
  listStyleType: 'none'
}).withComponent('ul')

const ScrollToHashLink = withRouter(({
  router,
  hash,
  children
}) => {
  const handleClick = useMemo(() => () => {
    const scrollTarget = document.querySelector(`#${hash}`)
    const { top } = scrollTarget.getBoundingClientRect()
    const duration = Math.abs(top, window.scrollY) / SCROLL_VELOCITY
    anime({
      targets: window.document.scrollingElement,
      scrollTop: top + window.scrollY,
      easing: 'linear',
      duration,
      complete: () => router.push(`/#${hash}`)
    })
  }, [ hash ])
  return (
    <Text
      variant='body'
      onClick={handleClick}
    >
      {children}
    </Text>
  )
})

const Footer = ({ sections }) => {
  const selectedSection = useMemo(
    () => sections.filter(
      section => section.fields.isFooterFeatured
    ),
    [ sections ]
  )[0]
  return selectedSection ? (
    <Box mgt='auto'>
      <FlexGrid space={4} zIndex={1}>
        <FlexGrid.Item col={6}>
          <FlexGrid.Content>
            <List flexDirection='column'>
              {selectedSection.fields.items.map((item, itemIndex) => {
                return (
                  <li key={itemIndex}>
                    <ScrollToHashLink hash={item.fields.hash}>
                      {item.fields.title}
                    </ScrollToHashLink>
                  </li>
                )
              })}
            </List>
          </FlexGrid.Content>
        </FlexGrid.Item>
        <FlexGrid.Item col={6}>
          <FlexGrid.Content height>
            <FlexBox
              flexDirection='column'
              justifyContent='space-between'
              height
            >
              <List height='100%' flexDirection='column' justifyContent='space-between'>
                {sections.filter(_ => _.fields.isFooterListed).map((section, sectionIndex) => (
                  <li key={sectionIndex}>
                    <ScrollToHashLink hash={section.fields.hash}>
                      {section.fields.title}
                    </ScrollToHashLink>
                  </li>
                ))}
              </List>
            </FlexBox>
          </FlexGrid.Content>
        </FlexGrid.Item>
      </FlexGrid>
    </Box>
  ) : null
}

export default Footer
