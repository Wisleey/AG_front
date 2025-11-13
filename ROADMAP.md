# 🗺️ Roadmap de Implementação - Plataforma de Networking

## 📅 Plano de Execução - 5 Dias

**Objetivo:** Implementar módulo de admissão de membros + dashboard de performance com 70%+ de cobertura de testes.

---

## 📊 Visão Geral do Sprint

| Dia | Foco Principal | Entregas | Tempo Estimado |
|-----|---------------|----------|----------------|
| **Dia 1** | Setup e Infraestrutura | Backend + Frontend + DB | 6-8h |
| **Dia 2** | Backend - Fluxo de Intenções | APIs + Services + DB | 6-8h |
| **Dia 3** | Frontend - Páginas e Componentes | UI/UX + Integração | 6-8h |
| **Dia 4** | Dashboard + Testes | Módulo Opcional + Tests | 6-8h |
| **Dia 5** | Refinamento + Documentação | Polimento + README | 4-6h |

**Total:** ~30-38 horas de desenvolvimento

---

## 🎯 Dia 1 - Setup e Infraestrutura

### Manhã (3-4h)

#### ✅ 1.1 Inicializar Repositório Git

```bash
# Criar estrutura de monorepo
mkdir networking-platform
cd networking-platform
git init
```

**Estrutura:**
```
networking-platform/
├── backend/          # API Express
├── frontend/         # Next.js App
├── .gitignore
├── README.md
├── ARQUITETURA.md
└── ROADMAP.md
```

#### ✅ 1.2 Setup Backend (Express + PostgreSQL + Prisma)

**Checklist:**
- [ ] Inicializar projeto Node.js
- [ ] Instalar dependências principais
- [ ] Configurar Prisma ORM
- [ ] Criar schema do banco
- [ ] Configurar variáveis de ambiente
- [ ] Setup Express com middlewares
- [ ] Criar estrutura de pastas

**Comandos:**
```bash
cd backend
npm init -y
npm install express cors helmet morgan dotenv bcryptjs jsonwebtoken
npm install -D nodemon typescript @types/node @types/express ts-node
npm install prisma @prisma/client
npm install -D @types/bcryptjs @types/jsonwebtoken @types/cors

npx prisma init
```

**Arquivos Criados:**
- `package.json`
- `tsconfig.json`
- `.env`
- `prisma/schema.prisma`
- `src/app.ts`
- `src/server.ts`

#### ✅ 1.3 Configurar PostgreSQL Local

**Opção 1: Docker** (Recomendado)
```bash
docker run --name networking-postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=networking_db \
  -p 5432:5432 \
  -d postgres:14
```

**Opção 2: Instalação Local**
- Download: https://www.postgresql.org/download/
- Criar database: `networking_db`

#### ✅ 1.4 Criar Schema Prisma

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Usuario {
  id           String   @id @default(uuid())
  email        String   @unique
  senhaHash    String   @map("senha_hash")
  nome         String
  tipo         TipoUsuario @default(MEMBRO)
  ativo        Boolean  @default(true)
  criadoEm     DateTime @default(now()) @map("criado_em")
  atualizadoEm DateTime @updatedAt @map("atualizado_em")
  
  membro       Membro?
  
  @@map("usuario")
}

model Intencao {
  id             String   @id @default(uuid())
  nome           String
  email          String   @unique
  telefone       String
  empresa        String
  cargo          String?
  areaAtuacao    String?  @map("area_atuacao")
  mensagem       String?  @db.Text
  status         StatusIntencao @default(PENDENTE)
  aprovadoPor    String?  @map("aprovado_por")
  dataIntencao   DateTime @default(now()) @map("data_intencao")
  dataAvaliacao  DateTime? @map("data_avaliacao")
  motivoRejeicao String?  @db.Text @map("motivo_rejeicao")
  tokenConvite   String?  @unique @map("token_convite")
  
  @@map("intencao")
}

