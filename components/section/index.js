import { Box, FlexBox } from 'pss-components'
import React from 'react'

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
      minHeight: pxToRem(880),
      as: 'footer',
      pdb: 6
    }
    case 'about': return {
      component: About,
      minHeight: pxToRem(800),
      pdt: 2
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
  descriptionAlt
}) => {
  const {
    component: SectionContent,
    ...rest
  } = getSectionProps(type)
  return (
    <PaletteProvider name={palette}>
      <FlexBox
        id={hash}
        flexDirection='column'
        pdy={12}
        pdx={6}
        as='section'
        minHeight={pxToRem(1190)}
        position='relative'
        tm
        {...rest}
      >
        <SectionHeader
          title={title}
          headerColumns={headerColumns}
          palette={palette}
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
