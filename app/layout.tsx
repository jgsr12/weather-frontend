import React from 'react';
import './globals.css'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'

export const metadata = { title: 'Weather Pulpo', description: 'Consulta de clima con estilo' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-grow p-6">{children}</main>
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}