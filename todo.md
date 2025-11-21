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


## 🔄 NOVA ABORDAGEM - Sistema sem Banco de Dados (localStorage)

- [x] Criar arquivo JSON com dados das 11 chácaras (fixo no código)
- [x] Implementar autenticação com localStorage (cadastro/login/logout)
- [x] Criar página /properties com listagem das 11 chácaras
- [x] Criar 11 páginas individuais /property/[id]
- [x] Implementar sistema de reservas com localStorage
- [x] Criar interface de pagamento (preparada para integração futura REAL)
- [x] Criar painel "Minhas Reservas"
- [x] Testar fluxo completo de usuário
- [x] Salvar checkpoint final


## 🔄 Ajustes Finais Deploy

- [ ] Fazer push do código atualizado para GitHub
- [ ] Fazer deploy no Render com commit correto
- [ ] Redirecionar automaticamente para /properties após login/cadastro
- [ ] Testar fluxo completo no Render


## 🎯 Simplificação UX - Foco em Aluguel

- [x] Desativar botão "Cadastrar Imóvel" na landing page
- [x] Manter apenas botão "Alugar" funcionando
- [x] Redirecionar automaticamente para /properties após login/cadastro
- [x] Testar fluxo completo: cadastro → login → /properties
- [ ] Fazer push para GitHub
- [ ] Deploy no Render


## 🎯 Ajuste Final do Fluxo UX

- [x] Todos os botões da landing page devem redirecionar para /login
- [x] Após login/cadastro bem-sucedido → redirecionar para /properties
- [x] Usuário só vê as chácaras disponíveis após fazer login/cadastro


## 🐛 Correções Solicitadas

- [x] Corrigir geolocalização na página /properties (não estava detectando cidade do usuário)
- [x] Verificar se hook useGeolocation está funcionando corretamente
- [x] Testar detecção de IP e exibição da cidade

-- [x] Verificar quais chácaras estão sem fotos
- [x] Adicionar fotos reais para todas as 11 chácaras
- [x] Testar exibição das fotos na página /properties
- [x] Mudar lógica de pagamento: remover depósito de 10%
- [x] Implementar taxa única de reserva de R$ 79,90
- [x] Atualizar textos explicando que a taxa é devolvida no dia da reserva
- [x] Ajustar cálculos na página de pagamento
- [ ] Testar fluxo completo de reserva com nova taxa

- [x] Atualizar capacidade de todas as chácaras para 20 hóspedes
- [x] Ajustar preços das diárias para R$ 300 a R$ 400
- [ ] Testar exibição da nova capacidade e preços


## 🎁 Sistema de Cupom de Desconto

- [x] Criar modal de boas-vindas com cupom #temporadatop (50% desconto)
- [x] Implementar lógica de validação: apenas primeiro aluguel
- [x] Aplicar cupom automaticamente na reserva
- [x] Calcular desconto de 50% no valor total dos dias
- [x] Exibir valor original e valor com desconto
- [x] Salvar informação de cupom usado no localStorage
- [ ] Testar fluxo completo: login → modal → reserva com desconto

- [x] Mostrar valor original riscado em vermelho quando cupom está ativo
- [x] Exibir valor com desconto em destaque abaixo do valor original
- [x] Melhorar visualização do desconto na página de reserva


## 🐛 Erro 502 no Render

- [ ] Verificar configuração de porta no servidor
- [ ] Verificar variáveis de ambiente necessárias
- [ ] Verificar se o build está funcionando corretamente
- [ ] Testar deploy local antes de fazer push

- [x] Remover botões "Dashboard" e "Imóveis" do header da landing page
- [x] Manter apenas logo, "Entrar" e "Cadastrar"


## 🎨 Melhorias na Página de Reserva

