import FontFaceObserver from 'fontfaceobserver'
import { compose, withState, lifecycle } from 'recompose'

export default (fonts) => compose(
  withState('fontsLoaded', 'setFontsLoaded', false),
  withState('fontsLoadingEror', 'setFontsLoadingError', null),
  lifecycle({
    componentDidMount () {
      const { setFontsLoaded, setFontsLoadingError } = this.props
      Promise.all(
        fonts.map(({
          family,
          options = {}
        }) => (new FontFaceObserver(
          family,
          options
        )).load()))
        .then(() => setFontsLoaded(true))
        .catch(setFontsLoadingError)
    }
  })
)
