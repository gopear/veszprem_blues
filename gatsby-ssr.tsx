import * as React from "react"
import type { GatsbySSR } from "gatsby"

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
    setHeadComponents([
      <link
        rel="preload"
        href="/fonts/Inter-roman.var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key="interFont"
      />,
    ])
  }