import { createTheme } from 'pss'

const theme = createTheme({
  media: {
    M: '(max-width: 600px)'
  },
  space: {
    default: [ 0, 8, 16, 32, 64, 128 ],
    M: [ 0, 4, 8, 16, 32, 64 ]
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
  textStyle: {
    sporting: {
      fontWeight: 'normal',
      fontFamily: 'Sporting-Grotesque'
    },
    sportingBold: {
      fontWeight: 'bold',
      fontFamily: 'Sporting-Grotesque'
    },
    gaia: {
      fontWeight: 'normal',
      fontFamily: 'Gaia-Serif'
    }
  }
})

export default theme
