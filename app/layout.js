import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-heading', weight: ['600', '700', '800'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata = {
  title: 'KW Partners | Keller Williams Realty',
  description: 'Keller Williams Realty Partners — Woodstock & Canton, GA. Home to the dreamers, the doers, and the entrepreneurs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable}`}>{children}</body>
    </html>
  )
}
