import React from 'react'
import Footer from './footer';
import Navigation from './navigation';
import { WindowLocation } from "@reach/router"

interface LayoutProps {
    children?: React.ReactNode
}

const Layout = ({ children } : LayoutProps) => {
  return (
    <>
    <Navigation/>
    <main>{children}</main>
    <Footer/>
    </>
  )
}

export default Layout