model Membro {
  id            String   @id @default(uuid())
  usuarioId     String   @unique @map("usuario_id")
  nomeCompleto  String   @map("nome_completo")
  email         String   @unique
  telefone      String?
  empresa       String?
  cargo         String?
  areaAtuacao   String?  @map("area_atuacao")
  fotoUrl       String?  @map("foto_url")
  linkedin      String?
  status        StatusMembro @default(ATIVO)
  dataEntrada   DateTime? @map("data_entrada") @db.Date
  bio           String?  @db.Text
  criadoEm      DateTime @default(now()) @map("criado_em")
  atualizadoEm  DateTime @updatedAt @map("atualizado_em")
  
  usuario       Usuario  @relation(fields: [usuarioId], references: [id], onDelete: Cascade)
  
  indicacoesFeitas    Indicacao[] @relation("MembroIndicador")
  indicacoesRecebidas Indicacao[] @relation("MembroIndicado")
  
  @@map("membro")
}

model Indicacao {
  id                  String   @id @default(uuid())
  membroIndicadorId   String   @map("membro_indicador_id")
  membroIndicadoId    String   @map("membro_indicado_id")
  titulo              String
  descricao           String   @db.Text
  cliente             String
  contatoCliente      String?  @map("contato_cliente")
  valorEstimado       Decimal? @map("valor_estimado") @db.Decimal(15, 2)
  status              StatusIndicacao @default(ABERTA)
  dataIndicacao       DateTime @default(now()) @map("data_indicacao") @db.Date
  dataFechamento      DateTime? @map("data_fechamento") @db.Date
  valorFechado        Decimal? @map("valor_fechado") @db.Decimal(15, 2)
  percentualComissao  Int?     @map("percentual_comissao")
  criadoEm            DateTime @default(now()) @map("criado_em")
  atualizadoEm        DateTime @updatedAt @map("atualizado_em")
  
  membroIndicador Membro @relation("MembroIndicador", fields: [membroIndicadorId], references: [id], onDelete: Cascade)
  membroIndicado  Membro @relation("MembroIndicado", fields: [membroIndicadoId], references: [id], onDelete: Cascade)
  
  @@map("indicacao")
}

enum TipoUsuario {
  ADMIN
  GESTOR
  MEMBRO
}

enum StatusIntencao {
  PENDENTE
  APROVADO
  REJEITADO
}

enum StatusMembro {
  ATIVO
  INATIVO
  PENDENTE
  SUSPENSO
}

enum StatusIndicacao {
  ABERTA
  EM_ANDAMENTO
  FECHADA
  PERDIDA
  CANCELADA
}
```

**Executar migração:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Tarde (3-4h)

#### ✅ 1.5 Setup Frontend (Next.js + TypeScript)

**Comandos:**
```bash
cd ../frontend
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
npm install axios zustand react-hook-form zod @hookform/resolvers
npm install -D @types/react @types/node
```

**Estrutura criada:**
```
frontend/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── (public)/
│   │   └── intencao/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   ├── dashboard/
│   │   └── cadastro/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
├── hooks/
├── store/
├── types/
└── middleware.ts
```

#### ✅ 1.6 Configurar Ambiente de Desenvolvimento

**Backend `.env`:**
```env
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/networking_db"

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui_change_me
JWT_EXPIRES_IN=24h

# Admin
ADMIN_KEY=admin_super_secret_key_123

# Frontend
FRONTEND_URL=http://localhost:3000

# Email (opcional - para fase 2)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### ✅ 1.7 Commit Inicial

```bash
git add .
git commit -m "feat: initial project setup with Express, Next.js, and Prisma"
```

---

## 🎯 Dia 2 - Backend - Fluxo de Intenções

### Manhã (3-4h)

#### ✅ 2.1 Estrutura de Pastas do Backend

