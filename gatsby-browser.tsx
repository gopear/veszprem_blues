import 'bootstrap/dist/css/bootstrap.min.css';
import { GatsbyBrowser } from 'gatsby';
import React, { useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import "./src/styles/global.css"

const Wrapper = ({ element } : { element : React.ReactElement<any, string | React.JSXElementConstructor<any>>}) => {
  useEffect(() => {
      
    const documentHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
     }
     
    window.addEventListener('resize',documentHeight)
    documentHeight()
  }, [])

  return (
    <SSRProvider>
      {element}
    </SSRProvider>
  )
}

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
    element,
  }) => {
    return <Wrapper element={element}/>
  }