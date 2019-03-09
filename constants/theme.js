export const CANONIC_SCREEN_WIDTH = 1440
export const ROOT_FONT_SIZE = 18
export const SPACE_STEP = 6

export const pxToRem = px => `${(px / ROOT_FONT_SIZE)}rem`
export const remToInt = rem => parseFloat(rem.replace('rem', ''))
export const remToPx = rem => typeof window !== 'undefined' ? (
  remToInt(rem) *
  (ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH) *
  window.innerWidth
) : 0

const sequence = (length, step, initial = 0) =>
  [ ...Array(length) ].map((_, i) => initial + i * step)

const COLOR_BLACK = '#000'
const COLOR_WHITE = '#fff'
const COLOR_BLUE = '#182aee'
const COLOR_GREY = '#898989'
const COLOR_LIGHT_GREY = '#c0c0c0'
const COLOR_RED = '#ff0000'
const COLOR_GREEN = '#55e1a4'
const COLOR_YELLOW = '#ffff00'

export const THEME = {
  media: {
    M: '(max-width: 600px)'
  },
  space: {
    all: sequence(100, SPACE_STEP).map(pxToRem)
  },
  size: {
    site: '1440px',
    headerHeight: pxToRem(50),
    marqueeHeight: pxToRem(64)
  },
  color: {
    black: COLOR_BLACK,
    white: COLOR_WHITE,
    blue: COLOR_BLUE,
    grey: COLOR_GREY,
    lightGrey: COLOR_LIGHT_GREY,
    red: COLOR_RED,
    green: COLOR_GREEN
  },
  palette: {
    default: {
      bg: COLOR_BLACK,
      fg: COLOR_WHITE,
      secondary: COLOR_LIGHT_GREY
    },
    inverted: {
      bg: COLOR_WHITE,
      fg: COLOR_BLACK,
      secondary: COLOR_LIGHT_GREY
    },
    dark: {
      bg: COLOR_BLACK,
      fg: COLOR_WHITE,
      secondary: COLOR_LIGHT_GREY
    },
    light: {
      bg: COLOR_WHITE,
      fg: COLOR_BLACK,
      secondary: COLOR_LIGHT_GREY
    },
    yellow: {
      bg: COLOR_YELLOW,
      fg: COLOR_BLACK,
      secondary: COLOR_LIGHT_GREY
    },
    green: {
      bg: COLOR_GREEN,
      fg: COLOR_BLACK,
      secondary: COLOR_BLACK
    },
    blue: {
      bg: COLOR_BLUE,
      fg: COLOR_BLACK,
      secondary: COLOR_BLACK
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
      fontFamily: 'Helvetica Neue, Helvetica',
      fontSize: `${ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH * 100}vw`
    },
    header: {
      fontWeight: 'normal',
      fontFamily: 'Suisse',
      fontSize: pxToRem(100),
      lineHeight: 84 / 100,
      textTransform: 'uppercase',
      letterSpacing: pxToRem(1.67)
    },
    intro: {
      fontWeight: 'normal',
      fontFamily: 'Suisse',
      fontSize: pxToRem(100),
      lineHeight: 1,
      textTransform: 'uppercase'
    },
    body: {
      fontWeight: 'normal',
      fontFamily: 'Suisse',
      fontSize: pxToRem(20),
      lineHeight: 28 / 20
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
