'use client'
import React, { useState, useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

export default function AuthModal({
  mode,
  onClose,
}: {
  mode: 'login' | 'register'
  onClose: () => void
}) {
  const { login, register } = useContext(AuthContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, pass)
      } else {
        await register(email, pass, firstName, lastName)
      }
      onClose()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h3 className="text-lg font-semibold mb-4 text-center">
          {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </h3>

        {mode === 'register' && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handle}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          {loading
            ? 'Procesando...'
            : mode === 'login'
            ? 'Entrar'
            : 'Registrar'}
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full text-center text-sm text-gray-500"
        >
          Cancelar
        </button>
      </motion.div>
    </div>
  )
}
