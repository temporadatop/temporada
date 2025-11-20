#!/usr/bin/env python3
import json
import random

# Nomes fictícios brasileiros para as chácaras
fictional_names = [
    "Chácara Primavera",
    "Sítio Cantinho do Céu",
    "Rancho Vista Alegre",
    "Chácara Recanto das Águas",
    "Sítio Flor do Campo",
    "Chácara Bela Vista",
    "Rancho Paraíso Verde",
    "Chácara Sonho Meu",
    "Sítio Morada do Sol",
    "Chácara Vale Encantado",
    "Rancho Pedra Alta"
]

# Nomes fictícios de proprietários brasileiros
fictional_owners = [
    {"name": "Maria Silva", "gender": "F"},
    {"name": "João Santos", "gender": "M"},
    {"name": "Ana Paula Costa", "gender": "F"},
    {"name": "Carlos Eduardo Oliveira", "gender": "M"},
    {"name": "Juliana Ferreira", "gender": "F"},
    {"name": "Roberto Almeida", "gender": "M"},
    {"name": "Patricia Rodrigues", "gender": "F"},
    {"name": "Fernando Lima", "gender": "M"},
    {"name": "Camila Martins", "gender": "F"},
    {"name": "Ricardo Pereira", "gender": "M"},
    {"name": "Luciana Souza", "gender": "F"}
]

# Ler dados extraídos
with open('/home/ubuntu/extract_property_data.json', 'r') as f:
    data = json.load(f)

# Criar dados fictícios
fictional_properties = []

for idx, property_data in enumerate(data['results']):
    output = property_data['output']
    
    # Ajustar preço para faixa R$ 300-600
    original_price = output['price_per_night']
    if original_price < 300:
        fictional_price = random.randint(300, 450)
    elif original_price > 600:
        fictional_price = random.randint(450, 600)
    else:
        fictional_price = int(original_price)
    
    # Criar propriedade fictícia
    fictional_prop = {
        "id": idx + 1,
        "fictional_name": fictional_names[idx],
        "original_title": output['title'],
        "original_location": output['location'],
        "description_rewritten": f"Venha conhecer {fictional_names[idx]}! " + output['description'][:200] + "...",  # Será reescrito depois
        "guests": output['guests'],
        "bedrooms": output['bedrooms'],
        "beds": output['beds'],
        "bathrooms": output['bathrooms'],
        "price_per_night": fictional_price,
        "amenities": output['amenities'],
        "owner": fictional_owners[idx],
        "original_rating": output['rating'],
        "fictional_rating": round(random.uniform(4.7, 5.0), 1),
        "fictional_reviews_count": random.randint(15, 85),
        "photo_urls": output['photo_urls'].split(',')[:5],  # Primeiras 5 fotos
        "available_all_dates": True
    }
    
    fictional_properties.append(fictional_prop)

# Salvar dados fictícios
output_file = '/home/ubuntu/temporadatop/data/fictional_properties.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(fictional_properties, f, indent=2, ensure_ascii=False)

print(f"✅ {len(fictional_properties)} propriedades fictícias criadas!")
print(f"📁 Salvo em: {output_file}")

# Mostrar resumo
print("\n=== RESUMO DAS PROPRIEDADES ===\n")
for prop in fictional_properties:
    print(f"{prop['id']:2d}. {prop['fictional_name']}")
    print(f"    Proprietário: {prop['owner']['name']}")
    print(f"    Capacidade: {prop['guests']} hóspedes | {prop['bedrooms']} quartos")
    print(f"    Preço: R$ {prop['price_per_night']}/noite")
    print(f"    Avaliação: {prop['fictional_rating']} ⭐ ({prop['fictional_reviews_count']} avaliações)")
    print()
