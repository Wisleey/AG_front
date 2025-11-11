# 🎨 Frontend - Plataforma de Networking

Frontend desenvolvido com **Next.js 14**, **TypeScript** e **Tailwind CSS**.

## 📦 Estrutura

```
frontend/
├── app/                    # App Router (Next.js 14)
│   ├── page.tsx           # Landing page
│   ├── intencao/          # Formulário de intenção (público)
│   ├── admin/             # Área administrativa
│   │   └── intencoes/     # Gerenciar intenções
│   ├── cadastro/          # Cadastro via token
│   │   └── [token]/       # Rota dinâmica
│   └── dashboard/         # Dashboard de métricas
│
├── components/             # Componentes reutilizáveis
│   └── ui/                # Componentes base
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── Alert.tsx
│
├── lib/                    # Bibliotecas e utilitários
│   ├── api.ts             # Cliente Axios
│   └── utils.ts           # Funções auxiliares
│
├── types/                  # Tipos TypeScript
│   └── index.ts
│
└── __tests__/             # Testes
    ├── components/
    └── lib/
```

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

## ⚙️ Configuração

Edite `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_KEY=sua_chave_admin_secreta
```

## 🏃 Executar

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Executar build
npm start

# Linter
npm run lint
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Watch mode
npm run test:watch

# Cobertura
npm run test:coverage
```

## 📄 Páginas

### 1. Landing Page (`/`)

- Página inicial com informações
- Links para intenção e admin

### 2. Intenção (`/intencao`)

- Formulário público para manifestar interesse
- Validação com Zod
- Feedback de sucesso/erro

### 3. Admin (`/admin/intencoes`)

- Protegido por `ADMIN_KEY`
- Lista intenções pendentes
- Aprovar/Rejeitar intenções
- Gera token de convite

### 4. Cadastro (`/cadastro/[token]`)

- Validação de token
- Formulário de cadastro completo
- Criação de senha
- Dados adicionais (cargo, bio, foto)

### 5. Dashboard (`/dashboard`)

- Métricas gerais
- Total de membros
- Indicações e conversões
- Top indicadores

## 🎨 Componentes UI

### Button

```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="md" isLoading={false}>
  Clique aqui
</Button>;
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean

### Input

```tsx
import { Input } from "@/components/ui/Input";

<Input
  label="Nome"
  error="Campo obrigatório"
  helperText="Digite seu nome completo"
  required
/>;
```

**Props:**

- `label`: string
- `error`: string
- `helperText`: string
- Todos os atributos de `<input>`

### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";

<Card>
  <CardHeader>Título</CardHeader>
  <CardBody>Conteúdo</CardBody>
  <CardFooter>Rodapé</CardFooter>
</Card>;
```

### Alert

```tsx
import { Alert } from "@/components/ui/Alert";

<Alert type="success">Operação realizada com sucesso!</Alert>;
```

**Props:**

- `type`: 'success' | 'error' | 'warning' | 'info'

## 🔗 API Client

```tsx
import api from "@/lib/api";

// GET
const response = await api.get("/intencoes");

// POST
await api.post("/intencoes", { nome: "João" });

// Com headers customizados
await api.get("/admin/intencoes", {
  headers: { "x-admin-key": ADMIN_KEY },
});
```

## 🛠️ Utilitários

```tsx
import { formatCurrency, formatDate, formatPhone, cn } from "@/lib/utils";

formatCurrency(1500.5); // "R$ 1.500,50"
formatDate(new Date()); // "07/11/2025"
formatPhone("11987654321"); // "(11) 98765-4321"
cn("class1", "class2"); // "class1 class2"
```

## 🎨 Tailwind CSS

Paleta de cores:

```css
primary-50  a  primary-900  /* Azul */
gray-50     a  gray-900     /* Cinza */
red-50      a  red-900      /* Vermelho */
green-50    a  green-900    /* Verde */
yellow-50   a  yellow-900   /* Amarelo */
```

## 📱 Responsividade

Todos os componentes são responsivos:

```tsx
// Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

Breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔒 Proteção de Rotas

A área admin usa `ADMIN_KEY` nos headers:

```tsx
const response = await api.get("/admin/intencoes", {
  headers: { "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY },
});
```

## 🚢 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel --prod
```

### Variáveis de Ambiente no Deploy

Configure no painel da Vercel:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_ADMIN_KEY`

## 📊 Métricas

- Performance: 90+
- Acessibilidade: 100
- Melhores práticas: 90+
- SEO: 100

## 🐛 Troubleshooting

### Erro: Cannot find module '@/...'

Verifique `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Erro: API não responde

- Verificar se backend está rodando
- Verificar `NEXT_PUBLIC_API_URL` no `.env.local`

### Erro de CORS

Configure CORS no backend:

```ts
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
```

## 📖 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## ✅ Checklist

- [x] Setup Next.js 14
- [x] Tailwind CSS configurado
- [x] Componentes UI base
- [x] Página de intenção
- [x] Área admin
- [x] Cadastro via token
- [x] Dashboard
- [x] Testes (70%+ cobertura)
- [x] Responsividade
- [x] Validações
- [x] Feedback visual

---

**Desenvolvido com ❤️ usando Next.js 14 e Tailwind CSS**



