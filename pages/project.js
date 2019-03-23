import { Box, FlexGrid, Text } from 'pss-components'
import { ps } from 'pss'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import styled from '@emotion/styled'

import ProjectHeader from '../components/project/header'
import ProjectItem from '../components/project/item'

const { publicRuntimeConfig } = getConfig()

const Column = styled(FlexGrid.Item)(({ bgImage }) => bgImage && ({
  backgroundImage: `url(${bgImage.fields.file.url})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}))

class Project extends React.Component {
  static async getInitialProps (props) {
    const projectId = props.query.id
    const res = await fetch(publicRuntimeConfig.siteUrl + '/api/project/' + projectId)
    const project = await res.json()
    return { project }
  }

  render () {
    const { project, palette = 'dark' } = this.props
    const contentRows = project.fields.content
    return (
      <Box
        pdx={4}
        pdt={5} pdb={40}
        tm={palette}
        minHeight='100vh'
      >
        <ProjectHeader project={project} palette={palette} />
        <Text as='main' fg='lightGrey' variant='large' mgt={15}>
          {contentRows.map((row, rowIndex) => {
            return (
              <Box key={rowIndex} mgt={ps('&:not(:first-child)', 40)} {...row.fields.props}>
                <FlexGrid space={4} {...row.fields.props}>
                  {row.fields.columns.map((column, columnIndex) => {
                    return (
                      <Column
                        key={columnIndex}
                        col={column.fields.width}
                        offset={column.fields.offset ? column.fields.offset : 0}
                        bgImage={column.fields.bgImage}
                        {...column.fields.props}
                      >
                        <ProjectItem
                          {...column.fields.items.fields}
                          palette={palette}
                        />
                      </Column>
                    )
                  })}
                </FlexGrid>
              </Box>
            )
          })}
        </Text>
      </Box>
    )
  }
}

export default Project
