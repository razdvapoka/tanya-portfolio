import { Box, FlexGrid, Text } from 'pss-components'
import { ps } from 'pss'
import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import styled from '@emotion/styled'
import Transition from 'react-transition-group/Transition'

import { Section } from '../components'
import ProjectHeader from '../components/project/header'
import ProjectSecondaryHeader from '../components/project/secondary-header'
import ProjectItem from '../components/project/item'

const { publicRuntimeConfig } = getConfig()

const Column = styled(FlexGrid.Item)(({ bgImage }) => bgImage && ({
  backgroundImage: `url(${bgImage.fields.file.url})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}))

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

class Project extends React.Component {
  static async getInitialProps (props) {
    const projectId = props.query.id
    const [ projectResponse, footerResponse ] = await Promise.all([
      fetch(publicRuntimeConfig.siteUrl + '/api/project/' + projectId),
      fetch(publicRuntimeConfig.siteUrl + '/api/section/footer')
    ])

    const [ project, footer ] = await Promise.all([
      projectResponse.json(),
      footerResponse.json()
    ])

    return { project, footer }
  }

  state = {
    isHeaderVisible: true
  }

  setIsHeaderVisible = (isHeaderVisible) => {
    this.setState({ isHeaderVisible })
  }

  render () {
    const { project, footer, palette = 'dark' } = this.props
    const { isHeaderVisible } = this.state
    const isSecondaryHeaderVisible = !isHeaderVisible
    const contentRows = project.fields.content || []
    return (
      <Box
        pdx={{ all: 4, M: 2 }}
        pdt={{ all: 5, M: 2 }}
        tm={palette}
        minHeight='100vh'
      >
        <ProjectHeader
          project={project}
          palette={palette}
          setIsHeaderVisible={this.setIsHeaderVisible}
        />
        <Transition in={isSecondaryHeaderVisible} timeout={300} mountOnEnter>
          {state => (
            <ProjectSecondaryHeader
              isVisible={isSecondaryHeaderVisible}
              projectName={project.fields.name}
              nextProjectId={project.fields.nextProjectId}
              {...transitionStyles[state]}
            />
          )}
        </Transition>
        <Text
          as='main'
          fg='lightGrey'
          variant='large'
          mgt={{ all: 45, M: 20 }}
          pdx={{ M: 0 }}
          mgx={{ M: -2 }}
        >
          {contentRows.map((row, rowIndex) => {
            const { mgt, ...rest } = row.fields.props || {}
            return (
              <Box
                key={rowIndex}
                mgt={{
                  all: ps('&:not(:first-child)', mgt || 40),
                  M: ps('&:not(:first-child)', 20)
                }}
                {...rest}
              >
                <FlexGrid space={{ all: 4, M: 0 }} flexWrap={{ M: 'wrap' }}>
                  {row.fields.columns.map((column, columnIndex) => {
                    const {
                      pdx: colPdx = 0,
                      pdy: colPdy = 0,
                      ...colRest
                    } = column.fields.props || {}
                    return (
                      <Column
                        key={columnIndex}
                        col={{ all: column.fields.width, M: 12 }}
                        offset={{ all: column.fields.offset ? column.fields.offset : 0, M: 0 }}
                        bgImage={column.fields.bgImage}
                        {...colRest}
                        pdx={{ all: colPdx, M: 2 }}
                        pdy={{ all: colPdy, M: 2 }}
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
        <Section as='footer' mgt={{ all: 40, M: 20 }} pdb={10} {...footer.fields} />
      </Box>
    )
  }
}

export default Project
