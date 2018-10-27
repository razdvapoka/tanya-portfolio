import memoize from 'fast-memoize'
import reactHTMLAttributes from 'react-html-attributes'

const REACT_PROPS = [
  'children',
  'dangerouslySetInnerHTML',
  'key',
  'ref',
  'autoFocus',
  'defaultValue',
  'defaultChecked',
  'innerHTML',
  'suppressContentEditableWarning'
]

const SVG_PROPS = [
  'xmlns',
  'width',
  'height',
  'viewBox',
  'preserveAspectRatio'
]

const REACT_PROPS_REGEXP = new RegExp(
  `^((${REACT_PROPS.join('|')})|(on[A-Z].*)|((data|aria)-.*))$`
)

const isReactProp = (propName) => REACT_PROPS_REGEXP.test(propName)
const isHtmlProp = (propName, tagName) => (
  reactHTMLAttributes['*'].includes(propName) || (
    tagName === 'svg'
      ? SVG_PROPS.includes(propName)
      : (reactHTMLAttributes[tagName] || []).includes(propName)
  )
)

function isPropValid ({ whitelist = [], blacklist = [], defaultTagName } = {}) {
  const checkFn = (propName, tagName) => (
    (whitelist.includes(propName) && !blacklist.includes(propName)) ||
    isReactProp(propName) ||
    isHtmlProp(propName, (tagName || defaultTagName))
  )

  return memoize(checkFn)
}

export default isPropValid
