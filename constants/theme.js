export const CANONIC_SCREEN_WIDTH = 1440
export const ROOT_FONT_SIZE = 18

export const pxToRem = px => `${(px / ROOT_FONT_SIZE)}rem`
export const remToInt = rem => parseInt(rem.replace('rem', ''))
export const remToPx = rem => typeof window !== 'undefined' ? (
  remToInt(rem) *
  (ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH) *
  window.innerWidth
) : 0

export const THEME = {
  media: {
    M: '(max-width: 600px)'
  },
  space: {
    default: [ 0, 8, 16, 32, 64, 128 ].map(pxToRem),
    M: [ 0, 4, 8, 16, 32, 64 ].map(pxToRem)
  },
  size: {
    site: '1440px'
  },
  color: {
    black: '#191919',
    white: '#ffffff',
    blue: '#182AEE'
  },
  palette: {
    default: {
      bg: '#182AEE',
      fg: '#ffffff'
    },
    inverted: {
      bg: '#ffffff',
      fg: '#182AEE'
    }
  },
  textStyleFlag: {
    caps: {
      textTransform: 'uppercase'
    }
  },
  textStyle: {
    root: {
      fontWeight: 'normal',
      fontFamily: 'Gaia-Serif',
      fontSize: `${ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH * 100}vw`
    },
    sporting: {
      fontWeight: 'normal',
      fontFamily: 'Sporting-Grotesque',
      fontSize: pxToRem(100),
      lineHeight: 1,
      letterSpacing: 1.25,
      textTransform: 'uppercase'
    },
    sportingBold: {
      fontFamily: 'Sporting-Grotesque-Bold',
      fontSize: pxToRem(100),
      lineHeight: 1,
      letterSpacing: 1.25,
      textTransform: 'uppercase'
    },
    gaia: {
      fontWeight: 'normal',
      fontFamily: 'Gaia-Serif'
    }
  }
}
