/**
 * Landing Page Principal - Design 2025
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section com Gradiente Animado */}
      <section className="hero-gradient relative min-h-screen flex items-center justify-center">
        {/* Elemento flutuante decorativo */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="section-container relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge Animado */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 mb-8 animate-fade-in-down">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-sm font-medium text-brand-400">Especialistas desde 2010</span>
            </div>

            {/* Título Principal com Gradiente */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 animate-fade-in-up">
              Sua Plataforma de{' '}
              <span className="text-gradient block mt-2">Networking Profissional</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Digitalize e automatize a gestão do seu grupo de networking.
              Gestão completa de membros, reuniões e indicações em uma plataforma moderna.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/intencao">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-brand-500/50 transition-all hover:scale-105"
                >
                  <span className="relative z-10">Quero Participar</span>
                  <div className="absolute inset-0 shimmer" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-brand-500 text-brand-500 hover:bg-brand-500/10 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
                >
                  Ver Dashboard
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto pt-12 border-t border-dark-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">5000+</div>
                <div className="text-neutral-400 text-sm">Membros Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">15+</div>
                <div className="text-neutral-400 text-sm">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">100%</div>
                <div className="text-neutral-400 text-sm">Foco em Resultados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container bg-dark-800 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Tudo que você precisa para{' '}
              <span className="text-gradient">crescer seu negócio</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Uma plataforma completa com todas as ferramentas necessárias
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="stagger-item group card-modern p-8 hover-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-white">Gestão de Membros</h3>
              <p className="text-neutral-400 leading-relaxed">
                Cadastro completo, perfis detalhados, status e permissões organizados de forma intuitiva
              </p>
            </div>

            {/* Feature 2 */}
            <div className="stagger-item group card-modern p-8 hover-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-white">Sistema de Indicações</h3>
              <p className="text-neutral-400 leading-relaxed">
                Geração e acompanhamento completo de negócios com métricas de conversão em tempo real
              </p>
            </div>

            {/* Feature 3 */}
            <div className="stagger-item group card-modern p-8 hover-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-white">Dashboard Inteligente</h3>
              <p className="text-neutral-400 leading-relaxed">
                Métricas e KPIs em tempo real com visualizações modernas para acompanhamento de performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-600/20 blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="gradient-border p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Pronto para revolucionar seu networking?
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais que já transformaram seus negócios
            </p>
            <Link href="/intencao">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-10 py-5 rounded-full text-xl font-semibold shadow-xl hover:shadow-brand-500/50 transition-all hover:scale-105 pulse-glow"
              >
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-500 text-sm">
            Desenvolvido com Next.js, TypeScript e PostgreSQL | Design 2025
          </p>
        </div>
      </footer>
    </main>
  );
}


