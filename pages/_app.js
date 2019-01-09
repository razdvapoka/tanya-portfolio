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

  @font-face {
    font-family: 'Sporting-Grotesque';
    font-style: 'normal';
    font-weight: 'normal';
    src:
      url(/static/fonts/sporting-grotesque-regular.woff),
      url(/static/fonts/sporting-grotesque-regular.woff2);
  }

  @font-face {
    font-family: 'Sporting-Grotesque-Bold';
    font-style: 'normal';
    font-weight: 'normal';
    src:
      url(/static/fonts/sporting-grotesque-bold.woff),
      url(/static/fonts/sporting-grotesque-bold.woff2);
  }

  @font-face {
    font-family: 'Gaia-Serif';
    font-style: 'normal';
    font-weight: 'normal';
    src:
      url(/static/fonts/gaia-serif-regular.woff),
      url(/static/fonts/gaia-serif-regular.woff2);
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
            <style dangerouslySetInnerHTML={{ __html: defaults }} />
          </Head>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    )
  }
}
