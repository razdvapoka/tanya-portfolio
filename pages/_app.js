import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "emotion-theming";
import { THEME } from "../constants";
import { Global, css } from "@emotion/core";
import defaults from "defaults.css";

const globalStyles = css`
  html,
  body,
  #__next {
    height: 100%;
  }

  html {
    background-color: ${THEME.color.white};
  }

  :root {
    ${THEME.textStyle.root.all}
  }

  @media ${THEME.media.M} {
    :root {
      ${THEME.textStyle.root.M}
    }
  }

  @font-face {
    font-family: "Suisse";
    font-style: "normal";
    font-weight: "normal";
    src: url(/fonts/SuisseIntl-Book.woff), url(/fonts/SuisseIntl-Book.woff2);
  }
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={THEME}>
        <Head>
          <title>Tanya Ermolaeva</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Tanya Ermolaeva — designer and art director" />
          <meta
            property="og:description"
            content="I like working with virtual spaces — everything that deals with screens, time and interaction. I collaborate with clients from cultural institutions, fashion, art, music, and education."
          />
          <meta property="og:url" content="https://ermolaeva.co" />
          <meta property="og:image" content="/images/meta.png" />
          <style dangerouslySetInnerHTML={{ __html: defaults }} />
        </Head>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
