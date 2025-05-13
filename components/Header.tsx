'use client'
import React, { useState, useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'
import ProfileModal from './ProfileModal'
import FavoritesModal from './FavoritesModal'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const [view, setView] = useState<'login' | 'register' | 'profile' | 'favorites' | null>(null)

  return (
    <>
      <header className="w-full py-4 shadow-md bg-white/70 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">🌦️ Weather Pulpo</h1>
          <div className="space-x-4 flex items-center">
            {user ? (
              <>
                <span className="font-medium">{user.firstName} {user.lastName}</span>
                <button onClick={() => setView('profile')} className="text-blue-600">Perfil</button>
                <button onClick={() => setView('favorites')} className="text-blue-600">Favoritos</button>
                <button onClick={logout} className="text-red-600">Cerrar sesión</button>
              </>
            ) : (
              <>            
                <button onClick={() => setView('login')} className="text-blue-600">Iniciar</button>
                <button onClick={() => setView('register')} className="text-blue-600">Registro</button>
              </>
            )}
          </div>
        </div>
      </header>
      {/* Modals */}
      {view === 'login' && <AuthModal mode="login" onClose={() => setView(null)} />}
      {view === 'register' && <AuthModal mode="register" onClose={() => setView(null)} />}
      {view === 'profile' && <ProfileModal onClose={() => setView(null)} />}
      {view === 'favorites' && <FavoritesModal onClose={() => setView(null)} />}
    </>
  )
}