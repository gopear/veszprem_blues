import React from 'react'
import Footer from './footer';
import Navigation from './navigation';
import { WindowLocation } from "@reach/router"

interface LayoutProps {
    children?: React.ReactNode
    location: WindowLocation
}

const Layout = ({ children, location } : LayoutProps) => {
  return (
    <>
    <Navigation location={location}/>
    <main>{children}</main>
    <Footer/>
    </>
  )
}

export default Layout