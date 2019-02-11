import { Box, FlexBox, FlexGrid, Text } from 'pss-components'
import Link from 'next/link'
import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { withRouter } from 'next/router'

const List = styled(FlexBox)({
  margin: 0,
  padding: 0,
  textIndent: 0,
  listStyleType: 'none'
}).withComponent('ul')

const Footer = ({ sections, router }) => {
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
                const href = `/#${item.fields.hash}`
                return (
                  <li key={itemIndex}>
                    <Link href={href}>
                      <a>
                        <Text variant='body'>
                          {item.fields.title}
                        </Text>
                      </a>
                    </Link>
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
                    <Link href={`/#${section.fields.hash}`}>
                      <a>
                        <Text variant='body' as='span'>
                          {section.fields.title}
                        </Text>
                      </a>
                    </Link>
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

export default withRouter(Footer)
