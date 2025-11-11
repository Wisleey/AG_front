/**
 * Página de Intenção de Participação (Pública)
 * Permite que interessados manifestem interesse em participar do grupo
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import Link from 'next/link';

// Schema de validação
const intencaoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
  empresa: z.string().min(2, 'Nome da empresa é obrigatório'),
  cargo: z.string().optional(),
  areaAtuacao: z.string().optional(),
  mensagem: z.string().max(1000).optional(),
});

type IntencaoFormData = z.infer<typeof intencaoSchema>;

export default function IntencaoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IntencaoFormData>({
    resolver: zodResolver(intencaoSchema),
  });

  const onSubmit = async (data: IntencaoFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      await api.post('/intencoes', data);

      setSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar intenção');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto w-full animate-scale-in">
          <Card variant="gradient" hover={false} className="text-center">
            <CardBody className="py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Intenção Registrada com Sucesso!
              </h2>
              <p className="text-neutral-300 text-lg mb-8 max-w-lg mx-auto">
                Obrigado pelo seu interesse! Sua intenção de participação foi
                registrada e será avaliada pela nossa equipe. Em breve entraremos
                em contato.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setSuccess(false)} size="lg">
                  Enviar Outra Intenção
                </Button>
                <Link href="/">
                  <Button variant="outline" size="lg">Voltar para Home</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 mb-6">
            <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-sm font-medium text-brand-400">Passo 1 de 2</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Intenção de <span className="text-gradient">Participação</span>
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Preencha o formulário abaixo para manifestar seu interesse em
            participar do nosso grupo de networking
          </p>
        </div>

        <Card variant="gradient" hover={false} className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="border-b border-dark-300">
            <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Seus Dados
            </h2>
          </CardHeader>

          <CardBody className="p-6 md:p-8">
            {error && (
              <Alert type="error" className="mb-6 animate-shake">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Grid de 2 colunas para melhor organização */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Nome */}
                <div className="md:col-span-2">
                  <Input
                    label="Nome Completo"
                    {...register('nome')}
                    error={errors.nome?.message}
                    placeholder="João Silva"
                    required
                    disabled={false}
                    readOnly={false}
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <Input
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="joao@exemplo.com"
                  required
                  disabled={false}
                  readOnly={false}
                  autoComplete="email"
                />

                {/* Telefone */}
                <Input
                  label="Telefone"
                  {...register('telefone')}
                  error={errors.telefone?.message}
                  placeholder="(11) 91234-5678"
                  required
                  disabled={false}
                  readOnly={false}
                  autoComplete="tel"
                />

                {/* Empresa */}
                <Input
                  label="Empresa"
                  {...register('empresa')}
                  error={errors.empresa?.message}
                  placeholder="Minha Empresa Ltda"
                  required
                  disabled={false}
                  readOnly={false}
                  autoComplete="organization"
                />

                {/* Cargo */}
                <Input
                  label="Cargo"
                  {...register('cargo')}
                  error={errors.cargo?.message}
                  placeholder="CEO, Diretor, Gerente..."
                  disabled={false}
                  readOnly={false}
                  autoComplete="organization-title"
                />
              </div>

              {/* Área de Atuação - Largura Total */}
              <Input
                label="Área de Atuação"
                {...register('areaAtuacao')}
                error={errors.areaAtuacao?.message}
                placeholder="Tecnologia, Consultoria, Marketing..."
                disabled={false}
                readOnly={false}
              />

              {/* Mensagem */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Mensagem (Opcional)
                </label>
                <textarea
                  {...register('mensagem')}
                  rows={4}
                  className="input-modern resize-none"
                  placeholder="Conte-nos um pouco sobre você e por que quer participar..."
                  disabled={false}
                  readOnly={false}
                  style={{ 
                    position: 'relative', 
                    zIndex: 20, 
                    pointerEvents: 'auto',
                    cursor: 'text'
                  }}
                />
                {errors.mensagem && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.mensagem.message}
                  </p>
                )}
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="flex-1"
                  size="lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Enviar Intenção
                </Button>
                <Link href="/" className="flex-1">
                  <Button type="button" variant="secondary" className="w-full" size="lg">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardBody>
        </Card>

        
       
      </div>
    </div>
  );
}



