import { FlexGrid, FlexBox, Text } from 'pss-components'
import Link from 'next/link'
import React from 'react'
import styled from '@emotion/styled'

const HeaderBox = styled(FlexGrid)(({ isVisible }) => ({
  pointerEvents: isVisible ? 'auto' : 'none',
  '& a': {
    transition: 'color 0.5s ease-out'
  },
  '& a:hover': {
    color: 'white'
  }
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
    pdx={{ all: 6, M: 2 }}
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
    <FlexGrid.Item col={6}>
      <Link href='/#digital-design'>
        <a>
          Back to works
        </a>
      </Link>
    </FlexGrid.Item>
    <FlexGrid.Item col={6}>
      <FlexBox
        justifyContent={{
          all: 'space-between',
          M: 'flex-end'
        }}
      >
        <FlexBox.Item hideOn='M'>
          <Text>
            {projectName}
          </Text>
        </FlexBox.Item>
        {nextProjectId && (
          <FlexBox.Item>
            <Link href={`/project/${nextProjectId}`}>
              <a>
                Next project
              </a>
            </Link>
          </FlexBox.Item>
        )}
      </FlexBox>
    </FlexGrid.Item>
  </Text>
)

export default SecondaryHeader
