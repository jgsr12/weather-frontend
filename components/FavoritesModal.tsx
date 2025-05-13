'use client'
import React, { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

export default function FavoritesModal({ onClose }: { onClose: () => void }) {
  const { favorites, toggleFavorite } = useContext(AuthContext)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-lg shadow-lg w-80 max-h-[80vh] overflow-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Mis Favoritos</h3>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No tienes favoritos</p>
        ) : (
          <ul className="space-y-2">
            {favorites.map(city => (
              <li key={city} className="flex justify-between items-center border-b pb-2">
                <span>{city}</span>
                <button onClick={() => toggleFavorite(city)} className="text-red-500">Eliminar</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className="mt-4 w-full py-2 bg-gray-200 rounded">
          Cerrar
        </button>
      </motion.div>
    </div>
  )
}