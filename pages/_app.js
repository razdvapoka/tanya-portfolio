import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import { THEME } from '../constants'
import { Global, css } from '@emotion/core'
import defaults from 'defaults.css'

const globalStyles = css`
  html, body, #__next {
    height: 100%;
  }

  html {
    background-color: ${THEME.color.white};
  }

  :root {
    ${THEME.textStyle.root}
  }

  @media ${THEME.media.M} {
    :root {
      ${THEME.textStyle.rootMobile}
    }
  }

  @font-face {
    font-family: 'Suisse';
    font-style: 'normal';
    font-weight: 'normal';
    src:
      url(/static/fonts/SuisseIntl-Book.woff),
      url(/static/fonts/SuisseIntl-Book.woff2);
  }
`

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={THEME}>
        <Container>
          <Head>
            <title>Tanya</title>
            <link rel='icon' href='/static/favicon.ico' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <style dangerouslySetInnerHTML={{ __html: defaults }} />
          </Head>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    )
  }
}
