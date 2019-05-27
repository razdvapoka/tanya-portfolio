import { Box, FlexBox } from 'pss-components'
import React from 'react'

import { ContentText } from '../styled-text'
import { PaletteProvider } from '..'
import { pxToRem } from '../../constants'
import About from '../about'
import Footer from '../footer'
import Gallery from '../gallery'
import SectionHeader from './header'
import Slider from '../slider'

const getSectionProps = (sectionType) => {
  switch (sectionType) {
    case 'gallery': return {
      component: Gallery,
      pdb: 40
    }
    case 'slider': return { component: Slider }
    case 'footer': return {
      component: Footer,
      textComponent: ContentText,
      minHeight: { all: pxToRem(880), M: pxToRem(435) },
      as: 'footer',
      pdb: 6
    }
    case 'about': return {
      component: About,
      minHeight: pxToRem(800),
      headerProps: {
        mgb: { all: 2, M: 0 }
      },
      pdt: { all: 2, M: 0 },
      pdx: { all: 6 }
    }
    default: return { component: Box }
  }
}

const Section = ({
  hash,
  title,
  headerColumns,
  items,
  palette,
  type,
  bottom,
  sections,
  description,
  descriptionAlt,
  ...sectionRest
}) => {
  const {
    component: SectionContent,
    textComponent,
    headerProps,
    ...rest
  } = getSectionProps(type)
  return (
    <PaletteProvider name={palette}>
      <FlexBox
        id={hash}
        flexDirection='column'
        pdy={{ all: 12, M: 7 }}
        pdx={{ all: 6, M: 2 }}
        as='section'
        minHeight={{ all: pxToRem(1190), M: pxToRem(600) }}
        position='relative'
        tm
        {...sectionRest}
        {...rest}
      >
        <SectionHeader
          title={title}
          headerColumns={headerColumns}
          palette={palette}
          textComponent={textComponent}
          {...headerProps}
        />
        <SectionContent
          items={items}
          sections={sections}
          description={description}
          descriptionAlt={descriptionAlt}
          palette={palette}
        />
      </FlexBox>
    </PaletteProvider>
  )
}

export default Section
