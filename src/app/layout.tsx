'use client'

import './globals.css'
import React from 'react'
// import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { AuthProvider } from '@/hooks/authProvider'

const poppins = Poppins({ subsets: ['latin-ext'], weight: ['300', '400', '500', '600', '700'] })

// export const metadata: Metadata = {
//   title: 'EDP SIG',
//   description: 'Sistema Integrado de Gestão da EDP',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <AuthProvider>
        <body className={poppins.className}>{children}</body>
      </AuthProvider>
    </html>
  )
}
