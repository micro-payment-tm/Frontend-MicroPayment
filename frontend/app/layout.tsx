import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'MUSD Payment System',
  description: 'Bitcoin-backed MUSD payment infrastructure',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
