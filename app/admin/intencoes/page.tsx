/**
 * Área Admin - Gerenciamento de Intenções - Design 2025
 * Lista e permite aprovar/rejeitar intenções pendentes
 */

'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Card, CardBody, CardTitle, CardDescription } from '@/components/ui/Card';
import { Intencao } from '@/types';
import { formatDate, formatPhone } from '@/lib/utils';

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
      setError(null); // Limpar erros anteriores
      
      if (modalType === 'aprovar') {
        const response = await api.put(
          `/intencoes/admin/${selectedIntencao.id}/aprovar`,
          {},
          { headers: { 'x-admin-key': ADMIN_KEY } }
        );

        setTokenGerado(response.data.data.tokenConvite);
        setLinkConvite(response.data.data.linkConvite);
      } else {
        // Enviar motivo mesmo que vazio (backend tem valor padrão)
        const motivoRejeicao = motivo.trim() || 'Sem motivo especificado';
        
        await api.put(
          `/intencoes/admin/${selectedIntencao.id}/rejeitar`,
          { motivo: motivoRejeicao },
          { headers: { 'x-admin-key': ADMIN_KEY } }
        );
        setShowModal(false);
      }

      carregarIntencoes();
    } catch (err: any) {
      console.error('Erro ao processar ação:', err);
      setError(err.response?.data?.message || err.message || 'Erro ao processar ação');
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
      PENDENTE: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      APROVADO: 'bg-green-500/20 text-green-400 border border-green-500/30',
      REJEITADO: 'bg-red-500/20 text-red-400 border border-red-500/30',
    };
    return styles[status as keyof typeof styles] || '';
  };

  return (
    <div className="min-h-screen hero-gradient py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-in-down">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
                Área <span className="text-gradient">Administrativa</span>
              </h1>
              <p className="text-neutral-400 text-lg mt-1">
                Gerencie intenções de participação pendentes
              </p>
            </div>
          </div>
        </div>

        {error && (
          <Alert type="error" className="mb-6 animate-shake">
            {error}
          </Alert>
        )}

        {/* Filtros */}
        <div className="glass rounded-2xl p-4 mb-8 animate-fade-in-up">
          <div className="flex flex-wrap gap-3">
            {(['TODAS', 'PENDENTE', 'APROVADO', 'REJEITADO'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === f
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg scale-105'
                    : 'bg-dark-500 text-neutral-300 hover:bg-dark-400 hover:text-white border border-dark-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-brand-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-neutral-300 text-lg">Carregando intenções...</p>
          </div>
        )}

        {/* Lista de Intenções */}
        {!loading && (
          <div className="space-y-4">
            {intencoes.length === 0 ? (
              <Card variant="gradient" hover={false} className="animate-scale-in">
                <CardBody className="text-center py-16">
                  <svg className="w-16 h-16 text-neutral-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-neutral-400 text-lg">
                    Nenhuma intenção encontrada com esse filtro
                  </p>
                </CardBody>
              </Card>
            ) : (
              intencoes.map((intencao, index) => (
                <div 
                  key={intencao.id} 
                  className="stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card hover={false} className="group">
                    <CardBody className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-heading font-bold text-lg">
                                {intencao.nome.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-heading font-semibold text-white">
                                  {intencao.nome}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(intencao.status)}`}>
                                  {intencao.status}
                                </span>
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-3 text-sm text-neutral-400">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  {intencao.email}
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {formatPhone(intencao.telefone)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                  {intencao.empresa}
                                </div>
                                {intencao.cargo && (
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {intencao.cargo}
                                  </div>
                                )}
                                {intencao.areaAtuacao && (
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    {intencao.areaAtuacao}
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {formatDate(intencao.dataIntencao)}
                                </div>
                              </div>

                              {intencao.mensagem && (
                                <div className="mt-4 p-4 bg-dark-600/50 rounded-xl border border-dark-300">
                                  <p className="text-sm text-brand-400 font-semibold mb-1">Mensagem:</p>
                                  <p className="text-sm text-neutral-300 leading-relaxed">
                                    {intencao.mensagem}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Botões sempre disponíveis para todas as intenções */}
                        <div className="flex gap-3 lg:flex-col">
                          <Button
                            size="md"
                            onClick={() => handleAprovar(intencao)}
                            className="flex-1 lg:flex-none"
                            disabled={intencao.status === 'APROVADO'}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {intencao.status === 'APROVADO' ? 'Aprovado' : intencao.status === 'REJEITADO' ? 'Re-Aprovar' : 'Aprovar'}
                          </Button>
                          <Button
                            size="md"
                            variant="danger"
                            onClick={() => handleRejeitar(intencao)}
                            className="flex-1 lg:flex-none"
                            disabled={intencao.status === 'REJEITADO'}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            {intencao.status === 'REJEITADO' ? 'Rejeitado' : intencao.status === 'APROVADO' ? 'Cancelar Aprovação' : 'Rejeitar'}
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="glass rounded-2xl border border-brand-500/30 max-w-md w-full p-8 animate-scale-in">
              {tokenGerado ? (
                <>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4 text-center">
                    Intenção Aprovada!
                  </h3>
                  <p className="mb-4 text-neutral-300 text-center">
                    Link de convite gerado com sucesso:
                  </p>
                  <div className="bg-dark-600 p-4 rounded-xl mb-4 break-all border border-brand-500/30">
                    <code className="text-sm text-brand-400">{linkConvite}</code>
                  </div>
                  <p className="text-sm text-neutral-400 mb-6 text-center">
                    Envie este link para: <strong className="text-white">{selectedIntencao?.email}</strong>
                  </p>
                  <Button onClick={fecharModal} className="w-full" size="lg">
                    Fechar
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4">
                    {modalType === 'aprovar' ? 'Aprovar Intenção' : 'Rejeitar Intenção'}
                  </h3>
                  <p className="mb-6 text-neutral-300">
                    {modalType === 'aprovar'
                      ? `Deseja aprovar a intenção de ${selectedIntencao?.nome}?`
                      : `Tem certeza que deseja rejeitar ${selectedIntencao?.nome}?`}
                  </p>

                  {modalType === 'rejeitar' && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Motivo da Rejeição <span className="text-neutral-500">(Opcional)</span>
                      </label>
                      <textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        className="input-modern resize-none"
                        rows={4}
                        placeholder="Digite o motivo (opcional, mínimo 3 caracteres se preenchido)..."
                        style={{ 
                          position: 'relative', 
                          zIndex: 50, 
                          pointerEvents: 'auto',
                          cursor: 'text'
                        }}
                      />
                      {motivo.trim().length > 0 && motivo.trim().length < 3 && (
                        <p className="mt-2 text-sm text-yellow-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Mínimo 3 caracteres se preenchido
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={confirmarAcao}
                      disabled={modalType === 'rejeitar' && motivo.trim().length > 0 && motivo.trim().length < 3}
                      className="flex-1"
                      size="lg"
                    >
                      Confirmar
                    </Button>
                    <Button
                      onClick={fecharModal}
                      variant="secondary"
                      className="flex-1"
                      size="lg"
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