```
backend/src/
├── config/
│   ├── database.ts      # Prisma client
│   └── env.ts           # Validação de env vars
├── middlewares/
│   ├── auth.ts          # JWT verification
│   ├── adminAuth.ts     # ADMIN_KEY verification
│   ├── errorHandler.ts  # Error handling
│   └── validateRequest.ts
├── controllers/
│   ├── authController.ts
│   └── intencaoController.ts
├── services/
│   ├── authService.ts
│   └── intencaoService.ts
├── routes/
│   ├── index.ts
│   ├── auth.routes.ts
│   └── intencoes.routes.ts
├── validators/
│   └── intencaoValidator.ts
├── utils/
│   ├── ApiError.ts
│   ├── ApiResponse.ts
│   └── tokenUtils.ts
├── types/
│   └── express.d.ts
├── app.ts
└── server.ts
```

#### ✅ 2.2 Implementar Utilitários Base

**Arquivos:**
- `utils/ApiError.ts`
- `utils/ApiResponse.ts`
- `utils/tokenUtils.ts`
- `config/database.ts`

#### ✅ 2.3 Implementar Middlewares

**Arquivos:**
- `middlewares/errorHandler.ts`
- `middlewares/auth.ts`
- `middlewares/adminAuth.ts`
- `middlewares/validateRequest.ts`

#### ✅ 2.4 Implementar Service de Intenções

**Arquivo:** `services/intencaoService.ts`

**Funcionalidades:**
- Criar intenção (público)
- Listar intenções (admin)
- Aprovar intenção (admin) → gera token
- Rejeitar intenção (admin)
- Buscar por token de convite

### Tarde (3-4h)

#### ✅ 2.5 Implementar Controllers e Rotas

**Arquivos:**
- `controllers/intencaoController.ts`
- `routes/intencoes.routes.ts`

#### ✅ 2.6 Implementar Validators (Zod)

**Arquivo:** `validators/intencaoValidator.ts`

**Schemas:**
- `criarIntencaoSchema`
- `aprovarIntencaoSchema`
- `rejeitarIntencaoSchema`

#### ✅ 2.7 Testar Endpoints com REST Client

**Criar arquivo:** `backend/requests.http`

```http
### Health Check
GET http://localhost:3001/health

### Criar Intenção (Público)
POST http://localhost:3001/api/intencoes
Content-Type: application/json

{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "telefone": "(11) 98765-4321",
  "empresa": "Tech Solutions",
  "cargo": "CEO",
  "areaAtuacao": "Tecnologia"
}

### Listar Intenções (Admin)
GET http://localhost:3001/api/admin/intencoes
x-admin-key: admin_super_secret_key_123

### Aprovar Intenção
PUT http://localhost:3001/api/admin/intencoes/{{id}}/aprovar
x-admin-key: admin_super_secret_key_123
Content-Type: application/json

{
  "observacoes": "Perfil aprovado"
}
```

#### ✅ 2.8 Commit

```bash
git add .
git commit -m "feat(backend): implement intentions flow with admin approval"
```

---

## 🎯 Dia 3 - Frontend - Páginas e Componentes

### Manhã (3-4h)

#### ✅ 3.1 Criar Componentes Base (UI Kit)

**Arquivos:**
```
components/ui/
├── Button.tsx
├── Input.tsx
├── Select.tsx
├── Card.tsx
├── Badge.tsx
├── Modal.tsx
├── Loading.tsx
└── Alert.tsx
```

#### ✅ 3.2 Criar Cliente API (Axios)

**Arquivo:** `lib/api.ts`

**Funcionalidades:**
- Configuração base do Axios
- Interceptors de request/response
- Tratamento de erros

#### ✅ 3.3 Criar Store de Autenticação (Zustand)

**Arquivo:** `store/authStore.ts`

**Estado:**
- `user`
- `isAuthenticated`
- `login()`
- `logout()`

#### ✅ 3.4 Implementar Página de Intenção (Pública)

**Arquivo:** `app/(public)/intencao/page.tsx`

**Componentes:**
- Formulário de intenção
- Validação com Zod
- Submit com feedback visual
- Página de sucesso

### Tarde (3-4h)

#### ✅ 3.5 Implementar Área Admin

**Arquivo:** `app/(dashboard)/admin/intencoes/page.tsx`

**Funcionalidades:**
- Proteção via ADMIN_KEY
- Listagem de intenções pendentes
- Botões de aprovar/rejeitar
- Modal de confirmação
- Exibição do link de convite gerado

