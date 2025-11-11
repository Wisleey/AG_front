/**
 * Página de Cadastro Completo via Token de Convite - Design 2025
 * Permite que usuários aprovados completem seu cadastro
 */

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Link from 'next/link';

// Schema de validação
const cadastroSchema = z.object({
  senha: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmarSenha: z.string(),
  cargo: z.string().optional(),
  areaAtuacao: z.string().optional(),
  telefone: z.string().optional(),
  linkedin: z.string().url('URL inválida').optional().or(z.literal('')),
  bio: z.string().max(1000).optional(),
  fotoUrl: z.string().url('URL inválida').optional().or(z.literal('')),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
});

type CadastroFormData = z.infer<typeof cadastroSchema>;

export default function CadastroPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [intencao, setIntencao] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });

  useEffect(() => {
    validarToken();
  }, [token]);

  const validarToken = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/intencoes/token/${token}`);
      setIntencao(response.data.data);
    } catch (err: any) {
      setError(err.message || 'Token inválido ou expirado');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CadastroFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const { confirmarSenha, ...dadosCadastro } = data;

      await api.post(`/membros/cadastro/${token}`, dadosCadastro);

      setSuccess(true);

      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao completar cadastro');
    } finally {
      setIsSubmitting(false);
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
          <p className="text-neutral-300 text-lg">Validando convite...</p>
        </div>
      </div>
    );
  }

  if (error && !intencao) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto w-full">
          <Card variant="gradient" hover={false} className="animate-scale-in text-center">
            <CardBody className="py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Token Inválido
              </h2>
              <p className="text-neutral-300 text-lg mb-8 max-w-lg mx-auto">{error}</p>
              <Link href="/">
                <Button size="lg">Voltar para Home</Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto w-full">
          <Card variant="gradient" hover={false} className="animate-scale-in text-center">
            <CardBody className="py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Cadastro Concluído!
              </h2>
              <p className="text-neutral-300 text-lg mb-6 max-w-lg mx-auto">
                Bem-vindo(a) ao grupo! Seu cadastro foi completado e você já pode
                fazer login na plataforma.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30">
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                <p className="text-sm text-neutral-400">
                  Redirecionando em 3 segundos...
                </p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-brand-400">Convite Aprovado</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Complete seu <span className="text-gradient">Cadastro</span>
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Sua intenção foi aprovada! Complete seu cadastro para fazer parte do
            grupo.
          </p>
        </div>

        <Card variant="gradient" hover={false} className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="border-b border-dark-300">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-heading font-bold text-2xl">
                  {intencao?.nome?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <CardTitle>Dados do Convite</CardTitle>
                <CardDescription className="mt-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-white">{intencao?.nome}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white">{intencao?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-white">{intencao?.empresa}</span>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-8">
            {error && (
              <Alert type="error" className="mb-6 animate-shake">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Senhas */}
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Senha"
                  type="password"
                  {...register('senha')}
                  error={errors.senha?.message}
                  helperText="Mínimo 8 caracteres"
                  required
                  disabled={false}
                  readOnly={false}
                  autoComplete="new-password"
                />

                <Input
                  label="Confirmar Senha"
                  type="password"
                  {...register('confirmarSenha')}
                  error={errors.confirmarSenha?.message}
                  required
                  disabled={false}
                  readOnly={false}
                  autoComplete="new-password"
                />
              </div>

              <div className="border-t border-dark-300 pt-6">
                <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informações Adicionais
                </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Cargo"
                      {...register('cargo')}
                      error={errors.cargo?.message}
                      placeholder="CEO, Diretor, Gerente..."
                      disabled={false}
                      readOnly={false}
                      autoComplete="organization-title"
                    />

                    <Input
                      label="Área de Atuação"
                      {...register('areaAtuacao')}
                      error={errors.areaAtuacao?.message}
                      placeholder="Tecnologia, Consultoria..."
                      disabled={false}
                      readOnly={false}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Telefone"
                      {...register('telefone')}
                      error={errors.telefone?.message}
                      placeholder="(11) 91234-5678"
                      disabled={false}
                      readOnly={false}
                      autoComplete="tel"
                    />

                    <Input
                      label="LinkedIn"
                      {...register('linkedin')}
                      error={errors.linkedin?.message}
                      placeholder="https://linkedin.com/in/..."
                      disabled={false}
                      readOnly={false}
                      autoComplete="url"
                    />
                  </div>

                  <Input
                    label="URL da Foto de Perfil"
                    {...register('fotoUrl')}
                    error={errors.fotoUrl?.message}
                    placeholder="https://exemplo.com/foto.jpg"
                    helperText="Link para sua foto de perfil"
                    disabled={false}
                    readOnly={false}
                    autoComplete="url"
                  />

                  <div style={{ position: 'relative', zIndex: 10 }}>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Biografia
                    </label>
                    <textarea
                      {...register('bio')}
                      rows={4}
                      className="input-modern resize-none"
                      placeholder="Conte um pouco sobre você, sua experiência e o que busca no networking..."
                      disabled={false}
                      readOnly={false}
                      style={{ 
                        position: 'relative', 
                        zIndex: 20, 
                        pointerEvents: 'auto',
                        cursor: 'text'
                      }}
                    />
                    {errors.bio && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.bio.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão */}
              <div className="pt-4">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Completar Cadastro
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

