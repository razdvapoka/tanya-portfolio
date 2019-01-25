export const CANONIC_SCREEN_WIDTH = 1440
export const ROOT_FONT_SIZE = 18

export const pxToRem = px => `${(px / ROOT_FONT_SIZE)}rem`
export const remToInt = rem => parseFloat(rem.replace('rem', ''))
export const remToPx = rem => {
  console.log(rem, remToInt(rem), ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH, window.innerWidth)
  return typeof window !== 'undefined' ? (
    remToInt(rem) *
    (ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH) *
    window.innerWidth
  ) : 0
}
const sequence = (length, step, initial = 0) =>
  [ ...Array(length) ].map((_, i) => initial + i * step)

export const THEME = {
  media: {
    M: '(max-width: 600px)'
  },
  space: {
    all: sequence(30, 6).map(pxToRem)
  },
  size: {
    site: '1440px',
    headerHeight: pxToRem(50),
    marqueeHeight: pxToRem(64)
  },
  color: {
    black: '#1e1e1e',
    white: '#ffffff',
    blue: '#182AEE',
    grey: '#898989'
  },
  palette: {
    default: {
      bg: '#182AEE',
      fg: '#ffffff'
    },
    inverted: {
      bg: '#ffffff',
      fg: '#182AEE'
    },
    dark: {
      bg: '#000',
      fg: '#fff'
    },
    light: {
      bg: '#fff',
      fg: '#000'
    },
    yellow: {
      bg: '#FFFF00',
      fg: '#000'
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
      fontFamily: 'Helvetica',
      fontSize: `${ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH * 100}vw`
    },
    header: {
      fontWeight: 'normal',
      fontFamily: 'Adieu',
      fontSize: pxToRem(60),
      lineHeight: 1,
      letterSpacing: -0.6,
      textTransform: 'uppercase'
    },
    intro: {
      fontWeight: 'normal',
      fontFamily: 'Adieu',
      fontSize: pxToRem(100),
      lineHeight: 1,
      letterSpacing: -1,
      textTransform: 'uppercase'
    },
    body: {
      fontWeight: 'normal',
      fontFamily: 'Helvetica Neue, Helvetica',
      fontSize: pxToRem(32),
      lineHeight: 38 / 32,
      letterSpacing: 0.53
    },
    caption: {
      fontWeight: 'normal',
      fontFamily: 'Helvetica Neue, Helvetica',
      fontSize: pxToRem(20),
      lineHeight: 23 / 20
    },
    menuItem: {
      fontWeight: 'normal',
      fontFamily: 'Helvetica Neue, Helvetica',
      fontSize: pxToRem(20),
      lineHeight: 14 / 20
    }
  }
}
