import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthModal from '@/components/AuthModal';
import { AuthContext } from '@/contexts/AuthContext';

describe('AuthModal Component', () => {
  const actions = {
    login: jest.fn(),
    register: jest.fn(),
  };

  it('en modo register muestra campos Nombre y Apellido', () => {
    render(
      <AuthContext.Provider value={actions as any}>
        <AuthModal mode="register" onClose={() => {}} />
      </AuthContext.Provider>
    );

    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Apellido')).toBeInTheDocument();
  });

  it('en modo login no muestra esos campos', () => {
    render(
      <AuthContext.Provider value={actions as any}>
        <AuthModal mode="login" onClose={() => {}} />
      </AuthContext.Provider>
    );

    expect(screen.queryByPlaceholderText('Nombre')).toBeNull();
    expect(screen.queryByPlaceholderText('Apellido')).toBeNull();
  });
});
