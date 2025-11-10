/**
 * Página de Cadastro Completo via Token de Convite
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
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Validando convite...</p>
        </div>
      </div>
    );
  }

  if (error && !intencao) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardBody className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Token Inválido
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link href="/">
                <Button>Voltar para Home</Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardBody className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cadastro Concluído com Sucesso!
              </h2>
              <p className="text-gray-600 mb-6">
                Bem-vindo(a) ao grupo! Seu cadastro foi completado e você já pode
                fazer login na plataforma.
              </p>
              <p className="text-sm text-gray-500">
                Redirecionando em 3 segundos...
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ✅ Complete seu Cadastro
          </h1>
          <p className="text-gray-600">
            Sua intenção foi aprovada! Complete seu cadastro para fazer parte do
            grupo.
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Dados do Convite</h2>
            <div className="mt-2 text-sm text-gray-600">
              <p><strong>Nome:</strong> {intencao?.nome}</p>
              <p><strong>Email:</strong> {intencao?.email}</p>
              <p><strong>Empresa:</strong> {intencao?.empresa}</p>
            </div>
          </CardHeader>

          <CardBody>
            {error && (
              <Alert type="error" className="mb-6">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Senha */}
              <Input
                label="Senha"
                type="password"
                {...register('senha')}
                error={errors.senha?.message}
                helperText="Mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número"
                required
              />

              {/* Confirmar Senha */}
              <Input
                label="Confirmar Senha"
                type="password"
                {...register('confirmarSenha')}
                error={errors.confirmarSenha?.message}
                required
              />

              <hr className="my-6" />

              {/* Cargo */}
              <Input
                label="Cargo"
                {...register('cargo')}
                error={errors.cargo?.message}
                placeholder="CEO, Diretor, Gerente..."
              />

              {/* Área de Atuação */}
              <Input
                label="Área de Atuação"
                {...register('areaAtuacao')}
                error={errors.areaAtuacao?.message}
                placeholder="Tecnologia, Consultoria, Marketing..."
              />

              {/* Telefone */}
              <Input
                label="Telefone"
                {...register('telefone')}
                error={errors.telefone?.message}
                placeholder="(11) 91234-5678"
              />

              {/* LinkedIn */}
              <Input
                label="LinkedIn"
                {...register('linkedin')}
                error={errors.linkedin?.message}
                placeholder="https://linkedin.com/in/seu-perfil"
              />

              {/* Foto URL */}
              <Input
                label="URL da Foto de Perfil"
                {...register('fotoUrl')}
                error={errors.fotoUrl?.message}
                placeholder="https://exemplo.com/foto.jpg"
                helperText="Link para sua foto de perfil"
              />

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografia
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Conte um pouco sobre você, sua experiência e o que busca no networking..."
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Botões */}
              <div className="pt-4">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full"
                  size="lg"
                >
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


