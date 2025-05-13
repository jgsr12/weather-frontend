import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CitySearch from '@/components/CitySearch';
import { AuthContext } from '@/contexts/AuthContext';

describe('CitySearch Component', () => {
  const mockContext = {
    user: null,
    favorites: [] as string[],
    toggleFavorite: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    updateProfile: jest.fn(),
  };

  beforeEach(() => {
    // simulamos fetch para autocomplete y weather
    global.fetch = jest.fn((url: string) =>
      Promise.resolve({
        ok: true,
        json: () =>
          url.includes('/autocomplete')
            ? Promise.resolve(['London, UK'])
            : Promise.resolve({
                city: 'London',
                temp_c: 20,
                temp_f: 68,
                condition: 'Sunny',
                icon: '/icon.png',
                wind_kph: 10,
                humidity: 50,
                localtime: '2025-05-12 12:00',
              }),
      })
    ) as any;

    jest.clearAllMocks();
  });

  it('muestra sugerencias y datos de clima al seleccionar', async () => {
    render(
      <AuthContext.Provider value={mockContext as any}>
        <CitySearch />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/buscar ciudad/i), {
      target: { value: 'Lon' },
    });

    await waitFor(() => expect(screen.getByText('London, UK')).toBeInTheDocument());
    fireEvent.click(screen.getByText('London, UK'));

    await waitFor(() => expect(screen.getByText('London')).toBeInTheDocument());
    expect(screen.getByText('20°C / 68°F')).toBeInTheDocument();
  });
});
