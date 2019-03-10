import { Text } from 'pss-components'
import React, { useMemo } from 'react'
import anime from 'animejs'
import { withRouter } from 'next/router'
import styled from '@emotion/styled'

import { SCROLL_VELOCITY } from '../constants'

const handleLinkClick = (hash, router, modifyUrl) => () => {
  const scrollTarget = document.querySelector(`#${hash}`)
  const { top } = scrollTarget.getBoundingClientRect()
  const duration = Math.abs(top, window.scrollY) / SCROLL_VELOCITY
  anime({
    targets: window.document.scrollingElement,
    scrollTop: top + window.scrollY,
    easing: 'linear',
    duration,
    complete: () => {
      if (modifyUrl) {
        router.push(`/#${hash}`)
      }
    }
  })
}

const LinkText = styled(Text)({
  cursor: 'pointer',
  display: 'inline'
})

const HashLink = withRouter(({
  router,
  hash,
  children,
  modifyUrl = true,
  ...rest
}) => {
  const handleClick = useMemo(
    () => handleLinkClick(hash, router, modifyUrl),
    [ hash ]
  )
  return (
    <LinkText
      onClick={handleClick}
      {...rest}
    >
      {children}
    </LinkText>
  )
})

export default HashLink
