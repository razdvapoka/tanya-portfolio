import { FlexGrid, FlexBox, Text } from 'pss-components'
import Link from 'next/link'
import React from 'react'
import styled from '@emotion/styled'

const HeaderBox = styled(FlexGrid)(({ isVisible }) => ({
  pointerEvents: isVisible ? 'auto' : 'none'
}))

const SecondaryHeader = ({
  projectName,
  nextProjectId,
  isVisible,
  ...rest
}) => (
  <Text
    as={HeaderBox}
    variant='body'
    position='fixed' top left
    width height='headerHeight'
    pdx={6}
    mgx={0}
    alignItems='center'
    justifyContent='flex-end'
    tm='dark'
    zIndex={10}
    fg='secondary'
    transition='opacity 0.3s ease'
    isVisible={isVisible}
    spacex={0}
    {...rest}
  >
    <FlexGrid.Item col={6} fg='white'>
      <Link href='/#digital-design'>
        <a>
          Back to works
        </a>
      </Link>
    </FlexGrid.Item>
    <FlexGrid.Item col={6}>
      <FlexBox justifyContent='space-between'>
        <Text>
          {projectName}
        </Text>
        {nextProjectId && (
          <Link href={`/project/${nextProjectId}`}>
            <a>
              Next project
            </a>
          </Link>
        )}
      </FlexBox>
    </FlexGrid.Item>
  </Text>
)

export default SecondaryHeader
