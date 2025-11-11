/**
 * Navbar - Barra de Navegação Principal
 * Design 2025 com Glassmorphism e Animações
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detecta scroll para aplicar efeito glass
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicRoutes = [
    { name: 'Home', path: '/' },
    { name: 'Intenção', path: '/intencao' },
  ];

  const adminRoutes = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Admin', path: '/admin/intencoes' },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass shadow-lg shadow-brand-500/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo com Gradiente */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-heading font-bold text-xl leading-none">
                NetworkPro
              </span>
              <span className="text-brand-400 font-accent text-xs tracking-wider">
                PLATFORM
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Rotas Públicas */}
            {publicRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`relative px-5 py-2 rounded-full font-medium transition-all duration-300 group ${
                  isActive(route.path)
                    ? 'text-white'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {isActive(route.path) && (
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full animate-fade-in" />
                )}
                <span className="relative z-10">{route.name}</span>
                {!isActive(route.path) && (
                  <span className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            ))}

            {/* Divisor Sutil */}
            <div className="h-6 w-px bg-neutral-700 mx-2" />

            {/* Rotas Admin */}
            {adminRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`relative px-5 py-2 rounded-full font-medium transition-all duration-300 group border ${
                  isActive(route.path)
                    ? 'border-brand-500 text-white bg-brand-500/20'
                    : 'border-neutral-700 text-neutral-300 hover:border-brand-500/50 hover:text-white'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  {route.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-white/5 transition-all group"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-neutral-700 animate-fade-in-down">
            {/* Rotas Públicas Mobile */}
            <div className="mb-6">
              <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider px-4 mb-3">
                Menu Principal
              </p>
              <div className="space-y-1">
                {publicRoutes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl mx-2 transition-all duration-200 ${
                      isActive(route.path)
                        ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-lg'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="font-medium">{route.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Rotas Admin Mobile */}
            <div className="mb-6">
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-wider px-4 mb-3">
                Área Administrativa
              </p>
              <div className="space-y-1">
                {adminRoutes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl mx-2 transition-all duration-200 border ${
                      isActive(route.path)
                        ? 'bg-brand-500/20 text-white font-semibold border-brand-500'
                        : 'text-neutral-300 border-neutral-700 hover:border-brand-500/50 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-medium">{route.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Mobile */}
            <div className="pt-4 border-t border-neutral-700 px-4">
              <Link
                href="/cadastro/seu-token-aqui"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span>Completar Cadastro</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


