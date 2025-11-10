/**
 * Área Admin - Gerenciamento de Intenções
 * Lista e permite aprovar/rejeitar intenções pendentes
 */

'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Intencao } from '@/types';
import { formatDate, formatPhone } from '@/lib/utils';
import Link from 'next/link';

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || '';

export default function AdminIntencoesPage() {
  const [intencoes, setIntencoes] = useState<Intencao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'TODAS' | 'PENDENTE' | 'APROVADO' | 'REJEITADO'>('PENDENTE');
  const [showModal, setShowModal] = useState(false);
  const [selectedIntencao, setSelectedIntencao] = useState<Intencao | null>(null);
  const [modalType, setModalType] = useState<'aprovar' | 'rejeitar'>('aprovar');
  const [motivo, setMotivo] = useState('');
  const [tokenGerado, setTokenGerado] = useState<string | null>(null);
  const [linkConvite, setLinkConvite] = useState<string | null>(null);

  useEffect(() => {
    carregarIntencoes();
  }, [filter]);

  const carregarIntencoes = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = filter !== 'TODAS' ? `?status=${filter}` : '';
      const response = await api.get(`/intencoes/admin${params}`, {
        headers: { 'x-admin-key': ADMIN_KEY },
      });

      setIntencoes(response.data.data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar intenções');
    } finally {
      setLoading(false);
    }
  };

  const handleAprovar = async (intencao: Intencao) => {
    setSelectedIntencao(intencao);
    setModalType('aprovar');
    setShowModal(true);
  };

  const handleRejeitar = async (intencao: Intencao) => {
    setSelectedIntencao(intencao);
    setModalType('rejeitar');
    setShowModal(true);
  };

  const confirmarAcao = async () => {
    if (!selectedIntencao) return;

    try {
      if (modalType === 'aprovar') {
        const response = await api.put(
          `/intencoes/admin/${selectedIntencao.id}/aprovar`,
          {},
          { headers: { 'x-admin-key': ADMIN_KEY } }
        );

        setTokenGerado(response.data.data.tokenConvite);
        setLinkConvite(response.data.data.linkConvite);
      } else {
        await api.put(
          `/intencoes/admin/${selectedIntencao.id}/rejeitar`,
          { motivo },
          { headers: { 'x-admin-key': ADMIN_KEY } }
        );
        setShowModal(false);
      }

      carregarIntencoes();
    } catch (err: any) {
      setError(err.message || 'Erro ao processar ação');
    }
  };

  const fecharModal = () => {
    setShowModal(false);
    setSelectedIntencao(null);
    setMotivo('');
    setTokenGerado(null);
    setLinkConvite(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDENTE: 'bg-yellow-100 text-yellow-800',
      APROVADO: 'bg-green-100 text-green-800',
      REJEITADO: 'bg-red-100 text-red-800',
    };
    return styles[status as keyof typeof styles] || '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              🔐 Área Administrativa
            </h1>
            <Link href="/">
              <Button variant="outline">Voltar</Button>
            </Link>
          </div>
          <p className="text-gray-600">
            Gerencie intenções de participação pendentes
          </p>
        </div>

        {error && (
          <Alert type="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            {(['TODAS', 'PENDENTE', 'APROVADO', 'REJEITADO'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        )}

        {/* Lista de Intenções */}
        {!loading && (
          <div className="space-y-4">
            {intencoes.length === 0 ? (
              <Card>
                <CardBody className="text-center py-12">
                  <p className="text-gray-500">
                    Nenhuma intenção encontrada com esse filtro
                  </p>
                </CardBody>
              </Card>
            ) : (
              intencoes.map((intencao) => (
                <Card key={intencao.id}>
                  <CardBody>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {intencao.nome}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(
                              intencao.status
                            )}`}
                          >
                            {intencao.status}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>
                            <strong>Email:</strong> {intencao.email}
                          </div>
                          <div>
                            <strong>Telefone:</strong>{' '}
                            {formatPhone(intencao.telefone)}
                          </div>
                          <div>
                            <strong>Empresa:</strong> {intencao.empresa}
                          </div>
                          {intencao.cargo && (
                            <div>
                              <strong>Cargo:</strong> {intencao.cargo}
                            </div>
                          )}
                          {intencao.areaAtuacao && (
                            <div>
                              <strong>Área:</strong> {intencao.areaAtuacao}
                            </div>
                          )}
                          <div>
                            <strong>Data:</strong>{' '}
                            {formatDate(intencao.dataIntencao)}
                          </div>
                        </div>

                        {intencao.mensagem && (
                          <div className="mt-3 p-3 bg-gray-50 rounded">
                            <strong className="text-sm">Mensagem:</strong>
                            <p className="text-sm text-gray-600 mt-1">
                              {intencao.mensagem}
                            </p>
                          </div>
                        )}
                      </div>

                      {intencao.status === 'PENDENTE' && (
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => handleAprovar(intencao)}
                          >
                            ✓ Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleRejeitar(intencao)}
                          >
                            ✕ Rejeitar
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              {tokenGerado ? (
                <>
                  <h3 className="text-xl font-bold mb-4 text-green-600">
                    ✅ Intenção Aprovada!
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Link de convite gerado com sucesso:
                  </p>
                  <div className="bg-gray-50 p-4 rounded mb-4 break-all">
                    <code className="text-sm">{linkConvite}</code>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Envie este link para: <strong>{selectedIntencao?.email}</strong>
                  </p>
                  <Button onClick={fecharModal} className="w-full">
                    Fechar
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-4">
                    {modalType === 'aprovar'
                      ? 'Aprovar Intenção'
                      : 'Rejeitar Intenção'}
                  </h3>
                  <p className="mb-4 text-gray-600">
                    {modalType === 'aprovar'
                      ? `Deseja aprovar a intenção de ${selectedIntencao?.nome}?`
                      : `Por que está rejeitando ${selectedIntencao?.nome}?`}
                  </p>

                  {modalType === 'rejeitar' && (
                    <textarea
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      className="w-full p-3 border rounded mb-4"
                      rows={4}
                      placeholder="Digite o motivo da rejeição..."
                      required
                    />
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={confirmarAcao}
                      disabled={modalType === 'rejeitar' && !motivo}
                      className="flex-1"
                    >
                      Confirmar
                    </Button>
                    <Button
                      onClick={fecharModal}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


