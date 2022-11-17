import React from 'react'

interface LayoutProps {
    pageTitle: string;
    children?: React.ReactNode
}

const Layout = ({ pageTitle, children } : LayoutProps) => {
  return (
    <>
    
    <main>{children}</main>
    </>
  )
}

export default Layout