- [x] Adicionar texto em verde forte abaixo do valor com desconto: "O valor das estadias você SÓ PAGA quando entrar no IMÓVEL!!!"
- [x] Atualizar texto da taxa de reserva para "R$ 79,90 (Único valor a pagar no momento)"
- [x] Adicionar explicação: "Este é o único valor a pagar para garantir a sua reserva"
- [x] Mudar botão "Reservar" para "Reservar por apenas R$ 79,90"


## 🌍 Chácaras Dinâmicas com Geolocalização

- [x] Receber 7 chácaras com fotos e descrições do usuário
  - Chácara do Diego (6 fotos)
  - Chácara da Ana (5 fotos)
  - Cantinho Céu Azul (1 foto)
  - Chácara da Vovó Mafalda (3 fotos)
  - Espaço Familiar da Bianca (0 fotos)
  - Recanto do Amor (1 foto)
  - Chalé das Flores (1 foto)
- [x] Criar sistema de chácaras dinâmicas que mudam cidade baseado no IP
- [x] Adicionar badge "Chácara até 10km de você" (não clicável) na primeira foto
- [x] Ordenar listagem: chácaras dinâmicas aparecem no TOPO
- [x] Testar com diferentes IPs/localizações (Campinas, Rio Pardo, etc.)
- [ ] Garantir que cidade muda automaticamente


## 🐛 Correções Urgentes

- [x] Corrigir página "Imóvel não encontrado" ao clicar em chácaras dinâmicas
- [x] Fazer página de detalhes suportar IDs dinâmicos (1000+)
- [x] Investigar API de geolocalização mostrando "São Paulo" ao invés de "Campinas"
- [x] Adicionar logs de debug para geolocalização
- [x] Testar página de detalhes com chácaras dinâmicas


## 🌍 Melhorar Precisão da Geolocalização

- [x] Pesquisar APIs de geolocalização mais precisas que ipapi.co
- [x] Testar APIs alternativas: ip-api.com, ipgeolocation.io, ipinfo.io
- [x] Implementar API mais precisa que detecte cidade real (Campinas, São José do Rio Pardo)
- [ ] Testar com IPs de diferentes cidades do interior paulista
- [ ] Verificar se detecta corretamente em computador e celular


## 🎯 Sistema de Geolocalização por CEP no Cadastro

- [x] Adicionar campos CEP e Cidade no schema do banco de dados (users table)
- [x] Atualizar formulário de cadastro com campo CEP
- [x] Implementar busca automática de cidade por CEP (ViaCEP API gratuita)
- [x] Auto-preencher campo Cidade após digitar CEP
- [x] Salvar CEP e Cidade no banco ao cadastrar usuário
- [x] Usar cidade do usuário logado nas chácaras dinâmicas
- [x] Manter fallback de API de IP para visitantes não logados
- [x] Testar: cadastro com CEP → login → chácaras com cidade correta
- [x] Testar fallback: visitante não logado → usa IP


## 🔄 Sistema Anti-Soneca (Keep-Alive) - Render

- [x] Instalar dependência node-cron
- [x] Criar sistema de self-ping a cada 14 minutos
- [x] Criar endpoint /health para health check
- [x] Criar endpoint /keep-alive com estatísticas
- [x] Criar endpoint /api/stats para monitoramento
- [x] Criar página /monitor com dashboard em tempo real
- [ ] Configurar variável de ambiente RENDER_EXTERNAL_URL
- [x] Testar sistema de keep-alive localmente
- [x] Fazer push para GitHub
- [ ] Testar no Render (verificar logs de self-ping)


## 📱 Otimização Mobile

- [x] Otimizar landing page para mobile (hero, cards, seções)
- [x] Otimizar página de listagem de propriedades para mobile
- [ ] Otimizar página de detalhes da propriedade para mobile
- [x] Otimizar formulários de login/cadastro para mobile
- [ ] Otimizar dashboard de reservas para mobile
- [x] Ajustar tamanhos de fonte para telas pequenas
- [x] Ajustar espaçamentos e padding para mobile
- [x] Testar em diferentes tamanhos de tela (iPhone, Android)
- [ ] Fazer push para GitHub
