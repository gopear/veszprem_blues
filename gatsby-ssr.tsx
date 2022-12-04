import * as React from "react"
import type { GatsbySSR } from "gatsby"

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
    setHeadComponents([
      <link
        rel="preload"
        href="/fonts/Druk_Wide_Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key="drukWideBold"
      />,
      <link
        rel="preload"
        href="/fonts/DrukText-Medium.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key="drukTextMedium"
      />
    ])
  }