# TemporadaTop - TODO

## 🎨 Identidade Visual
- [x] Configurar cores vibrantes (laranja #FF7A00, rosa #FF2E63, magenta #D400FF)
- [x] Implementar gradientes laranja → rosa → magenta
- [x] Integrar logo 3D no projeto
- [x] Configurar fontes bold e modernas
- [x] Aplicar sombras suaves e visual premium

## 🗄️ Banco de Dados
- [x] Schema de usuários (locatários e proprietários)
- [x] Schema de imóveis (chácaras/casas)
- [x] Schema de reservas
- [x] Schema de pagamentos
- [x] Schema de avaliações
- [x] Schema de calendário de disponibilidade

## 🔧 Backend (tRPC Routers)
- [x] Router de autenticação
- [x] Router de imóveis (CRUD completo)
- [x] Router de reservas
- [x] Router de pagamentos (taxa de R$ 299,99 e 10%)
- [x] Router de calendário
- [x] Router de avaliações
- [x] Router de notificações
- [x] Router de check-in/check-out

## 🎨 Frontend - Landing Page
- [x] Hero section com gradientes vibrantes
- [x] Dois botões principais (Alugar / Cadastrar imóvel)
- [x] Seção "Como funciona"
- [x] Benefícios para locatários
- [x] Benefícios para proprietários
- [ ] Depoimentos (opcional)
- [ ] FAQs (opcional)
- [x] Rodapé com políticas e termos

## 👤 Área do Locatário
- [x] Página de busca de imóveis
- [x] Filtros (região, capacidade, comodidades, preço)
- [x] Visualização de imóveis com fotos
- [x] Calendário de disponibilidade
- [x] Sistema de reserva com pagamento de 10%
- [x] Dashboard de reservas
- [x] Acompanhamento de status (pendente, pago, check-in, check-out)
- [x] Sistema de avaliações
- [x] Histórico de reservas
- [x] Confirmação de check-in/check-out

## 🏠 Área do Proprietário
- [x] Fluxo de cadastro com pagamento de R$ 299,99
- [x] Cadastro de imóveis (fotos, descrição, regras, comodidades)
- [x] Gerenciamento de calendário
- [x] Dashboard de reservas recebidas
- [x] Sistema de notificações
- [x] Recebimento de pagamento total no check-in
- [x] Confirmação de check-in/check-out
- [x] Sistema de relato de problemas
- [x] Suspensão de devolução dos 10%
- [x] Edição de dados do imóvel

## 💳 Sistema de Pagamentos
- [ ] Integração com gateway de pagamento
- [ ] Pagamento de taxa única de R$ 299,99 (proprietário)
- [ ] Pagamento de 10% para reserva (locatário)
- [ ] Retenção dos 10% até check-out
- [ ] Devolução automática dos 10% após check-out
- [ ] Pagamento total da estadia no check-in
- [ ] Sistema de cancelamentos
- [ ] Penalidades

## 📋 Regras de Negócio
- [ ] Validação de cadastro de imóvel após pagamento
- [ ] Validação de reserva após pagamento de 10%
- [ ] Liberação de endereço completo após reserva paga
- [ ] Sistema de cancelamento (locatário/proprietário)
- [ ] Bloqueio automático de datas após reserva
- [ ] Sistema de mediação de problemas

## 🔔 Funcionalidades Gerais
- [ ] Sistema de notificações push
- [ ] Sistema de notificações por e-mail
- [ ] Chat interno (opcional)
- [ ] Dashboard administrativo
- [ ] Relatórios financeiros
- [ ] Sistema de revisões
- [ ] Suporte e mediação

## 🧪 Testes
- [ ] Testes de autenticação
- [ ] Testes de CRUD de imóveis
- [ ] Testes de reservas
- [ ] Testes de pagamentos
- [ ] Testes de calendário

## 🚀 Deploy
- [ ] Configurar repositório GitHub
- [ ] Documentação de setup
- [ ] Configuração para Render (backend)
- [ ] Configuração para Render (frontend)
- [ ] Variáveis de ambiente
- [ ] README completo

## 🎯 Branding
- [x] Integrar slogan "TemporadaTOP - salvando a sua temporada!!!" em toda interface

## 🔄 GitHub & Deploy
- [x] Configurar repositório GitHub
- [x] Fazer push inicial do código
- [ ] Configurar Render para backend
- [ ] Configurar Render para frontend
- [x] Documentar variáveis de ambiente

## 🔄 Conversão PostgreSQL
- [x] Converter schema de MySQL para PostgreSQL
- [x] Atualizar drizzle.config.ts para PostgreSQL
- [x] Atualizar server/db.ts para PostgreSQL
- [x] Fazer push para GitHub

## 🔧 Correção Deploy Render
- [x] Alterar comando db:push para usar apenas drizzle-kit push
- [x] Fazer push para GitHub

## 🎨 Melhorias Landing Page
- [x] Adicionar logo acima do slogan
- [x] Diminuir tamanho do slogan
- [x] Remover menções aos 10% e R$ 299,99
- [x] Focar em benefícios sem falar de valores
- [x] Fazer push para GitHub

## 🎨 Ajuste Visual Slogan
- [x] Separar título e slogan em duas linhas
- [x] Fazer push para GitHub

## 📸 Seção de Fotos de Chácaras
- [x] Copiar imagens para client/public
- [x] Adicionar seção com 3 fotos entre Hero e Como Funciona
- [x] Criar badges "Disponível para Natal/Réveillon/Carnaval"
- [x] Fazer push para GitHub

## 🎨 Ajuste Logo Hero
- [x] Remover logo grande do Hero section
- [x] Fazer push para GitHub

## 🎨 Ajuste Altura Hero
- [x] Reduzir padding vertical do Hero section
- [x] Fazer push para GitHub

## 🌍 Geolocalização por IP
- [x] Criar hook useGeolocation para detectar cidade do visitante
- [x] Integrar API de geolocalização gratuita
- [x] Atualizar título "Imóveis em Destaque" com cidade dinâmica
- [x] Fazer push para GitHub


## 📊 Extração de Dados - 11 Chácaras Reais
- [x] Extrair dados de 11 chácaras do Airbnb
- [x] Criar nomes fictícios brasileiros
- [x] Reescrever descrições profissionalmente (100% originais)
- [x] Baixar 32 fotos das chácaras
- [x] Copiar fotos para /client/public/properties/
- [x] Criar script de seed (/server/seed-properties.ts)
- [ ] Popular banco de dados PostgreSQL com as 11 chácaras
- [ ] Adicionar coordenadas (latitude/longitude) para cada propriedade
- [ ] Implementar ordenação por proximidade do usuário

## 📁 Arquivos de Dados
- `/home/ubuntu/temporadatop/data/properties_final_with_descriptions.json` - Dados finais das 11 chácaras
- `/home/ubuntu/temporadatop/data/chacaras-fotos/` - Fotos originais (32 fotos)
- `/home/ubuntu/temporadatop/client/public/properties/` - Fotos no projeto (48 arquivos)
- `/home/ubuntu/temporadatop/server/seed-properties.ts` - Script de seed pronto
- `/home/ubuntu/temporadatop/data/RESUMO_EXTRACAO.md` - Resumo completo

## 📊 Estatísticas das 11 Chácaras

| ID | Nome | Cidade | Capacidade | Preço/Noite |
|----|------|--------|------------|-------------|
| 1 | Chácara Primavera | Atibaia, SP | 6 | R$ 425 |
| 2 | Sítio Cantinho do Céu | Nazaré Paulista, SP | 5 | R$ 335 |
| 3 | Rancho Vista Alegre | Mogi das Cruzes, SP | 12 | R$ 496 |
| 4 | Chácara Recanto das Águas | São Paulo, SP | 6 | R$ 591 |
| 5 | Sítio Flor do Campo | Ibiúna, SP | 9 | R$ 494 |
| 6 | Chácara Bela Vista | Mairiporã, SP | 6 | R$ 445 |
| 7 | Rancho Paraíso Verde | Guararema, SP | 13 | R$ 535 |
| 8 | Chácara Sonho Meu | Ribeirão Pires, SP | 16 | R$ 552 |
| 9 | Sítio Morada do Sol | Extrema, MG | 2 | R$ 463 |
| 10 | Chácara Vale Encantado | Atibaia, SP | 15 | R$ 457 |
| 11 | Rancho Pedra Alta | São Bento do Sapucaí, SP | 2 | R$ 481 |

**Total**: 11 propriedades | 32 fotos | Preço médio: R$ 470/noite
