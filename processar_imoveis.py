import json

# Lista de imóveis para processar
imoveis = [
    {"id": 13, "url": "https://www.airbnb.com.br/rooms/38178031", "nome": "Casa do maneco", "status": "completo"},
    {"id": 14, "url": "https://www.airbnb.com.br/rooms/1220891552930782507", "nome": "Corrente Marítima"},
    {"id": 15, "url": "https://www.airbnb.com.br/rooms/1167580301639661829"},
    {"id": 16, "url": "https://www.airbnb.com.br/rooms/1563053936407183261"},
    {"id": 17, "url": "https://www.airbnb.com.br/rooms/6726821"},
    {"id": 18, "url": "https://www.airbnb.com.br/rooms/1488631637429045585"},
    {"id": 19, "url": "https://www.airbnb.com.br/rooms/1445758584503858096"},
    {"id": 20, "url": "https://www.airbnb.com.br/rooms/1340706982222935839"},
    {"id": 21, "url": "https://www.airbnb.com.br/rooms/1171878954596908427"},
    {"id": 22, "url": "https://www.airbnb.com.br/rooms/1046256147561066215"},
]

print(json.dumps(imoveis, indent=2, ensure_ascii=False))
