export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
      <link
        rel="preload"
        href="/fonts/Druk_Wide_Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key="drukFont"
      />,
    ])
  }