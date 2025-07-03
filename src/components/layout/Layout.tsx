import type { ReactNode } from 'react'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
} 