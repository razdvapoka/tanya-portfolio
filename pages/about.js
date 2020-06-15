import { Box } from "pss-components";
import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import { Header, Section } from "../components";
import { getPage } from "../content-api.js";

class About extends React.Component {
  static async getInitialProps() {
    const about = await getPage("about");
    return { about };
  }

  render() {
    const { about } = this.props;
    return (
      <Box postion="relative" mgt={1}>
        <Box pdx={6}>
          <Header isHome={false} />
        </Box>
        <main>
          {about.fields.items.map(({ sys: { id }, fields }) => (
            <Section key={id} sections={about.fields.items} {...fields} />
          ))}
        </main>
      </Box>
    );
  }
}

export default About;
