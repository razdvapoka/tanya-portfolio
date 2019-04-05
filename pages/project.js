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
    console.log(isHeaderVisible)
    this.setState({ isHeaderVisible })
  }

  render () {
    const { project, footer, palette = 'dark' } = this.props
    const { isHeaderVisible } = this.state
    const isSecondaryHeaderVisible = !isHeaderVisible
    const contentRows = project.fields.content || []
    return (
      <Box
        pdx={4}
        pdt={5}
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
              projectName={project.fields.title}
              nextProjectId={project.fields.nextProjectId}
              {...transitionStyles[state]}
            />
          )}
        </Transition>
        <Text as='main' fg='lightGrey' variant='large' mgt={45}>
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
        <Section as='footer' mgt={40} pdb={10} {...footer.fields} />
      </Box>
    )
  }
}

export default Project
