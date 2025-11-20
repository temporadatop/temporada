#!/usr/bin/env python3
import json
import requests
import os

# Ler propriedades fictícias
with open('/home/ubuntu/temporadatop/data/fictional_properties.json', 'r') as f:
    properties = json.load(f)

# Configurar API LLM (Manus built-in)
API_URL = os.getenv('BUILT_IN_FORGE_API_URL', 'https://api.manus.im') + '/llm/v1/chat/completions'
API_KEY = os.getenv('BUILT_IN_FORGE_API_KEY', '')

def rewrite_description(prop):
    """Reescrever descrição usando LLM"""
    
    prompt = f"""Você é um copywriter especializado em plataformas de aluguel por temporada no Brasil.

Reescreva a descrição desta propriedade de forma COMPLETAMENTE ORIGINAL e profissional:

**Nome**: {prop['fictional_name']}
**Capacidade**: {prop['guests']} hóspedes, {prop['bedrooms']} quartos, {prop['beds']} camas, {prop['bathrooms']} banheiros
**Comodidades principais**: {', '.join(prop['amenities'].split(',')[:10])}
**Descrição original** (apenas para referência, NÃO copie): {prop['description_rewritten'][:300]}

**Instruções**:
1. Escreva 3-4 parágrafos (150-250 palavras)
2. Tom acolhedor, profissional e persuasivo
3. Destaque: natureza, piscina, churrasqueira, descanso em família
4. Use o nome "{prop['fictional_name']}" na introdução
5. Seja 100% original - não copie a descrição de referência
6. Estilo brasileiro, familiar e convidativo

Retorne APENAS a nova descrição, sem títulos ou formatação extra."""

    try:
        response = requests.post(
            API_URL,
            headers={
                'Authorization': f'Bearer {API_KEY}',
                'Content-Type': 'application/json'
            },
            json={
                'messages': [
                    {'role': 'system', 'content': 'Você é um copywriter especializado em descrições de propriedades para aluguel por temporada.'},
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 0.8
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content'].strip()
        else:
            print(f"Erro API: {response.status_code}")
            return prop['description_rewritten']  # Manter original em caso de erro
            
    except Exception as e:
        print(f"Erro ao reescrever: {e}")
        return prop['description_rewritten']

# Reescrever todas as descrições
print("🔄 Reescrevendo descrições com IA...\n")

for idx, prop in enumerate(properties, 1):
    print(f"{idx}/11 - {prop['fictional_name']}... ", end='', flush=True)
    
    new_description = rewrite_description(prop)
    prop['description_rewritten'] = new_description
    
    print("✓")

# Salvar arquivo atualizado
output_file = '/home/ubuntu/temporadatop/data/fictional_properties_final.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(properties, f, indent=2, ensure_ascii=False)

print(f"\n✅ Descrições reescritas com sucesso!")
print(f"📁 Salvo em: {output_file}")
