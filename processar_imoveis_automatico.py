#!/usr/bin/env python3.11
"""
Script automatizado para processar imóveis do Airbnb e adicionar ao TemporadaTOP
Mantém o padrão de qualidade dos imóveis existentes
"""

import json
import re
from typing import Dict, List

# Lista de imóveis organizados por cidade
IMOVEIS = {
    "Fernando de Noronha, PE": [
        {"url": "https://www.airbnb.com.br/rooms/1563053936407183261", "id": 15},
        {"url": "https://www.airbnb.com.br/rooms/6726821", "id": 16},
        {"url": "https://www.airbnb.com.br/rooms/1488631637429045585", "id": 17},
        {"url": "https://www.airbnb.com.br/rooms/1445758584503858096", "id": 18},
        {"url": "https://www.airbnb.com.br/rooms/1340706982222935839", "id": 19},
        {"url": "https://www.airbnb.com.br/rooms/1171878954596908427", "id": 20},
        {"url": "https://www.airbnb.com.br/rooms/1046256147561066215", "id": 21},
    ],
    "Angra dos Reis, RJ": [
        {"url": "https://www.airbnb.com.br/rooms/1435437643432498392", "id": 22},
        {"url": "https://www.airbnb.com.br/rooms/39394342", "id": 23},
        {"url": "https://www.airbnb.com.br/rooms/1377491276961040928", "id": 24},
        {"url": "https://www.airbnb.com.br/rooms/699049611752287367", "id": 25},
        {"url": "https://www.airbnb.com.br/rooms/992067777202109403", "id": 26},
        {"url": "https://www.airbnb.com.br/rooms/45384093", "id": 27},
        {"url": "https://www.airbnb.com.br/rooms/1223890892762180578", "id": 28},
    ],
    "Ubatuba, SP": [
        {"url": "https://www.airbnb.com.br/rooms/1544256213566873984", "id": 29},
        {"url": "https://www.airbnb.com.br/rooms/1378516898582258700", "id": 30},
        {"url": "https://www.airbnb.com.br/rooms/1429044569513559509", "id": 31},
        {"url": "https://www.airbnb.com.br/rooms/51681111", "id": 32},
        {"url": "https://www.airbnb.com.br/rooms/881344247820645225", "id": 33},
        {"url": "https://www.airbnb.com.br/rooms/1317756787125734416", "id": 34},
        {"url": "https://www.airbnb.com.br/rooms/1505930246854870319", "id": 35},
    ],
    "Guarujá, SP": [
        {"url": "https://www.airbnb.com.br/rooms/1057788133789126127", "id": 36},
        {"url": "https://www.airbnb.com.br/rooms/1269731422272294513", "id": 37},
        {"url": "https://www.airbnb.com.br/rooms/1469014938797802147", "id": 38},
        {"url": "https://www.airbnb.com.br/rooms/1328503821823173826", "id": 39},
        {"url": "https://www.airbnb.com.br/rooms/28760168", "id": 40},
        {"url": "https://www.airbnb.com.br/rooms/1308235314227758367", "id": 41},
        {"url": "https://www.airbnb.com.br/rooms/47238637", "id": 42},
        {"url": "https://www.airbnb.com.br/rooms/1360880600672050036", "id": 43},
        {"url": "https://www.airbnb.com.br/rooms/15940503", "id": 44},
        {"url": "https://www.airbnb.com.br/rooms/1442744594698648121", "id": 45},
        {"url": "https://www.airbnb.com.br/rooms/1235703194466924961", "id": 46},
        {"url": "https://www.airbnb.com.br/rooms/1314464900735732476", "id": 47},
        {"url": "https://www.airbnb.com.br/rooms/33688689", "id": 48},
        {"url": "https://www.airbnb.com.br/rooms/1387607189707520556", "id": 49},
        {"url": "https://www.airbnb.com.br/rooms/1420267280749924498", "id": 50},
        {"url": "https://www.airbnb.com.br/rooms/22569928", "id": 51},
        {"url": "https://www.airbnb.com.br/rooms/1364519756797091187", "id": 52},
    ],
    "Balneário Camboriú, SC": [
        {"url": "https://www.airbnb.com.br/rooms/23646345", "id": 53},
        {"url": "https://www.airbnb.com.br/rooms/37733497", "id": 54},
        {"url": "https://www.airbnb.com.br/rooms/1313275624964601263", "id": 55},
        {"url": "https://www.airbnb.com.br/rooms/53496467", "id": 56},
        {"url": "https://www.airbnb.com.br/rooms/46923357", "id": 57},
        {"url": "https://www.airbnb.com.br/rooms/1248814638138919017", "id": 58},
        {"url": "https://www.airbnb.com.br/rooms/794233920825975190", "id": 59},
        {"url": "https://www.airbnb.com.br/rooms/1026792099326101328", "id": 60},
        {"url": "https://www.airbnb.com.br/rooms/1278412143254224377", "id": 61},
        {"url": "https://www.airbnb.com.br/rooms/1358744711018754401", "id": 62},
    ],
}

def contar_imoveis():
    """Conta o total de imóveis a processar"""
    total = sum(len(imoveis) for imoveis in IMOVEIS.values())
    print(f"\n{'='*60}")
    print(f"TOTAL DE IMÓVEIS A PROCESSAR: {total}")
    print(f"{'='*60}\n")
    
    for cidade, imoveis in IMOVEIS.items():
        print(f"  {cidade}: {len(imoveis)} imóveis")
    
    print(f"\n{'='*60}\n")
    return total

def gerar_lista_urls():
    """Gera lista de URLs para processamento"""
    urls = []
    for cidade, imoveis in IMOVEIS.items():
        for imovel in imoveis:
            urls.append({
                "id": imovel["id"],
                "url": imovel["url"],
                "cidade": cidade
            })
    return urls

if __name__ == "__main__":
    total = contar_imoveis()
    urls = gerar_lista_urls()
    
    print(f"Lista de URLs gerada: {len(urls)} imóveis")
    print(f"\nPrimeiros 5:")
    for i, item in enumerate(urls[:5], 1):
        print(f"  {i}. ID {item['id']}: {item['cidade']}")
    
    # Salvar lista em JSON
    with open("/home/ubuntu/temporada/imoveis_processar.json", "w", encoding="utf-8") as f:
        json.dump(urls, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Lista salva em: /home/ubuntu/temporada/imoveis_processar.json")
