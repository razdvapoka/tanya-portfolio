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
    font-family: 'Adieu';
    font-style: 'normal';
    font-weight: 'normal';
    src:
      url(/static/fonts/adieu-regular.woff),
      url(/static/fonts/adieu-regular.woff2);
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
