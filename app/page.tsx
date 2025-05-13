import React from 'react';
import CitySearch from '@/components/CitySearch'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <CitySearch />
      </div>
    </main>
  )
}