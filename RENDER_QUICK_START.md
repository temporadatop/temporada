# ⚡ Render - Configuração Rápida

## 🎯 Passo a Passo Simplificado

### 1. Acesse o Render
👉 https://dashboard.render.com/

### 2. Criar Web Service
1. Clique em **"New +"** → **"Web Service"**
2. Conecte o repositório: **`temporadatop/temporada`**

### 3. Configuração Básica

**Copie e cole exatamente:**

```
Name: temporadatop
Language: Node
Branch: main
Root Directory: (vazio)
Build Command: pnpm install && pnpm db:push && pnpm build
Start Command: pnpm start
Instance Type: Free (ou Starter para produção)
```

### 4. Variáveis de Ambiente Essenciais

Clique em **"Add Environment Variable"** e adicione estas 3 obrigatórias:

#### 1️⃣ DATABASE_URL
```
Você precisa de um banco MySQL. Opções:

A) PlanetScale (Recomendado):
   - Acesse: https://planetscale.com
   - Crie database: temporadatop
   - Copie a URL de conexão
   - Formato: mysql://user:pass@host/db?sslaccept=strict

B) Railway:
   - Acesse: https://railway.app
   - Crie MySQL database
   - Copie a URL

C) Render PostgreSQL:
   - No Render: New → PostgreSQL
   - Copie Internal Database URL
```

#### 2️⃣ JWT_SECRET
```
Gere uma chave aleatória segura.
Exemplo: minha-chave-super-secreta-12345-xyz
```

#### 3️⃣ NODE_ENV
```
production
```

### 5. Variáveis Opcionais (mas recomendadas)

```bash
VITE_APP_TITLE=TemporadaTop
VITE_APP_LOGO=/logo.png
```

### 6. Deploy!

1. Clique em **"Deploy Web Service"**
2. Aguarde 5-10 minutos
3. Acesse a URL fornecida (ex: `https://temporadatop.onrender.com`)

## ✅ Checklist Rápido

- [ ] Conta no Render criada
- [ ] Banco de dados MySQL configurado (PlanetScale/Railway)
- [ ] DATABASE_URL copiada
- [ ] Web Service criado no Render
- [ ] 3 variáveis obrigatórias adicionadas
- [ ] Deploy iniciado
- [ ] Site acessível na URL do Render

## 🚨 Problemas Comuns

**Build falhou?**
- Verifique se DATABASE_URL está correto
- Confirme que escolheu "Node" como linguagem

**Site não abre?**
- Plano Free demora ~30s na primeira requisição
- Verifique logs no Render Dashboard

**Erro de banco de dados?**
- Confirme que o banco está ativo
- Para PlanetScale, inclua `?sslaccept=strict` na URL

## 📞 Precisa de Ajuda Detalhada?

Veja o guia completo: **DEPLOY_RENDER.md**

---

**Tempo estimado: 15 minutos** ⏱️
