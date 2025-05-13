'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'sonner'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
}

interface AuthContextType {
  user: User | null
  favorites: string[]
  login: (email: string, pass: string) => Promise<void>
  register: (email: string, pass: string, firstName: string, lastName: string) => Promise<void>
  logout: () => Promise<void>
  toggleFavorite: (city: string) => Promise<void>
  updateProfile: (firstName: string, lastName: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as any)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const api = process.env.NEXT_PUBLIC_API_URL

  const fetchMe = async () => {
    try {
      const res = await fetch(`${api}/auth/me`, { credentials: 'include' })
      if (res.ok) {
        const u: User = await res.json()
        setUser(u)
        const favRes = await fetch(`${api}/favorites`, { credentials: 'include' })
        if (favRes.ok) {
          const favData: Array<{ id: number; city: string }> = await favRes.json()
          setFavorites(favData.map(f => f.city))
        }
      }
    } catch {
      // no session
    }
  }

  useEffect(() => { fetchMe() }, [])

  const login = async (email: string, pass: string) => {
    const res = await fetch(`${api}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password: pass }),
    })
    if (!res.ok) throw new Error((await res.json()).message)
    await fetchMe()
    toast.success('Sesión iniciada')
  }

  const register = async (email: string, pass: string, firstName: string, lastName: string) => {
    const res = await fetch(`${api}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password: pass }),
    })
    if (!res.ok) throw new Error((await res.json()).message)
    toast.success('Registrado con éxito, ahora inicia sesión')
  }

  const logout = async () => {
    await fetch(`${api}/auth/logout`, { method: 'POST', credentials: 'include' })
    setUser(null)
    setFavorites([])
    toast.success('Cerraste sesión')
  }

  const toggleFavorite = async (city: string) => {
    if (!user) throw new Error('Debes iniciar sesión')
    const exists = favorites.includes(city)
    const method = exists ? 'DELETE' : 'POST'
    const url = exists
      ? `${api}/favorites/${encodeURIComponent(city)}`
      : `${api}/favorites`
    const options = exists
      ? { method, credentials: 'include' as const }
      : {
          method,
          credentials: 'include' as const,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city }),
        }

    const res = await fetch(url, options)
    if (!res.ok) throw new Error((await res.json()).message)
    setFavorites(prev => (exists ? prev.filter(c => c !== city) : [...prev, city]))
    toast.success(exists ? 'Favorito eliminado' : 'Favorito agregado')
  }

  const updateProfile = async (firstName: string, lastName: string) => {
    const res = await fetch(`${api}/auth/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName }),
    })
    if (!res.ok) throw new Error((await res.json()).message)
    setUser(prev => (prev ? { ...prev, firstName, lastName } : prev))
    toast.success('Perfil actualizado')
  }

  return (
    <AuthContext.Provider value={{ user, favorites, login, register, logout, toggleFavorite, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
