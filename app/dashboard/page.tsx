/**
 * Dashboard de Performance - Design 2025
 * Exibe métricas e estatísticas do grupo de networking
 */

"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { DashboardMetrics } from "@/types";
import { formatCurrency } from "@/lib/utils";
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
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-brand-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-neutral-300 text-lg">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen hero-gradient py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card variant="gradient" hover={false} className="animate-scale-in">
            <CardBody className="text-center py-12">
              <svg
                className="w-16 h-16 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                Erro ao Carregar
              </h3>
              <p className="text-neutral-400 mb-6">{error}</p>
              <Button onClick={carregarMetricas} size="lg">
                Tentar Novamente
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="min-h-screen hero-gradient py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 mt-10 animate-fade-in-down">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                Dashboard de <span className="text-gradient">Performance</span>
              </h1>
              <p className="text-neutral-400 text-lg">
                Visão geral das métricas do grupo em tempo real
              </p>
            </div>
            <Button
              onClick={carregarMetricas}
              variant="secondary"
              className="hidden md:flex"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Atualizar
            </Button>
          </div>
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total de Membros */}
          <div className="stagger-item group card-modern p-6 hover-glow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-400 mb-1">
                  Total de Membros
                </p>
                <p className="text-4xl font-heading font-bold text-white mb-2">
                  {metrics.membros.total}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                    {metrics.membros.ativos} ativos
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Total de Indicações do Mês */}
          <div className="stagger-item group card-modern p-6 hover-glow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-400 mb-1">
                  Indicações do Mês
                </p>
                <p className="text-4xl font-heading font-bold text-white mb-2">
                  {metrics.indicacoesMesAtual}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">
                    {metrics.indicacoes.total} total
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Total de Obrigados do Mês */}
          <div className="stagger-item group card-modern p-6 hover-glow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-400 mb-1">
                  Obrigados do Mês
                </p>
                <p className="text-4xl font-heading font-bold text-white mb-2">
                  {metrics.obrigadosMesAtual}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-semibold">
                    Agradecimentos
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Secundários */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Indicações Fechadas */}
          <div className="stagger-item group card-modern p-6 hover-glow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Ind. Fechadas</p>
                <p className="text-4xl font-heading font-bold text-white mb-2">
                  {metrics.indicacoes.fechadas}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                    {metrics.indicacoes.taxaConversao.toFixed(1)}% conversão
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Indicações Abertas */}
          <div className="stagger-item group card-modern p-6 hover-glow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Ind. Abertas</p>
                <p className="text-4xl font-heading font-bold text-white mb-2">
                  {metrics.indicacoes.abertas}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">
                    Em análise
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Valor Total Gerado */}
          <div className="stagger-item group card-modern p-6 hover-glow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Valor Gerado</p>
                <p className="text-4xl font-heading font-bold text-gradient mb-2">
                  {formatCurrency(metrics.indicacoes.valorTotalGerado)}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-brand-500/20 text-brand-400 rounded text-xs font-semibold">
                    Total acumulado
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform pulse-glow">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Top Membros Indicadores */}
        {metrics.topMembrosIndicadores &&
          metrics.topMembrosIndicadores.length > 0 && (
            <Card
              variant="gradient"
              hover={false}
              className="mb-8 animate-fade-in-up"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  Top Membros Indicadores
                </CardTitle>
                <CardDescription>
                  Reconhecimento aos membros mais ativos
                </CardDescription>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {metrics.topMembrosIndicadores.map((item, index) => (
                    <div
                      key={item.membro.id}
                      className="flex items-center justify-between p-5 bg-dark-600/50 rounded-xl hover:bg-dark-600 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-xl ${
                            index === 0
                              ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
                              : index === 1
                              ? "bg-gradient-to-br from-gray-400 to-gray-500 text-white"
                              : index === 2
                              ? "bg-gradient-to-br from-orange-600 to-orange-700 text-white"
                              : "bg-dark-500 text-neutral-400"
                          }`}
                        >
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-lg group-hover:text-brand-400 transition-colors">
                            {item.membro.nomeCompleto}
                          </p>
                          {item.membro.empresa && (
                            <p className="text-sm text-neutral-400">
                              {item.membro.empresa}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-heading font-bold text-gradient">
                          {item.totalIndicacoes}
                        </p>
                        <p className="text-sm text-neutral-400">indicações</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

        {/* Ações Rápidas */}
        <Card variant="glass" hover={false} className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-brand-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/admin/intencoes">
                <Button className="w-full" variant="secondary" size="lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Ver Intenções
                </Button>
              </Link>
              <Link href="/intencao">
                <Button className="w-full" variant="secondary" size="lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Nova Intenção
                </Button>
              </Link>
              <Button
                className="w-full"
                variant="secondary"
                size="lg"
                onClick={carregarMetricas}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Atualizar
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
