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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the saved (or system) theme before first paint so there's no flash. */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}` }} />
      </head>
      <body className={`${montserrat.variable} ${inter.variable}`}>{children}</body>
    </html>
  )
}
