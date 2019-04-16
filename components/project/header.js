import { Box, FlexBox, FlexGrid, Text } from 'pss-components'
import { ps } from 'pss'
import Link from 'next/link'
import Markdown from 'react-markdown'
import React, { useRef } from 'react'
import styled from '@emotion/styled'
import useInView from 'react-hook-inview'

import { pxToRem } from '../../constants'
import ArrowCenterLeft from '../arrow-center-left'
import ArrowTopRight from '../arrow-top-right'
import StyledText from '../styled-text'

const TitleText = styled(Text)({
  transition: 'color 0.1s ease'
})

const HeaderText = styled(Text)({
  hyphens: 'auto'
})

const Header = styled(Box)().withComponent('header')

const ProjectHeader = ({
  project,
  palette,
  setIsHeaderVisible
}) => {
  const elementRef = useRef(null)

  const handleEnter = () => {
    setIsHeaderVisible(true)
  }

  const handleLeave = () => {
    setIsHeaderVisible(false)
  }

  useInView({
    target: elementRef,
    onEnter: handleEnter,
    onLeave: handleLeave,
    unobserveOnEnter: false
  })

  const title = (
    <FlexGrid.Item col={{ all: 6, M: 12 }} fg='white'>
      <HeaderText variant='header' lang='en'>
        {project.fields.title}
      </HeaderText>
      <FlexBox
        fg={ps('&:hover', 'blue')}
        mgt={{ M: 2 }}
      >
        <TitleText
          as='a'
          href={project.fields.url}
          target='_blank'
          rel='noopener noreferrer'
          variant='header'
        >
          link
          <Box
            display='inline-block'
            width={{ all: pxToRem(75), M: pxToRem(42) }}
            height={{ all: pxToRem(75), M: pxToRem(42) }}
            transform={{
              all: `translateY(-${pxToRem(8)})`,
              M: `translateY(-${pxToRem(6)})`
            }}
            mgl={2}
          >
            <ArrowTopRight />
          </Box>
        </TitleText>
        <Box mgl={6} hideOn='M'>
          <TitleText
            as='a'
            href={project.fields.url}
            target='_blank'
            rel='noopener noreferrer'
            variant='linkName'
          >
            {project.fields.urlName}
          </TitleText>
          {project.fields.secondUrl && (
            <Box>
              <TitleText
                as='a'
                href={project.fields.secondUrl}
                target='_blank'
                rel='noopener noreferrer'
                variant='linkName'
              >
                {project.fields.secondUrlName}
              </TitleText>
            </Box>
          )}
        </Box>
      </FlexBox>
    </FlexGrid.Item>
  )
  const works = (
    <FlexGrid.Item col={{ all: 6, M: 12 }} fg='white' mgt={{ M: 2 }}>
      <Link href='/#digital-design' scroll={false}>
        <Box as='a' display='inline-block' cursor='pointer'>
          <TitleText variant='header' fg={ps('&:hover', 'green')}>
            <Box
              display='inline-block'
              width={{ all: pxToRem(100), M: pxToRem(55) }}
              height={{ all: pxToRem(75), M: pxToRem(50) }}
              transform={`translateY(-${pxToRem(8)})`}
              mgl={{ all: 2, M: 0 }}
              mgr={2}
            >
              <ArrowCenterLeft />
            </Box>
            works
          </TitleText>
        </Box>
      </Link>
    </FlexGrid.Item>
  )
  const columns = [ title, works ]
  const headerRows = project.fields.header || []
  return (
    <Box ref={elementRef}>
      <Text as={Header} fg='lightGrey' variant='body' hideOn='M'>
        {headerRows.map((row, rowIndex) => (
          <FlexGrid key={rowIndex} width='100%' {...row.fields.props}>
            {columns[rowIndex] || null}
            {row.fields.columns.map((column, columnIndex) => (
              <FlexGrid.Item
                key={columnIndex}
                col={column.fields.width}
                offset={column.fields.offset ? column.fields.offset : 0}
                {...column.fields.props}
              >
                <StyledText
                  as={Markdown}
                  linkTarget='_blank'
                  linkHoverFg='white'
                >
                  {column.fields.items.fields.text}
                </StyledText>
              </FlexGrid.Item>
            ))}
          </FlexGrid>
        ))}
      </Text>
      <Text
        as={Header}
        fg='lightGrey'
        variant='projectHeader'
        display={{ all: 'none', M: 'block' }}
      >
        {title}
        {works}
        {headerRows.map((row, rowIndex) =>
          row.fields.columns.map((column, columnIndex) => (
            <Box key={`${rowIndex}-${columnIndex}`} mgt={7}>
              <StyledText
                as={Markdown}
                linkTarget='_blank'
                textStyle='projectHeader'
                iconWidthM={pxToRem(12)}
                iconHeightM={pxToRem(10)}
              >
                {column.fields.items.fields.text}
              </StyledText>
            </Box>
          ))
        )}
      </Text>
    </Box>
  )
}

export default ProjectHeader
