# TemporadaTop 🏠

**TemporadaTOP - salvando a sua temporada!!!**

Plataforma moderna de aluguel de chácaras e imóveis para temporada com sistema de reservas, pagamentos e gestão completa.

## 🎨 Identidade Visual

- **Cores principais:** Gradientes vibrantes laranja (#FF7A00) → rosa (#FF2E63) → magenta (#D400FF)
- **Fonte:** Poppins (bold e moderna)
- **Estilo:** Visual premium com sombras suaves

## 🚀 Funcionalidades

### Para Locatários
- ✅ Busca de imóveis por região, capacidade e preço
- ✅ Sistema de reserva com pagamento de apenas 10% do valor total
- ✅ Dashboard de reservas com acompanhamento de status
- ✅ Confirmação de check-in/check-out
- ✅ Sistema de avaliações
- ✅ Devolução automática dos 10% após check-out

### Para Proprietários
- ✅ Taxa única vitalícia de R$ 299,99 para cadastrar imóveis
- ✅ Cadastro ilimitado de imóveis
- ✅ Gerenciamento de calendário e disponibilidade
- ✅ Recebimento de 100% do valor no check-in
- ✅ Sistema de relato de problemas
- ✅ Dashboard de reservas recebidas

## 🛠️ Stack Tecnológica

- **Frontend:** React 19 + Tailwind CSS 4 + Vite
- **Backend:** Node.js + Express + tRPC 11
- **Banco de Dados:** MySQL/TiDB (via Drizzle ORM)
- **Autenticação:** Manus OAuth
- **Tipagem:** TypeScript
- **UI Components:** shadcn/ui

## 📦 Instalação Local

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env

# Aplicar migrations do banco de dados
pnpm db:push

# Iniciar servidor de desenvolvimento
pnpm dev
```

## 🌐 Deploy no Render

### Pré-requisitos
1. Conta no [Render.com](https://render.com)
2. Repositório GitHub configurado
3. Banco de dados MySQL/TiDB configurado

### Passo 1: Configurar Banco de Dados

Se você ainda não tem um banco de dados, crie um no Render ou use um serviço externo como:
- PlanetScale
- Railway
- Supabase

Anote a **DATABASE_URL** de conexão.

### Passo 2: Deploy do Backend + Frontend (Web Service)

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub: `temporadatop/temporada`
4. Configure o serviço:

**Configurações Básicas:**
- **Name:** `temporadatop`
- **Language:** `Node`
- **Branch:** `main`
- **Region:** `Oregon (US West)` ou sua preferência
- **Root Directory:** (deixe em branco)

**Build & Start:**
- **Build Command:** 
  ```bash
  pnpm install && pnpm db:push && pnpm build
  ```
- **Start Command:** 
  ```bash
  pnpm start
  ```

**Instance Type:**
- Para testes: **Free** ($0/mês)
- Para produção: **Starter** ($7/mês) ou superior

### Passo 3: Configurar Variáveis de Ambiente

Clique em **"Add Environment Variable"** e adicione:

#### Variáveis Obrigatórias:

```bash
# Banco de Dados
DATABASE_URL=mysql://user:password@host:port/database

# JWT Secret (gere uma chave aleatória segura)
JWT_SECRET=sua-chave-secreta-super-segura-aqui

# Manus OAuth (fornecidas pela plataforma Manus)
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=seu-app-id
OWNER_OPEN_ID=seu-owner-open-id
OWNER_NAME=Seu Nome

# App Config
VITE_APP_TITLE=TemporadaTop
VITE_APP_LOGO=/logo.png

# Manus Built-in APIs
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=sua-chave-api
VITE_FRONTEND_FORGE_API_KEY=sua-chave-frontend
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im

# Analytics (opcional)
VITE_ANALYTICS_ENDPOINT=seu-endpoint
VITE_ANALYTICS_WEBSITE_ID=seu-website-id

# Node Environment
NODE_ENV=production
```

### Passo 4: Configurações Avançadas (Opcional)

**Health Check Path:**
```
/api/health
```

**Auto-Deploy:**
- ✅ Mantenha habilitado para deploy automático a cada push no GitHub

### Passo 5: Deploy

1. Clique em **"Deploy Web Service"**
2. Aguarde o build completar (5-10 minutos na primeira vez)
3. Seu app estará disponível em: `https://temporadatop.onrender.com`

## 🔄 Atualizações Contínuas

Após o deploy inicial, qualquer push para o branch `main` no GitHub irá:
1. Automaticamente fazer rebuild da aplicação
2. Executar migrations do banco de dados (`pnpm db:push`)
3. Fazer deploy da nova versão

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Build de produção
pnpm start            # Inicia servidor de produção

# Banco de Dados
pnpm db:push          # Aplica schema ao banco de dados
pnpm db:studio        # Abre interface visual do banco

# Testes
pnpm test             # Executa testes
```

## 🗄️ Estrutura do Banco de Dados

- **users** - Usuários (locatários e proprietários)
- **properties** - Imóveis cadastrados
- **bookings** - Reservas
- **payments** - Pagamentos
- **reviews** - Avaliações
- **availability** - Calendário de disponibilidade
- **notifications** - Notificações

## 🔐 Segurança

- Autenticação via OAuth
- Senhas nunca armazenadas (delegadas ao OAuth)
- Validação de dados com Zod
- Proteção contra SQL Injection (ORM)
- HTTPS obrigatório em produção

## 📞 Suporte

Para dúvidas ou problemas:
- GitHub Issues: https://github.com/temporadatop/temporada/issues
- Email: temporadatop@gmail.com

## 📄 Licença

Todos os direitos reservados © 2025 TemporadaTop

---

**Desenvolvido com ❤️ usando Manus AI**
