# 🚀 Guia de Inicialização - Frontend

## ⚡ Configuração Rápida

### 1️⃣ Criar arquivo de variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto frontend com o seguinte conteúdo:

```env
# API Backend URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Admin Key para requisições administrativas
NEXT_PUBLIC_ADMIN_KEY=Admin@adminkey2025
```

**Ou copie o arquivo de exemplo:**

```powershell
Copy-Item .env.local.example .env.local
```

---

### 2️⃣ Instalar dependências (se ainda não instalou)

```powershell
npm install
```

---

### 3️⃣ Iniciar o servidor de desenvolvimento

```powershell
npm run dev
```

O frontend será iniciado em: **http://localhost:3000**

---

## 📋 Checklist Antes de Iniciar

Certifique-se de que:

- ✅ Backend está rodando na porta **3001** (`npm run dev` na pasta backend)
- ✅ PostgreSQL está rodando
- ✅ Arquivo `.env.local` foi criado no frontend
- ✅ CORS está configurado no backend para aceitar `http://localhost:3000`

---

## 🌐 Páginas Disponíveis

Após iniciar o frontend, você pode acessar:

### 📍 Páginas Públicas

- **Home/Landing**: http://localhost:3000
- **Formulário de Intenção**: http://localhost:3000/intencao
- **Cadastro com Token**: http://localhost:3000/cadastro/[TOKEN]

### 🔐 Páginas Administrativas

- **Admin - Listar Intenções**: http://localhost:3000/admin/intencoes
- **Dashboard**: http://localhost:3000/dashboard

---

## 🧪 Testar o Frontend

### Teste 1: Criar Intenção

1. Acesse: http://localhost:3000/intencao
2. Preencha o formulário
3. Envie
4. Deve ver mensagem de sucesso

### Teste 2: Admin - Aprovar Intenção

1. Acesse: http://localhost:3000/admin/intencoes
2. Veja a lista de intenções
3. Aprove uma intenção
4. Copie o token de convite gerado

### Teste 3: Cadastro de Membro

1. Acesse: http://localhost:3000/cadastro/[TOKEN_COPIADO]
2. Preencha o formulário de cadastro
3. Envie
4. Deve criar o membro com sucesso

---

## 🐛 Solução de Problemas

### Erro: "CORS policy"

**Solução:** Verifique se o backend está rodando e se a variável `FRONTEND_URL` no `.env` do backend está como `http://localhost:3000`

### Erro: "Network Error" ou "ERR_CONNECTION_REFUSED"

**Solução:** O backend não está rodando. Execute `npm run dev` na pasta backend.

### Erro: "Cannot find module"

**Solução:** Execute `npm install` novamente.

### Página em branco

**Solução:**

1. Verifique o console do navegador (F12)
2. Limpe o cache do Next.js:

```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 🎨 Estrutura do Projeto

```
frontend/
├── app/                    # Páginas (App Router do Next.js)
│   ├── page.tsx           # Home/Landing page
│   ├── intencao/          # Formulário de intenção
│   ├── cadastro/[token]/  # Cadastro de membro
│   ├── admin/             # Páginas administrativas
│   └── dashboard/         # Dashboard
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e configurações
│   ├── api.ts            # Cliente Axios configurado
│   └── utils.ts          # Funções auxiliares
├── types/                # Tipos TypeScript
└── .env.local           # Variáveis de ambiente (criar)
```

---

## 📦 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **Zustand** - Gerenciamento de estado

---

## 🚀 Próximos Passos

1. **Iniciar o frontend**: `npm run dev`
2. **Testar as páginas** conforme descrito acima
3. **Abrir o DevTools** (F12) para monitorar requisições
4. **Verificar o Prisma Studio** para ver os dados sendo criados

---

## 📝 Comandos Úteis

```powershell
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Linting
npm run lint

# Testes
npm run test
npm run test:watch
npm run test:coverage
```

---

**Tudo pronto! Execute `npm run dev` e acesse http://localhost:3000** 🎉
