import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import GetLayout from '@/components/getLayout'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Socialify',
  description: 'The NEXT Social Media Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <GetLayout>
          {children}
        </GetLayout>
        </body>
    </html>
  )
}
