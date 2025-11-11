/**
 * Tipos TypeScript compartilhados
 */

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'ADMIN' | 'GESTOR' | 'MEMBRO';
}

export interface Intencao {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo?: string;
  areaAtuacao?: string;
  mensagem?: string;
  status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  dataIntencao: string;
  dataAvaliacao?: string;
  motivoRejeicao?: string;
}

export interface Membro {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone?: string;
  empresa?: string;
  cargo?: string;
  areaAtuacao?: string;
  fotoUrl?: string;
  linkedin?: string;
  status: 'ATIVO' | 'INATIVO' | 'PENDENTE' | 'SUSPENSO';
  dataEntrada?: string;
  bio?: string;
}

export interface Indicacao {
  id: string;
  titulo: string;
  descricao: string;
  cliente: string;
  contatoCliente?: string;
  valorEstimado?: number;
  status: 'ABERTA' | 'EM_ANDAMENTO' | 'FECHADA' | 'PERDIDA' | 'CANCELADA';
  dataIndicacao: string;
  dataFechamento?: string;
  valorFechado?: number;
  membroIndicador: {
    id: string;
    nomeCompleto: string;
    empresa?: string;
  };
  membroIndicado: {
    id: string;
    nomeCompleto: string;
    empresa?: string;
  };
}

export interface DashboardMetrics {
  membros: {
    total: number;
    ativos: number;
    inativos: number;
  };
  indicacoes: {
    total: number;
    abertas: number;
    emAndamento: number;
    fechadas: number;
    taxaConversao: number;
    valorTotalGerado: number;
  };
  indicacoesMesAtual: number;
  obrigadosMesAtual: number;
  topMembrosIndicadores: Array<{
    membro: {
      id: string;
      nomeCompleto: string;
      empresa?: string;
      fotoUrl?: string;
    };
    totalIndicacoes: number;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}


