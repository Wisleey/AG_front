# 🎨 Design System 2025 - BeautifulRims Inspired

## Visão Geral

Este projeto foi completamente redesenhado seguindo as tendências de design profissional de 2025, inspirado na paleta de cores moderna e vibrante da BeautifulRims.

---

## 🎨 Paleta de Cores

### Cores Principais (Brand)

```css
--brand-500: #FF5722  /* Laranja vibrante - Cor principal */
--brand-600: #f4511e  /* Laranja escuro */
--brand-700: #e64a19  /* Laranja profundo */
```

### Tons Escuros (Dark Mode)

```css
--dark-900: #050505   /* Fundo mais escuro */
--dark-800: #0a0a0a   /* Fundo principal */
--dark-500: #1a1a1a   /* Cards e componentes */
--dark-400: #2a2a2a   /* Elementos interativos */
```

### Tons Neutros

```css
--neutral-300: #d4d4d4  /* Texto secundário claro */
--neutral-400: #a3a3a3  /* Texto terciário */
--neutral-500: #737373  /* Texto desabilitado */
```

---

## 📝 Tipografia

### Fontes

1. **Outfit** - Headings e títulos

   - Moderna, geométrica e profissional
   - Uso: `font-heading`

2. **Inter** - Body text

   - Legível e versátil
   - Uso: `font-body`

3. **Space Grotesk** - Acentos e detalhes
   - Monospace estilizada
   - Uso: `font-accent`

### Tamanhos Fluídos

```css
--space-xs: clamp(0.5rem, 1vw, 0.75rem)
--space-sm: clamp(0.75rem, 1.5vw, 1rem)
--space-md: clamp(1rem, 2vw, 1.5rem)
--space-lg: clamp(1.5rem, 3vw, 2.5rem)
--space-xl: clamp(2rem, 4vw, 4rem)
```

---

## ✨ Animações e Efeitos

### Animações Disponíveis

#### Entrada (Fade)

- `animate-fade-in` - Fade simples
- `animate-fade-in-up` - Fade com movimento para cima
- `animate-fade-in-down` - Fade com movimento para baixo

#### Movimento

- `animate-slide-in-left` - Deslizar da esquerda
- `animate-slide-in-right` - Deslizar da direita
- `animate-scale-in` - Escala com fade

#### Contínuas

- `animate-float` - Flutuação suave (6s)
- `animate-glow` - Brilho pulsante
- `animate-gradient-x` - Gradiente horizontal animado
- `animate-shimmer` - Efeito shimmer/brilho

### Stagger Animation

Classes para animações sequenciais em listas:

```tsx
<div className="stagger-item">Item 1</div>
<div className="stagger-item">Item 2</div>
<div className="stagger-item">Item 3</div>
```

---

## 🧩 Componentes Atualizados

### Button

Variantes disponíveis:

- `primary` - Gradiente laranja (padrão)
- `secondary` - Fundo escuro com borda
- `outline` - Apenas borda laranja
- `ghost` - Transparente
- `danger` - Gradiente vermelho
- `gradient` - Gradiente animado

```tsx
<Button variant="primary" size="lg">
  Clique Aqui
</Button>
```

### Card

Variantes disponíveis:

- `default` - Card escuro padrão
- `gradient` - Com borda gradiente
- `glass` - Efeito glassmorphism

```tsx
<Card variant="gradient" hover={true}>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardBody>Conteúdo</CardBody>
</Card>
```

### Navbar

- Glassmorphism ao fazer scroll
- Animação suave de menu mobile
- Logo com efeito glow
- Estados ativos com gradiente

---

## 🎭 Efeitos Especiais

### Glassmorphism

```tsx
<div className="glass">Conteúdo com efeito vidro</div>
```

### Gradient Text

```tsx
<h1 className="text-gradient">Texto com gradiente animado</h1>
```

### Gradient Border

```tsx
<div className="gradient-border p-8">Elemento com borda gradiente</div>
```

### Hover Glow

```tsx
<div className="hover-glow">Elemento com brilho ao passar mouse</div>
```

---

## 🎯 Metodologia de Design 2025

### Princípios Aplicados

1. **Dark Mode First**

   - Interface escura como padrão
   - Melhor para os olhos e moderno

2. **Glassmorphism**

   - Efeitos de vidro fosco
   - Backgrounds com blur

3. **Micro-interações**

   - Hover effects suaves
   - Transições em 300ms
   - Scale transforms (1.05x)

4. **Gradient Animations**

   - Gradientes animados
   - Background animados
   - Borders com movimento

5. **Espaçamento Generoso**

   - Uso de clamp() para responsividade
   - Padding e margin consistentes
   - Hierarquia visual clara

6. **Tipografia Fluída**
   - Tamanhos adaptáveis
   - Fontes variáveis
   - Contraste adequado

---

## 📱 Responsividade

### Breakpoints Tailwind

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

### Mobile First

Todos os componentes foram pensados mobile-first com adaptações progressivas para telas maiores.

---

## ♿ Acessibilidade

### Implementado

- `prefers-reduced-motion` - Respeita preferência do usuário
- Contraste adequado (WCAG AA)
- Focus states visíveis
- Aria labels em elementos interativos
- Semântica HTML correta

---

## 🚀 Performance

### Otimizações

- Fontes com `display: swap`
- Animações com GPU (transform/opacity)
- Scroll behavior suavizado
- Transições eficientes

---

## 🎨 Background Animado

O body possui um background com gradientes animados que criam profundidade e movimento sutil:

```css
body::before {
  /* Gradientes radiais animados */
  animation: gradientXY 15s ease infinite;
}
```

---

## 💡 Como Usar

### Aplicar animação em elemento

```tsx
<div className="animate-fade-in-up">Aparece com fade e movimento</div>
```

### Adicionar delay

```tsx
<div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
  Aparece 200ms depois
</div>
```

### Combinar efeitos

```tsx
<div className="glass hover-glow animate-scale-in">Vidro + brilho + escala</div>
```

---

## 🎓 Referências

### Inspirações

- BeautifulRims Design
- Vercel Design System
- Linear App
- Stripe UI
- Apple Human Interface Guidelines 2025

### Tecnologias

- Next.js 14
- Tailwind CSS 3.x
- Google Fonts (Outfit, Inter, Space Grotesk)
- CSS Custom Properties
- CSS Animations & Keyframes

---

## 📝 Notas Finais

Este design system foi criado para ser:

- ✅ Moderno e profissional
- ✅ Altamente performático
- ✅ Acessível
- ✅ Responsivo
- ✅ Fácil de manter
- ✅ Escalável
