#!/bin/bash
# Script para fazer commit dos 7 primeiros imóveis adicionados

cd /home/ubuntu/temporada

echo "Adicionando arquivos ao git..."
git add -A

echo "Fazendo commit..."
git commit -m "feat: adicionar 7 novos imóveis de Fernando de Noronha

- ID 13: Casa do maneco (R$ 350/noite)
- ID 14: Corrente Marítima (R$ 220/noite)
- ID 15: Pousada do Nativo (R$ 480/noite)
- ID 16: Chalé dos Sonhos em Noronha (R$ 435/noite)
- ID 17: Casa da Neide - Suíte Aconchegante (R$ 390/noite)
- ID 18: Casa Brisa - Brisa da Manhã (R$ 290/noite)
- ID 19: Canto das Aves 2 (R$ 510/noite)

Total: 7 imóveis adicionados
Cidade: Fernando de Noronha, PE
Fotos: 4 por imóvel (28 fotos no total)
Padrão mantido: descrições completas, comodidades, avaliações"

echo "Fazendo push..."
git push origin main

echo "✅ Commit e push concluídos!"
