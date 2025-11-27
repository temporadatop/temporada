# Organizar lista de imóveis por cidade

fernando_noronha = [
    "https://www.airbnb.com.br/rooms/38178031",
    "https://www.airbnb.com.br/rooms/1220891552930782507",
    "https://www.airbnb.com.br/rooms/1167580301639661829",
    "https://www.airbnb.com.br/rooms/1563053936407183261",
    "https://www.airbnb.com.br/rooms/6726821",
    "https://www.airbnb.com.br/rooms/1488631637429045585",
    "https://www.airbnb.com.br/rooms/1445758584503858096",
    "https://www.airbnb.com.br/rooms/1340706982222935839",
    "https://www.airbnb.com.br/rooms/1171878954596908427",
    "https://www.airbnb.com.br/rooms/1046256147561066215",
]

angra_dos_reis = [
    "https://www.airbnb.com.br/rooms/1435437643432498392",
    "https://www.airbnb.com.br/rooms/39394342",
    "https://www.airbnb.com.br/rooms/1377491276961040928",
    "https://www.airbnb.com.br/rooms/699049611752287367",
    "https://www.airbnb.com.br/rooms/992067777202109403",
    "https://www.airbnb.com.br/rooms/45384093",
    "https://www.airbnb.com.br/rooms/1223890892762180578",
]

ubatuba = [
    "https://www.airbnb.com.br/rooms/1544256213566873984",
    "https://www.airbnb.com.br/rooms/1378516898582258700",
    "https://www.airbnb.com.br/rooms/1429044569513559509",
    "https://www.airbnb.com.br/rooms/51681111",
    "https://www.airbnb.com.br/rooms/881344247820645225",
    "https://www.airbnb.com.br/rooms/1317756787125734416",
    "https://www.airbnb.com.br/rooms/1505930246854870319",
]

guaruja_santos = [
    "https://www.airbnb.com.br/rooms/1057788133789126127",
    "https://www.airbnb.com.br/rooms/1269731422272294513",
    "https://www.airbnb.com.br/rooms/1469014938797802147",
    "https://www.airbnb.com.br/rooms/1328503821823173826",
    "https://www.airbnb.com.br/rooms/28760168",
    "https://www.airbnb.com.br/rooms/1308235314227758367",
    "https://www.airbnb.com.br/rooms/47238637",
    "https://www.airbnb.com.br/rooms/1360880600672050036",
    "https://www.airbnb.com.br/rooms/15940503",
    "https://www.airbnb.com.br/rooms/1442744594698648121",
    "https://www.airbnb.com.br/rooms/1235703194466924961",
    "https://www.airbnb.com.br/rooms/1314464900735732476",
    "https://www.airbnb.com.br/rooms/33688689",
    "https://www.airbnb.com.br/rooms/1387607189707520556",
    "https://www.airbnb.com.br/rooms/1420267280749924498",
    "https://www.airbnb.com.br/rooms/22569928",
    "https://www.airbnb.com.br/rooms/1364519756797091187",
]

balneario_camboriu = [
    "https://www.airbnb.com.br/rooms/23646345",
    "https://www.airbnb.com.br/rooms/37733497",
    "https://www.airbnb.com.br/rooms/1313275624964601263",
    "https://www.airbnb.com.br/rooms/53496467",
    "https://www.airbnb.com.br/rooms/46923357",
    "https://www.airbnb.com.br/rooms/1248814638138919017",
    "https://www.airbnb.com.br/rooms/794233920825975190",
    "https://www.airbnb.com.br/rooms/1026792099326101328",
    "https://www.airbnb.com.br/rooms/1278412143254224377",
    "https://www.airbnb.com.br/rooms/1358744711018754401",
]

print(f"Fernando de Noronha: {len(fernando_noronha)} imóveis")
print(f"Angra dos Reis: {len(angra_dos_reis)} imóveis")
print(f"Ubatuba: {len(ubatuba)} imóveis")
print(f"Guarujá/Santos: {len(guaruja_santos)} imóveis")
print(f"Balneário Camboriú: {len(balneario_camboriu)} imóveis")
print(f"\nTOTAL: {len(fernando_noronha) + len(angra_dos_reis) + len(ubatuba) + len(guaruja_santos) + len(balneario_camboriu)} imóveis")