#### ✅ 3.6 Implementar Página de Cadastro Completo

**Arquivo:** `app/(public)/cadastro/[token]/page.tsx`

**Funcionalidades:**
- Validação do token de convite
- Formulário completo de cadastro
- Upload de foto (simulado)
- Criação de usuário + membro

#### ✅ 3.7 Criar Layout e Navegação

**Arquivos:**
- `app/(dashboard)/layout.tsx`
- `components/layout/Header.tsx`
- `components/layout/Sidebar.tsx`

#### ✅ 3.8 Commit

```bash
git add .
git commit -m "feat(frontend): implement intention form, admin area, and complete registration"
```

---

## 🎯 Dia 4 - Dashboard + Testes

### Manhã (3-4h)

#### ✅ 4.1 Implementar Dashboard de Performance

**Módulo Opcional Escolhido:** Dashboard de Performance

**Arquivo:** `app/(dashboard)/dashboard/page.tsx`

**Métricas:**
- Total de membros ativos
- Indicações do mês
- Obrigados registrados
- Gráfico de indicações por status

**Backend:**
- `services/dashboardService.ts`
- `controllers/dashboardController.ts`
- `routes/dashboard.routes.ts`

#### ✅ 4.2 Criar Sistema de Indicações (Backend)

**Arquivos:**
- `services/indicacaoService.ts`
- `controllers/indicacaoController.ts`
- `routes/indicacoes.routes.ts`

**Endpoints:**
- `POST /api/indicacoes` - Criar indicação
- `GET /api/indicacoes` - Listar indicações
- `PUT /api/indicacoes/:id/status` - Atualizar status

### Tarde (3-4h)

#### ✅ 4.3 Implementar Testes Unitários (Backend)

**Estrutura:**
```
backend/tests/
├── unit/
│   ├── services/
│   │   ├── intencaoService.test.ts
│   │   └── authService.test.ts
│   └── utils/
│       └── tokenUtils.test.ts
└── setup.ts
```

**Configurar Jest:**
```json
// package.json
{
  "scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch"
  }
}
```

**Criar:** `jest.config.js`

**Cobertura mínima:** 70%

#### ✅ 4.4 Implementar Testes de Integração (Backend)

**Arquivo:** `tests/integration/intencoes.test.ts`

**Testar:**
- POST /api/intencoes
- GET /api/admin/intencoes
- PUT /api/admin/intencoes/:id/aprovar

#### ✅ 4.5 Implementar Testes Frontend (React Testing Library)

**Estrutura:**
```
frontend/__tests__/
├── components/
│   └── IntencaoForm.test.tsx
└── pages/
    └── intencao.test.tsx
```

**Testar:**
- Renderização de componentes
- Validação de formulários
- Submissão de dados

#### ✅ 4.6 Commit

```bash
git add .
git commit -m "feat: implement dashboard and testing suite with 70%+ coverage"
```

---

## 🎯 Dia 5 - Refinamento + Documentação

### Manhã (2-3h)

#### ✅ 5.1 Refatorar Código

**Checklist:**
- [ ] Remover código duplicado
- [ ] Melhorar nomenclatura
- [ ] Adicionar comentários explicativos
- [ ] Aplicar princípios SOLID
- [ ] Verificar tratamento de erros

#### ✅ 5.2 Melhorar UI/UX

**Checklist:**
- [ ] Feedback visual em ações
- [ ] Loading states
- [ ] Mensagens de erro amigáveis
- [ ] Responsividade mobile
- [ ] Acessibilidade (ARIA labels)

#### ✅ 5.3 Criar Seeds de Dados

**Arquivo:** `backend/prisma/seed.ts`

**Dados:**
- 1 usuário admin
- 5 intenções de exemplo
- 3 membros ativos

```bash
npx prisma db seed
```

### Tarde (2-3h)

#### ✅ 5.4 Criar README.md Completo

**Seções:**
1. Descrição do Projeto
2. Tecnologias Utilizadas
3. Pré-requisitos
4. Instalação
5. Configuração
6. Como Rodar
7. Testes
8. Estrutura de Pastas
9. API Endpoints
10. Deploy

