import { Box, FlexBox, FlexGrid, Text } from 'pss-components'
import { cs, ps } from 'pss'
import Link from 'next/link'
import React from 'react'
import styled from '@emotion/styled'

import { pxToRem } from '../../constants'
import ArrowCenterLeft from '../arrow-center-left'
import ArrowTopRight from '../arrow-top-right'
import ProjectItem from './item'

const TitleText = styled(Text)({
  transition: 'color 0.1s ease'
})

const ProjectHeader = ({
  project,
  palette
}) => {
  const title = (
    <FlexGrid.Item col={6} fg='white'>
      <Text variant='header'>
        {project.fields.title}
      </Text>
      <FlexBox
        fg={ps('&:hover', 'blue')}
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
            width={pxToRem(75)}
            height={pxToRem(75)}
            transform={`translateY(-${pxToRem(8)})`}
            mgl={2}
          >
            <ArrowTopRight />
          </Box>
        </TitleText>
        <Box mgl={6}>
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
    <FlexGrid.Item col={6} fg='white'>
      <Link href='/' scroll={false}>
        <Box as='a' display='inline-block' cursor='pointer'>
          <TitleText variant='header' fg={ps('&:hover', 'green')}>
            <Box
              display='inline-block'
              width={pxToRem(100)}
              height={pxToRem(75)}
              transform={`translateY(-${pxToRem(8)})`}
              mgl={2}
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
    <Text as='header' fg='lightGrey' variant='body'>
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
              <ProjectItem {...column.fields.items.fields} palette={palette} />
            </FlexGrid.Item>
          ))}
        </FlexGrid>
      ))}
    </Text>
  )
}

export default ProjectHeader
