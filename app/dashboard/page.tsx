/**
 * Dashboard de Performance
 * Exibe métricas e estatísticas do grupo de networking
 */

"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { DashboardMetrics } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || "";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarMetricas();
  }, []);

  const carregarMetricas = async () => {
    try {
      setLoading(true);
      const response = await api.get("/dashboard", {
        headers: { "x-admin-key": ADMIN_KEY },
      });
      setMetrics(response.data.data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar métricas");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Alert type="error">
            {error}
            <div className="mt-4">
              <Button onClick={carregarMetricas}>Tentar Novamente</Button>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📊 Dashboard de Performance
              </h1>
              <p className="text-gray-600 mt-1">
                Visão geral das métricas do grupo
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">Voltar</Button>
            </Link>
          </div>
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Membros */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Membros</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {metrics.membros.total}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {metrics.membros.ativos} ativos
                  </p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </CardBody>
          </Card>

          {/* Total de Indicações */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Total de Indicações
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {metrics.indicacoes.total}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {metrics.indicacoesMesAtual} este mês
                  </p>
                </div>
                <div className="text-4xl">🤝</div>
              </div>
            </CardBody>
          </Card>

          {/* Indicações Fechadas */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ind. Fechadas</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {metrics.indicacoes.fechadas}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {metrics.indicacoes.taxaConversao.toFixed(1)}% conversão
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </CardBody>
          </Card>

          {/* Valor Total Gerado */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valor Gerado</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(metrics.indicacoes.valorTotalGerado)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">Total acumulado</p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Status das Indicações */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600 mb-2">Indicações Abertas</p>
              <p className="text-2xl font-bold text-yellow-600">
                {metrics.indicacoes.abertas}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="text-sm text-gray-600 mb-2">Em Andamento</p>
              <p className="text-2xl font-bold text-blue-600">
                {metrics.indicacoes.emAndamento}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="text-sm text-gray-600 mb-2">Fechadas</p>
              <p className="text-2xl font-bold text-green-600">
                {metrics.indicacoes.fechadas}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Top Membros Indicadores */}
        {metrics.topMembrosIndicadores &&
          metrics.topMembrosIndicadores.length > 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">
                  🏆 Top Membros Indicadores
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {metrics.topMembrosIndicadores.map((item, index) => (
                    <div
                      key={item.membro.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-gray-400">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.membro.nomeCompleto}
                          </p>
                          {item.membro.empresa && (
                            <p className="text-sm text-gray-600">
                              {item.membro.empresa}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          {item.totalIndicacoes}
                        </p>
                        <p className="text-sm text-gray-600">indicações</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

        {/* Ações Rápidas */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">⚡ Ações Rápidas</h3>
            </CardHeader>
            <CardBody>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/admin/intencoes">
                  <Button className="w-full" variant="outline">
                    📝 Ver Intenções
                  </Button>
                </Link>
                <Link href="/intencao">
                  <Button className="w-full" variant="outline">
                    ➕ Nova Intenção
                  </Button>
                </Link>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={carregarMetricas}
                >
                  🔄 Atualizar
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

