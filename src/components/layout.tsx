import React from 'react'
import Footer from './footer';
import Navigation from './navigation';
import { WindowLocation } from "@reach/router"

interface LayoutProps {
    children?: React.ReactNode
    bg_color?: string;
    main_style?: React.CSSProperties
}

const Layout = ({ children, bg_color = '#CFE4FF', main_style} : LayoutProps) => {
  return (
    <>
    <Navigation/>
    <main style={{backgroundColor: bg_color, ...main_style}}>{children}</main>
    <Footer/>
    </>
  )
}

export default Layout