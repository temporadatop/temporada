#!/usr/bin/env python3
import json
import requests
import os
from pathlib import Path

# Ler dados extraídos
with open('/home/ubuntu/extract_property_data.json', 'r') as f:
    data = json.load(f)

# Criar diretório para fotos
photos_dir = Path('/home/ubuntu/temporadatop/data/chacaras-fotos')
photos_dir.mkdir(parents=True, exist_ok=True)

# Baixar fotos de cada chácara
downloaded = []
for idx, property_data in enumerate(data['results'], 1):
    output = property_data['output']
    photo_urls = output['photo_urls'].split(',')
    
    print(f"\n=== Chácara {idx}: {output['title']} ===")
    
    for photo_idx, url in enumerate(photo_urls, 1):
        url = url.strip()
        if not url:
            continue
            
        try:
            # Nome do arquivo: chacara-01-foto-01.jpg
            filename = f"chacara-{idx:02d}-foto-{photo_idx:02d}.jpg"
            filepath = photos_dir / filename
            
            # Baixar foto
            print(f"  Baixando foto {photo_idx}/5... ", end='', flush=True)
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            # Salvar arquivo
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            downloaded.append({
                'chacara': idx,
                'foto': photo_idx,
                'filename': filename,
                'path': str(filepath),
                'url_original': url
            })
            
            print(f"✓ {filename}")
            
        except Exception as e:
            print(f"✗ Erro: {e}")

print(f"\n\n=== RESUMO ===")
print(f"Total de fotos baixadas: {len(downloaded)}/55")
print(f"Diretório: {photos_dir}")

# Salvar log de downloads
log_file = photos_dir / 'download_log.json'
with open(log_file, 'w', encoding='utf-8') as f:
    json.dump(downloaded, f, indent=2, ensure_ascii=False)

print(f"Log salvo em: {log_file}")
