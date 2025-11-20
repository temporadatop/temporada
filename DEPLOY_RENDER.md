# 🚀 Guia Completo de Deploy no Render

Este guia vai te ajudar a fazer o deploy da plataforma TemporadaTop no Render passo a passo.

## 📋 Pré-requisitos

- [x] Conta no GitHub
- [x] Repositório `temporadatop/temporada` criado
- [ ] Conta no [Render.com](https://render.com) (gratuita)
- [ ] Banco de dados MySQL configurado (veja opções abaixo)

## 🗄️ Opção 1: Configurar Banco de Dados

Escolha uma das opções:

### A) PlanetScale (Recomendado - MySQL Serverless)
1. Acesse https://planetscale.com
2. Crie uma conta gratuita
3. Crie um novo database: `temporadatop`
4. Copie a **DATABASE_URL** de conexão
5. Formato: `mysql://user:password@host/database?sslaccept=strict`

### B) Railway (Simples e Rápido)
1. Acesse https://railway.app
2. Crie um MySQL database
3. Copie a **DATABASE_URL**

### C) Render PostgreSQL (Alternativa)
1. No Render Dashboard → New → PostgreSQL
2. Copie a **Internal Database URL**
3. **Nota:** Você precisará adaptar o código para PostgreSQL

## 🌐 Passo a Passo: Deploy no Render

### 1️⃣ Fazer Push do Código para GitHub

```bash
# No terminal do seu computador ou no sandbox
cd /home/ubuntu/temporadatop

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy inicial TemporadaTop"

# Fazer push para GitHub
git push origin main
```

Se pedir autenticação, use:
- **Username:** `temporadatop`
- **Password:** Seu token de acesso pessoal do GitHub ou senha

### 2️⃣ Criar Web Service no Render

1. Acesse https://dashboard.render.com
2. Clique em **"New +"** no canto superior direito
3. Selecione **"Web Service"**

### 3️⃣ Conectar Repositório GitHub

1. Clique em **"Connect account"** se for a primeira vez
2. Autorize o Render a acessar seu GitHub
3. Procure por: `temporadatop/temporada`
4. Clique em **"Connect"**

### 4️⃣ Configurar o Serviço

Preencha os campos:

**Informações Básicas:**
```
Name: temporadatop
Language: Node
Branch: main
Region: Oregon (US West)
Root Directory: (deixe em branco)
```

**Build & Deploy:**
```
Build Command: pnpm install && pnpm db:push && pnpm build
Start Command: pnpm start
```

**Instance Type:**
- **Free** ($0/mês) - Para testes (spin down após inatividade)
- **Starter** ($7/mês) - Recomendado para produção
- **Standard** ($25/mês) - Para mais tráfego

### 5️⃣ Adicionar Variáveis de Ambiente

Role até **"Environment Variables"** e adicione:

#### Obrigatórias:

```bash
# 1. Banco de Dados
DATABASE_URL
# Cole a URL do seu banco (PlanetScale, Railway, etc)
# Exemplo: mysql://user:pass@host.us-east-1.psdb.cloud/temporadatop?sslaccept=strict

# 2. JWT Secret (gere uma chave aleatória)
JWT_SECRET
# Exemplo: super-secret-key-change-this-in-production-12345

# 3. Node Environment
NODE_ENV
production
```

#### Variáveis Manus (se você tiver conta Manus):

```bash
OAUTH_SERVER_URL
https://api.manus.im

VITE_OAUTH_PORTAL_URL
https://portal.manus.im

VITE_APP_ID
# Seu App ID do Manus

OWNER_OPEN_ID
# Seu Open ID do Manus

OWNER_NAME
# Seu nome

BUILT_IN_FORGE_API_URL
https://forge.manus.im

BUILT_IN_FORGE_API_KEY
# Sua chave API do Manus

VITE_FRONTEND_FORGE_API_KEY
# Sua chave frontend do Manus

VITE_FRONTEND_FORGE_API_URL
https://forge.manus.im
```

#### Opcionais:

```bash
VITE_APP_TITLE
TemporadaTop

VITE_APP_LOGO
/logo.png

VITE_ANALYTICS_ENDPOINT
# Seu endpoint de analytics (se tiver)

VITE_ANALYTICS_WEBSITE_ID
# Seu website ID (se tiver)
```

### 6️⃣ Configurações Avançadas (Opcional)

Role até **"Advanced"**:

**Health Check Path:**
```
/
```

**Auto-Deploy:**
- ✅ Deixe marcado "On Commit" para deploy automático

### 7️⃣ Fazer Deploy

1. Role até o final da página
2. Clique no botão azul **"Deploy Web Service"**
3. Aguarde o build (primeira vez leva ~5-10 minutos)

### 8️⃣ Acompanhar o Deploy

Você verá logs em tempo real:
```
==> Cloning from https://github.com/temporadatop/temporada...
==> Running build command: pnpm install && pnpm db:push && pnpm build
==> Installing dependencies...
==> Applying database migrations...
==> Building application...
==> Build successful!
==> Starting server...
==> Your service is live at https://temporadatop.onrender.com
```

## ✅ Verificar se Funcionou

1. Acesse a URL fornecida pelo Render (ex: `https://temporadatop.onrender.com`)
2. Você deve ver a landing page com os gradientes vibrantes
3. Teste criar uma conta e navegar pela plataforma

## 🔧 Troubleshooting

### Erro: "Build failed"
- Verifique os logs de build
- Confirme que todas as variáveis de ambiente estão corretas
- Verifique se o `DATABASE_URL` está acessível

### Erro: "Application failed to start"
- Verifique os logs de runtime
- Confirme que o `DATABASE_URL` está correto
- Verifique se as migrations rodaram (`pnpm db:push`)

### Erro: "Database connection failed"
- Verifique se o banco de dados está ativo
- Confirme que a URL de conexão está correta
- Para PlanetScale, certifique-se de incluir `?sslaccept=strict`

### Site muito lento ou offline
- Plano Free entra em "sleep" após 15 minutos de inatividade
- Primeira requisição após sleep leva ~30 segundos
- **Solução:** Upgrade para plano Starter ($7/mês)

## 🔄 Fazer Atualizações

Depois do deploy inicial, para atualizar:

```bash
# 1. Faça suas alterações no código
# 2. Commit
git add .
git commit -m "Descrição da alteração"

# 3. Push para GitHub
git push origin main

# 4. Render faz deploy automático! 🎉
```

## 📊 Monitoramento

No Render Dashboard você pode:
- Ver logs em tempo real
- Monitorar uso de CPU e memória
- Ver métricas de requisições
- Configurar alertas

## 💰 Custos Estimados

### Configuração Mínima (Testes):
- **Render Free:** $0/mês
- **PlanetScale Free:** $0/mês
- **Total:** $0/mês

### Configuração Produção:
- **Render Starter:** $7/mês
- **PlanetScale Scaler:** $29/mês
- **Total:** $36/mês

### Configuração Profissional:
- **Render Standard:** $25/mês
- **PlanetScale Scaler Pro:** $39/mês
- **Total:** $64/mês

## 🎯 Próximos Passos

Após o deploy:

1. **Configurar domínio customizado** (ex: temporadatop.com.br)
2. **Configurar SSL/HTTPS** (automático no Render)
3. **Adicionar gateway de pagamento** (Mercado Pago, Stripe)
4. **Configurar backup do banco de dados**
5. **Adicionar monitoramento** (Sentry, LogRocket)

## 📞 Precisa de Ajuda?

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **GitHub Issues:** https://github.com/temporadatop/temporada/issues

---

**Boa sorte com seu deploy! 🚀**
