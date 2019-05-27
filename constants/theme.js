export const MOBILE_BP = 600
export const CANONIC_SCREEN_WIDTH = 1440
export const CANONIC_SCREEN_WIDTH_M = 375
export const ROOT_FONT_SIZE = 18
export const SPACE_STEP = 6

export const pxToRem = px => `${(px / ROOT_FONT_SIZE)}rem`
export const remToInt = rem => parseFloat(rem.replace('rem', ''))
export const remToPx = rem => typeof window !== 'undefined' ? (
  remToInt(rem) *
  (ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH) *
  window.innerWidth
) : 0

export const isMobile = () => typeof window !== 'undefined'
  ? window.innerWidth < MOBILE_BP
  : false

export const sequence = (length, step = 1, initial = 0) =>
  [ ...Array(length) ].map((_, i) => initial + i * step)

const COLOR_BLACK = '#000'
const COLOR_WHITE = '#fff'
const COLOR_BLUE = '#182aee'
const COLOR_GREY = '#898989'
const COLOR_LIGHT_GREY = '#c0c0c0'
const COLOR_RED = '#ff0000'
const COLOR_GREEN = '#55e1a4'
const COLOR_YELLOW = '#ffff00'

const TEXT_INTRO_FIXED = {
  fontWeight: 'normal',
  fontFamily: 'Suisse',
  fontSize: 100,
  lineHeight: 1,
  textTransform: 'uppercase'
}

export const THEME = {
  media: {
    D: `(min-width: ${MOBILE_BP}px)`,
    M: `(max-width: ${MOBILE_BP}px)`
  },
  space: {
    all: sequence(100, SPACE_STEP).map(pxToRem)
  },
  size: {
    site: '1440px',
    headerHeight: pxToRem(35),
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
      secondary: COLOR_LIGHT_GREY,
      button: COLOR_GREEN
    },
    light: {
      bg: COLOR_WHITE,
      fg: COLOR_BLACK,
      secondary: COLOR_BLACK,
      button: COLOR_RED
    },
    yellow: {
      bg: COLOR_YELLOW,
      fg: COLOR_BLACK,
      secondary: COLOR_LIGHT_GREY
    },
    green: {
      bg: COLOR_GREEN,
      fg: COLOR_BLACK,
      secondary: COLOR_BLACK,
      button: COLOR_YELLOW
    },
    blue: {
      bg: COLOR_BLUE,
      fg: COLOR_BLACK,
      secondary: COLOR_BLACK
    }
  },
  textStyle: {
    root: {
      all: {
        fontWeight: 'normal',
        fontFamily: 'Helvetica Neue, Helvetica',
        fontSize: `${ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH * 100}vw`
      },
      M: {
        fontWeight: 'normal',
        fontFamily: 'Helvetica Neue, Helvetica',
        fontSize: `${ROOT_FONT_SIZE / CANONIC_SCREEN_WIDTH_M * 100}vw`
      }
    },
    header: {
      all: {
        fontWeight: 'normal',
        fontFamily: 'Suisse',
        fontSize: pxToRem(100),
        lineHeight: 84 / 100,
        textTransform: 'uppercase',
        letterSpacing: pxToRem(1.67)
      },
      M: {
        fontSize: pxToRem(61),
        lineHeight: 54 / 61,
        letterSpacing: pxToRem(1.02)
      }
    },
    introFixed: TEXT_INTRO_FIXED,
    intro: {
      ...TEXT_INTRO_FIXED,
      fontSize: pxToRem(TEXT_INTRO_FIXED.fontSize)
    },
    body: {
      all: {
        fontWeight: 'normal',
        fontFamily: 'Suisse',
        fontSize: pxToRem(20),
        lineHeight: 28 / 20
      },
      M: {
        fontSize: pxToRem(14),
        lineHeight: 20 / 14
      }
    },
    caption: {
      all: {
        fontWeight: 'normal',
        fontFamily: 'Helvetica Neue, Helvetica',
        fontSize: pxToRem(20),
        lineHeight: 23 / 20
      },
      M: {
        fontSize: pxToRem(14),
        lineHeight: 16 / 14,
        letterSpacing: pxToRem(0.3)
      }
    },
    menuItem: {
      fontWeight: 'normal',
      fontFamily: 'Helvetica Neue, Helvetica',
      fontSize: pxToRem(20),
      lineHeight: 14 / 20
    },
    sliderButton: {
      fontWeight: 'normal',
      fontFamily: 'Suisse',
      fontSize: pxToRem(30),
      lineHeight: 1
    },
    large: {
      all: {
        fontWeight: 'normal',
        fontFamily: 'Suisse',
        fontSize: pxToRem(35),
        lineHeight: 47 / 35
      },
      M: {
        fontSize: pxToRem(26),
        lineHeight: 33 / 26,
        letterSpacing: pxToRem(0.3)
      }
    },
    linkName: {
      fontWeight: 'normal',
      fontFamily: 'Suisse',
      fontSize: pxToRem(14),
      lineHeight: 28 / 14,
      textTransform: 'none',
      letterSpacing: 0,
      verticalAlign: 'top'
    },
    projectHeader: {
      fontWeight: 'normal',
      fontFamily: 'Suisse',
      fontSize: pxToRem(20),
      lineHeight: 26 / 20,
      letterSpacing: pxToRem(0.3)
    }
  }
}