#### ✅ 5.5 Criar Documentação Adicional

**Arquivos:**
- `CONTRIBUTING.md` - Guia de contribuição
- `CHANGELOG.md` - Histórico de versões
- `.env.example` - Exemplo de variáveis
- `docker-compose.yml` - Setup com Docker

#### ✅ 5.6 Preparar para Deploy

**Checklist:**
- [ ] Configurar variáveis de produção
- [ ] Setup CI/CD (GitHub Actions)
- [ ] Configurar Vercel (frontend)
- [ ] Configurar Railway/Heroku (backend)
- [ ] Configurar Supabase (PostgreSQL)

#### ✅ 5.7 Review Final e Commit

```bash
git add .
git commit -m "docs: add comprehensive documentation and deployment config"
git tag v1.0.0
```

---

## 📊 Critérios de Avaliação

### ✅ Qualidade e Componentização (30%)

- [ ] Componentes reutilizáveis e bem estruturados
- [ ] Código limpo (Clean Code)
- [ ] Sem duplicação (DRY)
- [ ] Separação de responsabilidades
- [ ] TypeScript bem tipado

### ✅ Testes (30%)

- [ ] Cobertura mínima de 70%
- [ ] Testes unitários de services
- [ ] Testes de integração de APIs
- [ ] Testes de componentes React
- [ ] Testes de formulários

### ✅ Integração Fullstack (25%)

- [ ] Comunicação frontend-backend funcional
- [ ] Estado gerenciado corretamente (Zustand)
- [ ] Tratamento de erros robusto
- [ ] Validação em ambos os lados
- [ ] API RESTful bem estruturada

### ✅ Boas Práticas (15%)

- [ ] `.env` configurado corretamente
- [ ] README com instruções claras
- [ ] Commits semânticos (conventional commits)
- [ ] `.gitignore` configurado
- [ ] Código formatado (Prettier/ESLint)

---

## 📦 Entregáveis

### Obrigatórios
- [x] `ARQUITETURA.md`
- [ ] Backend funcional
- [ ] Frontend funcional
- [ ] Suite de testes (70%+)
- [ ] `README.md` completo
- [ ] Repositório Git organizado

### Opcionais
- [ ] Dashboard de Performance ⭐
- [ ] Docker setup
- [ ] CI/CD pipeline
- [ ] Deploy em produção

---

## 🔄 Padrão de Commits

```bash
# Features
git commit -m "feat(backend): add intention approval endpoint"
git commit -m "feat(frontend): create admin dashboard"

# Fixes
git commit -m "fix(api): handle token expiration correctly"

# Docs
git commit -m "docs: update README with setup instructions"

# Tests
git commit -m "test(services): add unit tests for IntencaoService"

# Refactor
git commit -m "refactor(components): extract reusable Button component"

# Chore
git commit -m "chore: update dependencies"
```

---

## 🎯 Métricas de Sucesso

- ✅ 100% dos endpoints funcionando
- ✅ 70%+ de cobertura de testes
- ✅ Zero erros de linting
- ✅ Build sem warnings
- ✅ Todas as funcionalidades obrigatórias implementadas
- ✅ 1 módulo opcional implementado
- ✅ Documentação completa

---

## 🚀 Comandos Rápidos

```bash
# Backend
cd backend
npm run dev          # Rodar servidor
npm run test         # Rodar testes
npm run test:watch   # Testes em watch mode
npm run build        # Build de produção

# Frontend
cd frontend
npm run dev          # Rodar Next.js
npm run test         # Rodar testes
npm run build        # Build de produção
npm run lint         # Verificar código

# Database
cd backend
npx prisma migrate dev    # Rodar migrações
npx prisma studio         # Abrir UI do Prisma
npx prisma generate       # Gerar cliente
npx prisma db seed        # Rodar seeds
```

---

**Próximo Passo:** Começar implementação do Dia 1! 🚀

**Status:** 📋 Roadmap criado | Aguardando início da implementação

