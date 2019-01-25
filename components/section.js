import { pxToRem } from '../constants'
import Markdown from 'react-markdown'
import React from 'react'
import {
  Box,
  FlexGrid,
  Text,
  Image
} from 'pss-components'
import styled from '@emotion/styled'
import LazyLoad from 'react-lazyload'

const SectionText = styled(Text)`
  & a {
    color: ${props => props.theme.color.grey}
  }
  & a:hover {
    text-decoration: underline
  }
`

const SectionHeader = ({
  title,
  description
}) => (
  <FlexGrid space={4}>
    <FlexGrid.Item col={6}>
      <FlexGrid.Content>
        <Text variant='header'>
          {title}
        </Text>
      </FlexGrid.Content>
    </FlexGrid.Item>
    <FlexGrid.Item col={6}>
      <FlexGrid.Content opacity={0.6}>
        <SectionText
          as={Markdown}
          variant='body'
          linkTarget='_blank'
        >
          {description}
        </SectionText>
      </FlexGrid.Content>
    </FlexGrid.Item>
  </FlexGrid>
)

const Gallery = ({ items }) => (
  <FlexGrid spacex={4} spacey={24}>
    {items.map(item => (
      <FlexGrid.Item col={6} key={item.sys.id}>
        <FlexGrid.Content>
          <LazyLoad
            placeholder={<Box height={pxToRem(385)} />}
            offset={100}
            once
          >
            <Image
              width='100%'
              height={pxToRem(385)}
              src={item.fields.image.fields.file.url}
              bg='grey'
            />
          </LazyLoad>
          <Box opacity={0.6} mgt={1}>
            <Text variant='caption'>
              {item.fields.caption}
            </Text>
          </Box>
        </FlexGrid.Content>
      </FlexGrid.Item>
    ))}
  </FlexGrid>
)

const getContentComp = (sectionType) => {
  switch (sectionType) {
    case 'gallery': return Gallery
    default: return Box
  }
}

const Section = ({
  title,
  description,
  items,
  palette,
  type,
  bottom
}) => {
  const Content = getContentComp(type)
  return (
    <Box
      pdt={7}
      pdb={29}
      pdx={4}
      as='section'
      minHeight={pxToRem(1190)}
      position='relative'
      tm={palette}
    >
      <SectionHeader
        title={title}
        description={description}
      />
      <Content items={items} />
      {bottom && (
        <FlexGrid mgt={15} spacex={4}>
          <FlexGrid.Item col={6} offset={6}>
            <FlexGrid.Content opacity={0.6}>
              <SectionText as={Markdown} variant='body'>
                {bottom}
              </SectionText>
            </FlexGrid.Content>
          </FlexGrid.Item>
        </FlexGrid>
      )}
    </Box>
  )
}

export default Section
