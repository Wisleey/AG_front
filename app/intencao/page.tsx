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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardBody className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Intenção Registrada com Sucesso!
              </h2>
              <p className="text-gray-600 mb-6">
                Obrigado pelo seu interesse! Sua intenção de participação foi
                registrada e será avaliada pela nossa equipe. Em breve entraremos
                em contato.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setSuccess(false)}>
                  Enviar Outra Intenção
                </Button>
                <Link href="/">
                  <Button variant="outline">Voltar para Home</Button>
                </Link>
              </div>
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
            📝 Intenção de Participação
          </h1>
          <p className="text-gray-600">
            Preencha o formulário abaixo para manifestar seu interesse em
            participar do nosso grupo de networking
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Seus Dados</h2>
          </CardHeader>

          <CardBody>
            {error && (
              <Alert type="error" className="mb-6">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Nome */}
              <Input
                label="Nome Completo"
                {...register('nome')}
                error={errors.nome?.message}
                placeholder="João Silva"
                required
              />

              {/* Email */}
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                placeholder="joao@exemplo.com"
                required
              />

              {/* Telefone */}
              <Input
                label="Telefone"
                {...register('telefone')}
                error={errors.telefone?.message}
                placeholder="(11) 91234-5678"
                required
              />

              {/* Empresa */}
              <Input
                label="Empresa"
                {...register('empresa')}
                error={errors.empresa?.message}
                placeholder="Minha Empresa Ltda"
                required
              />

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

              {/* Mensagem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem (Opcional)
                </label>
                <textarea
                  {...register('mensagem')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Conte-nos um pouco sobre você e por que quer participar..."
                />
                {errors.mensagem && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.mensagem.message}
                  </p>
                )}
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="flex-1"
                >
                  Enviar Intenção
                </Button>
                <Link href="/" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Info adicional */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Já possui um token de convite?{' '}
            <Link href="/cadastro" className="text-primary-600 hover:underline">
              Clique aqui para se cadastrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


