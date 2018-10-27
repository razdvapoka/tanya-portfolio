import React from 'react'
import { wrapDisplayName } from 'recompose'
import isPropValid from '../utils/is-prop-valid'

const filterObj = (fn, tagName, props) => {
  if (tagName == null) return props

  const target = {}

  for (const key in props) {
    if (fn(key, tagName)) {
      target[key] = props[key]
    }
  }

  return target
}

const createBaseComponent = (defaultComp = 'div', filterOptions = {}) => {
  const filterFn = isPropValid(filterOptions)

  function BaseComponent (props, ref) {
    const { comp, component, as, filterPropsTagName, ...rest } = props
    const Comp = component || as || defaultComp
    const tagName = typeof Comp === 'string' ? Comp : filterPropsTagName

    return (
      <Comp ref={ref} {...filterObj(filterFn, tagName, rest)} />
    )
  }

  return Object.assign(React.forwardRef(BaseComponent), {
    displayName: wrapDisplayName(defaultComp, 'Base')
  })
}

const Base = createBaseComponent('div')

export {
  Base,
  isPropValid,
  createBaseComponent
}

export default Base
