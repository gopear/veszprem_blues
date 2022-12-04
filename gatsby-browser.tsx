import 'bootstrap/dist/css/bootstrap.min.css';
import { GatsbyBrowser } from 'gatsby';
import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import "./src/styles/global.css"

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
    element,
  }) => {
    return (
      <SSRProvider>
        {element}
      </SSRProvider>
    )
  }