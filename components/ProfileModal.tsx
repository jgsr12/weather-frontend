'use client'
import React, { useState, useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const { user, updateProfile } = useContext(AuthContext)
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      await updateProfile(firstName, lastName)
      onClose()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4 text-center">Mi Perfil</h3>
        <input type="text" placeholder="Nombre" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <input type="text" placeholder="Apellido" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full mb-4 p-2 border rounded" />
        <button onClick={handleSave} disabled={loading} className="w-full py-2 bg-green-600 text-white rounded">
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button onClick={onClose} className="mt-2 w-full text-center text-sm text-gray-500">
          Cancelar
        </button>
      </motion.div>
    </div>
  )
}