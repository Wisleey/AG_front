/**
 * Landing Page Principal
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🤝 Plataforma de Gestão de Networking
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Digitalize e automatize a gestão do seu grupo de networking.
            Membros, reuniões, indicações e muito mais em um só lugar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/intencao">
              <Button size="lg" className="w-full sm:w-auto">
                📝 Quero Participar
              </Button>
            </Link>
            <Link href="/admin/intencoes">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                🔐 Área Admin
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-2">Gestão de Membros</h3>
              <p className="text-gray-600">
                Cadastro, perfis, status e permissões organizados
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold mb-2">Indicações</h3>
              <p className="text-gray-600">
                Sistema completo de geração e acompanhamento de negócios
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
              <p className="text-gray-600">
                Métricas e KPIs em tempo real para acompanhamento
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-gray-600">
            <p>Desenvolvido com Next.js, TypeScript e PostgreSQL</p>
          </div>
        </div>
      </div>
    </main>
  );
}


