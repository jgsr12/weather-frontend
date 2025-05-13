'use client'

import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/useDebounce'
import { Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '@/contexts/AuthContext'
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline'
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid'

interface WeatherData {
  city: string
  temp_c: number
  temp_f: number
  condition: string
  icon: string
  wind_kph: number
  humidity: number
  localtime: string
}

export default function CitySearch() {
  const { user, favorites, toggleFavorite } = useContext(AuthContext)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [loadingWeather, setLoadingWeather] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([])
      return
    }
    setLoadingSuggestions(true)
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/autocomplete?query=${encodeURIComponent(debouncedQuery)}`,
      { credentials: 'include' }
    )
      .then(async res => {
        setLoadingSuggestions(false)
        if (!res.ok) throw new Error((await res.json()).message)
        return res.json()
      })
      .then((list: string[]) => setSuggestions(list))
      .catch(err => {
        console.error(err)
        toast.error(`Autocompletar: ${err.message}`)
      })
  }, [debouncedQuery])

  const fetchWeather = (city: string) => {
    setLoadingWeather(true)
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/weather?city=${encodeURIComponent(city)}`,
      { credentials: 'include' }
    )
      .then(async res => {
        setLoadingWeather(false)
        if (!res.ok) throw new Error((await res.json()).message)
        return res.json()
      })
      .then((data: WeatherData) => {
        setWeather(data)
        toast.success(`Clima de ${data.city} cargado`)
      })
      .catch(err => {
        console.error(err)
        toast.error(`Weather: ${err.message}`)
      })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) fetchWeather(query.trim())
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 space-y-6">
      <form onSubmit={onSubmit} className="relative w-full">
        <div className="flex items-center border border-blue-200 rounded-full overflow-hidden focus-within:ring-2 ring-blue-300">
          <span className="px-4 text-gray-400"><Search size={20} /></span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar ciudad..."
            className="flex-grow p-3 bg-transparent focus:outline-none"
          />
        </div>
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 mt-2 w-full bg-white rounded-xl shadow-lg max-h-52 overflow-auto"
            >
              {suggestions.map(city => (
                <motion.li
                  key={city}
                  onClick={() => {
                    setQuery(city)
                    setSuggestions([])
                    fetchWeather(city)
                  }}
                  whileHover={{ backgroundColor: '#f0f9ff' }}
                  className="px-4 py-3 cursor-pointer"
                >
                  {city}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </form>

      {loadingWeather && (
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-t-transparent rounded-full border-blue-500"></div>
        </div>
      )}

      {weather && !loadingWeather && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-4 text-gray-800 relative"
        >
          <button
            onClick={() => user ? toggleFavorite(weather.city) : toast.error('Inicia sesión primero')}
            className="absolute top-4 right-4 p-1"
          >
            {favorites.includes(weather.city)
              ? <SolidHeart className="h-6 w-6 text-red-500" />
              : <OutlineHeart className="h-6 w-6 text-gray-400" />
            }
          </button>
          <h2 className="text-2xl font-bold text-blue-600">{weather.city}</h2>
          <div className="flex items-center gap-6">
            <img src={weather.icon} alt={weather.condition} className="w-16 h-16" />
            <div>
              <p className="text-lg">{weather.condition}</p>
              <p className="text-xl font-semibold">{weather.temp_c}°C / {weather.temp_f}°F</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><span className="font-medium">Viento:</span> {weather.wind_kph} kph</p>
            <p><span className="font-medium">Humedad:</span> {weather.humidity}%</p>
            <p className="col-span-2"><span className="font-medium">Hora local:</span> {weather.localtime}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
