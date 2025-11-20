export interface Property {
  id: number;
  name: string;
  location: string;
  description: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price_per_night: number;
  amenities: string[];
  owner_name: string;
  rating: number;
  reviews_count: number;
  photos: string[];
}

export const properties: Property[] = [
  {
    id: 1,
    name: "Chácara Primavera",
    location: "Atibaia, SP",
    description: "Bem-vindo à Chácara Primavera, seu refúgio perfeito em meio à natureza de Atibaia! Localizada a apenas 10 minutos do centro, nossa propriedade oferece a combinação ideal entre tranquilidade e conveniência. Com água mineral de poço artesiano e vistas deslumbrantes, este é o lugar perfeito para relaxar e reconectar com a família.\n\nA chácara conta com 3 quartos aconchegantes que acomodam até 6 pessoas, cozinha completa equipada com air fryer, aparelho de fondue e todos os utensílios necessários para preparar refeições deliciosas. A sala de estar convida para momentos de descanso e convivência.\n\nNa área externa, você encontrará uma piscina SPA com hidromassagem (3x3m), churrasqueira completa, fogueira para noites estreladas e amplo quintal privativo. O espaço é perfeito para churrasco em família, banhos relaxantes na piscina e momentos inesquecíveis ao ar livre.\n\nVenha viver uma experiência única na Chácara Primavera, onde cada detalhe foi pensado para proporcionar conforto, privacidade e momentos especiais com quem você ama!",
    guests: 6,
    bedrooms: 3,
    beds: 5,
    bathrooms: 1,
    price_per_night: 425,
    amenities: ["Piscina", "Wi-Fi", "Churrasqueira", "Estacionamento", "Cozinha completa", "Fogueira", "TV", "Quintal privado", "Hidromassagem", "Ar fryer"],
    owner_name: "Maria Silva",
    rating: 4.8,
    reviews_count: 73,
    photos: ["/properties/chacara-01-foto-01.jpg", "/properties/chacara-01-foto-02.jpg", "/properties/chacara-01-foto-03.jpg", "/properties/chacara-01-foto-04.jpg", "/properties/chacara-01-foto-05.jpg"]
  },
  {
    id: 2,
    name: "Sítio Cantinho do Céu",
    location: "Nazaré Paulista, SP",
    description: "O Sítio Cantinho do Céu é um verdadeiro paraíso escondido em Nazaré Paulista, perfeito para quem busca paz, natureza e momentos inesquecíveis em família. Com vista privilegiada para as montanhas e o rio, nossa propriedade oferece a experiência autêntica de campo que você sempre sonhou.\n\nO espaço conta com um quarto aconchegante (cama de casal + treliche) que acomoda confortavelmente até 5 pessoas. A cozinha está equipada com fogão, geladeira, micro-ondas e todos os utensílios básicos para preparar suas refeições. Mesa para 5 pessoas convida para refeições em família com vista para a natureza.\n\nNa área externa, você pode desfrutar de uma refrescante piscina, churrasqueira completa, redes para relaxar e amplo quintal privado cercado. Perfeito para piqueniques em família, banhos de piscina e churrascos ao ar livre. O chuveiro externo é ideal para se refrescar após um dia de sol.\n\nCom flexibilidade total nos horários de check-in e check-out, o Sítio Cantinho do Céu é o lugar perfeito para desconectar do agito da cidade e reconectar com a natureza e com quem você ama!",
    guests: 5,
    bedrooms: 1,
    beds: 5,
    bathrooms: 1,
    price_per_night: 335,
    amenities: ["Piscina", "Vista para montanhas", "Vista para rio", "Churrasqueira", "Wi-Fi", "Estacionamento", "Cozinha", "Quintal privado", "Chuveiro externo", "Redes"],
    owner_name: "João Santos",
    rating: 4.9,
    reviews_count: 26,
    photos: ["/properties/chacara-02-foto-01.jpg", "/properties/chacara-02-foto-02.jpg", "/properties/chacara-02-foto-03.jpg", "/properties/chacara-02-foto-04.jpg", "/properties/chacara-02-foto-05.jpg"]
  },
  {
    id: 3,
    name: "Rancho Vista Alegre",
    location: "Mogi das Cruzes, SP",
    description: "O Rancho Vista Alegre é uma propriedade excepcional localizada no coração da natureza exuberante entre Guararema, Salesópolis e Biritiba-Mirim. Cercado por mata nativa e com capacidade para até 12 pessoas, este rancho é perfeito para reuniões de família, eventos corporativos ou celebrações especiais.\n\nA cabana principal oferece acomodações confortáveis com 10 camas distribuídas estrategicamente. O Rancho (salão gourmet) conta com cozinha completa, churrasqueira profissional, fogão a lenha e forno de pizza artesanal. Todos os utensílios de cozinha e roupa de cama estão inclusos para sua comodidade.\n\nA propriedade dispõe de piscina, acesso ao lago, amplo salão com banheiros masculino e feminino, e estacionamento para até 12 veículos. O espaço é ideal para day use, festas de aniversário e eventos corporativos, comportando confortavelmente até 60 pessoas.\n\nCom Wi-Fi disponível e espaço de trabalho exclusivo, o Rancho Vista Alegre combina perfeitamente natureza, conforto e infraestrutura completa. Venha viver momentos inesquecíveis em harmonia com a natureza!",
    guests: 12,
    bedrooms: 1,
    beds: 10,
    bathrooms: 1,
    price_per_night: 496,
    amenities: ["Piscina", "Acesso ao lago", "Churrasqueira", "Forno de pizza", "Fogão a lenha", "Wi-Fi", "Estacionamento (12 vagas)", "Cozinha completa", "Salão de eventos", "Pet friendly"],
    owner_name: "Ana Paula Costa",
    rating: 4.8,
    reviews_count: 81,
    photos: ["/properties/chacara-03-foto-01.jpg", "/properties/chacara-03-foto-02.jpg", "/properties/chacara-03-foto-03.jpg", "/properties/chacara-03-foto-04.jpg", "/properties/chacara-03-foto-05.jpg"]
  },
  {
    id: 4,
    name: "Chácara Recanto das Águas",
    location: "São Paulo, SP",
    description: "A Chácara Recanto das Águas é um verdadeiro oásis de tranquilidade com mais de 4.000m² de área verde em local calmo e silencioso. Com vista privilegiada às margens da represa e piscina panorâmica, este é o refúgio perfeito para relaxar e se reconectar com a natureza.\n\nA propriedade conta com 2 quartos confortáveis (4 camas de solteiro) + sofá retrátil, acomodando até 6 pessoas. A cozinha está completamente equipada para preparar refeições deliciosas. Os 2 banheiros garantem conforto para todos os hóspedes.\n\nNa área externa, você encontrará uma piscina refrescante com vista panorâmica para a represa, varanda com redes para relaxar, espaço gourmet completo e estacionamento interno para até 5 carros. O poço semi-artesiano garante água de qualidade durante toda a estadia.\n\nCom check-in flexível e checkout até 17h, a Chácara Recanto das Águas oferece a combinação perfeita de natureza, conforto e privacidade. Venha desfrutar de momentos únicos com vista para as águas!",
    guests: 6,
    bedrooms: 2,
    beds: 4,
    bathrooms: 2,
    price_per_night: 591,
    amenities: ["Piscina com vista", "Vista para represa", "Espaço gourmet", "Varanda com redes", "Wi-Fi", "TV", "Estacionamento (5 vagas)", "Cozinha completa", "Poço semi-artesiano", "4.000m² de área"],
    owner_name: "Carlos Eduardo Oliveira",
    rating: 5.0,
    reviews_count: 15,
    photos: ["/properties/chacara-04-foto-01.jpg", "/properties/chacara-04-foto-02.jpg", "/properties/chacara-04-foto-03.jpg", "/properties/chacara-04-foto-04.jpg", "/properties/chacara-04-foto-05.jpg"]
  },
  {
    id: 5,
    name: "Sítio Flor do Campo",
    location: "Ibiúna, SP",
    description: "O Sítio Flor do Campo é um refúgio encantador em meio à natureza de Ibiúna, perfeito para famílias que buscam descanso, diversão e contato com a natureza. Com casa aconchegante para 9 pessoas, piscina de 80 mil litros e amplo gramado de 350m², este sítio oferece tudo que você precisa para férias inesquecíveis.\n\nA casa conta com 2 quartos (cama Queen + treliche + cama Queen + colchão extra), cozinha totalmente equipada com fogão 5 bocas, geladeira duplex, micro-ondas e aparelho de fondue. A sala ampla possui TV de 42 polegadas, sofá confortável e cristaleira com taças de cristal.\n\nA área externa é um verdadeiro parque de diversões: piscina com guarda-sóis e espreguiçadeiras, churrasqueira completa com freezer, sala de jogos (sinuca, ping-pong, basquete), área de fogueira, pomar com árvores frutíferas (limão, laranja, jabuticaba, banana) e horta orgânica. O gramado pode ser usado como campo de futebol!\n\nCom limpeza impecável, roupas de cama cheirosas e estacionamento para 6 carros, o Sítio Flor do Campo é o lugar perfeito para criar memórias especiais em família!",
    guests: 9,
    bedrooms: 2,
    beds: 6,
    bathrooms: 2,
    price_per_night: 494,
    amenities: ["Piscina (80 mil litros)", "Churrasqueira", "Sala de jogos", "Mesa de sinuca", "Ping-pong", "Basquete", "Fogueira", "Pomar", "Horta", "Wi-Fi", "TV 42\"", "Pet friendly"],
    owner_name: "Juliana Ferreira",
    rating: 5.0,
    reviews_count: 54,
    photos: ["/properties/chacara-05-foto-01.jpg", "/properties/chacara-05-foto-02.jpg", "/properties/chacara-05-foto-03.jpg", "/properties/chacara-05-foto-04.jpg", "/properties/chacara-05-foto-05.jpg"]
  },
  {
    id: 6,
    name: "Chácara Bela Vista",
    location: "Mairiporã, SP",
    description: "A Chácara Bela Vista é um cantinho especial em Mairiporã, a apenas 60km de São Paulo. Perfeita para quem busca descanso junto à natureza sem se afastar muito da capital. Com capacidade para 6 hóspedes, nossa chácara oferece a combinação ideal de tranquilidade e diversão.\n\nA propriedade conta com 2 quartos confortáveis, sala aconchegante, banheiro completo + lavabo, e cozinha integrada com a área da churrasqueira. A varanda ampla é perfeita para relaxar e apreciar a vista. Todos os ambientes foram pensados para proporcionar conforto e praticidade.\n\nNa área externa, você encontrará uma grande piscina privativa, campinho de futebol para as crianças (e adultos!) se divertirem, e amplo espaço verde. A churrasqueira completa convida para refeições ao ar livre em família.\n\nPedimos bom senso com relação ao som (ambiente durante o dia, silêncio à noite) para garantir a tranquilidade de todos. Máximo de 6 hóspedes, sem visitas durante a estadia. Venha desfrutar de momentos especiais na Chácara Bela Vista!",
    guests: 6,
    bedrooms: 2,
    beds: 6,
    bathrooms: 1.5,
    price_per_night: 445,
    amenities: ["Piscina privativa", "Campinho de futebol", "Churrasqueira", "Wi-Fi", "Espaço de trabalho", "Estacionamento", "Cozinha completa", "Varanda", "TV", "Pet friendly"],
    owner_name: "Roberto Almeida",
    rating: 5.0,
    reviews_count: 83,
    photos: ["/properties/chacara-06-foto-01.jpg", "/properties/chacara-06-foto-02.jpg", "/properties/chacara-06-foto-03.jpg", "/properties/chacara-06-foto-04.jpg", "/properties/chacara-06-foto-05.jpg"]
  },
  {
    id: 7,
    name: "Rancho Paraíso Verde",
    location: "Guararema, SP",
    description: "O Rancho Paraíso Verde é uma propriedade excepcional em Guararema, perfeita para grandes grupos e famílias que buscam conforto, diversão e contato com a natureza. Com capacidade para 13 pessoas, 3 quartos espaçosos e infraestrutura completa, este rancho é ideal para reuniões memoráveis.\n\nA casa principal oferece acomodações confortáveis, cozinha totalmente equipada, sala ampla com lareira para os dias mais frios e áreas de convivência aconchegantes. Todos os ambientes foram projetados pensando no bem-estar e na integração entre os hóspedes.\n\nA área externa é simplesmente espetacular: piscina refrescante, churrasqueira profissional, área gourmet completa, fogueira para noites estreladas e amplo gramado para atividades ao ar livre. A lareira externa cria o ambiente perfeito para reunir a família em noites frias.\n\nCom Wi-Fi disponível, estacionamento amplo e localização privilegiada em Guararema, o Rancho Paraíso Verde oferece tudo que você precisa para férias inesquecíveis. Venha criar memórias especiais em meio ao verde!",
    guests: 13,
    bedrooms: 3,
    beds: 10,
    bathrooms: 2,
    price_per_night: 535,
    amenities: ["Piscina", "Churrasqueira", "Lareira", "Fogueira", "Área gourmet", "Wi-Fi", "Estacionamento", "Cozinha completa", "Gramado amplo", "3 quartos"],
    owner_name: "Patricia Rodrigues",
    rating: 4.8,
    reviews_count: 63,
    photos: ["/properties/chacara-07-foto-01.jpg", "/properties/chacara-07-foto-02.jpg", "/properties/chacara-07-foto-03.jpg", "/properties/chacara-07-foto-04.jpg", "/properties/chacara-07-foto-05.jpg"]
  },
  {
    id: 8,
    name: "Chácara Sonho Meu",
    location: "Ribeirão Pires, SP",
    description: "A Chácara Sonho Meu é uma propriedade ampla e versátil em Ribeirão Pires, perfeita para grandes grupos de até 16 pessoas. Ideal para reuniões de família, eventos corporativos ou celebrações especiais, nossa chácara oferece espaço, conforto e infraestrutura completa.\n\nA propriedade conta com amplas acomodações distribuídas estrategicamente, cozinha industrial equipada para preparar refeições para grandes grupos, e áreas de convivência espaçosas. Com 2 banheiros completos, todos os hóspedes terão conforto e privacidade.\n\nA área externa é perfeita para entretenimento: piscina grande para refrescar nos dias quentes, churrasqueira profissional, área gourmet coberta e amplo espaço verde para atividades ao ar livre. O espaço comporta confortavelmente até 16 pessoas com toda a infraestrutura necessária.\n\nCom localização estratégica em Ribeirão Pires e capacidade para grandes grupos, a Chácara Sonho Meu é a escolha perfeita para quem busca espaço, conforto e momentos inesquecíveis em família ou com amigos!",
    guests: 16,
    bedrooms: 1,
    beds: 12,
    bathrooms: 2,
    price_per_night: 552,
    amenities: ["Piscina grande", "Churrasqueira profissional", "Área gourmet", "Cozinha industrial", "Estacionamento amplo", "Espaço para eventos", "2 banheiros", "Área verde ampla"],
    owner_name: "Fernando Lima",
    rating: 4.9,
    reviews_count: 22,
    photos: ["/properties/chacara-08-foto-01.jpg", "/properties/chacara-08-foto-02.jpg", "/properties/chacara-08-foto-03.jpg", "/properties/chacara-08-foto-04.jpg", "/properties/chacara-08-foto-05.jpg"]
  },
  {
    id: 9,
    name: "Sítio Morada do Sol",
    location: "Extrema, MG",
    description: "O Sítio Morada do Sol é um refúgio romântico e aconchegante em Extrema, MG, perfeito para casais que buscam tranquilidade e contato com a natureza. Com capacidade para 2 pessoas, este sítio oferece privacidade total e uma experiência única de descanso.\n\nA propriedade conta com 1 quarto confortável, cozinha equipada com o essencial, e área de estar aconchegante. Todos os ambientes foram pensados para proporcionar conforto e intimidade ao casal.\n\nNa área externa, você encontrará uma piscina privativa para momentos refrescantes, churrasqueira para refeições românticas ao ar livre, e amplo espaço verde para caminhadas e contemplação. A vista para as montanhas de Extrema é simplesmente deslumbrante.\n\nCom Wi-Fi disponível e localização estratégica em Extrema, o Sítio Morada do Sol é o refúgio perfeito para casais que buscam paz, natureza e momentos especiais a dois!",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    price_per_night: 463,
    amenities: ["Piscina privativa", "Vista para montanhas", "Churrasqueira", "Wi-Fi", "Estacionamento", "Cozinha", "Área verde", "Romântico"],
    owner_name: "Camila Martins",
    rating: 4.7,
    reviews_count: 12,
    photos: ["/properties/chacara-09-foto-01.jpg", "/properties/chacara-09-foto-02.jpg", "/properties/chacara-09-foto-03.jpg", "/properties/chacara-09-foto-04.jpg", "/properties/chacara-09-foto-05.jpg"]
  },
  {
    id: 10,
    name: "Chácara Vale Encantado",
    location: "Atibaia, SP",
    description: "A Chácara Vale Encantado é uma propriedade excepcional em Atibaia, perfeita para grandes grupos de até 15 pessoas. Ideal para reuniões de família, eventos corporativos ou celebrações especiais, nossa chácara oferece espaço, conforto e infraestrutura completa em meio à natureza.\n\nA propriedade conta com amplas acomodações distribuídas em múltiplos quartos, cozinha totalmente equipada para preparar refeições para grandes grupos, e áreas de convivência espaçosas. Com 3 banheiros completos, todos os hóspedes terão conforto e privacidade.\n\nA área externa é perfeita para entretenimento: piscina grande, churrasqueira profissional, área gourmet coberta, fogueira para noites estreladas e amplo espaço verde para atividades ao ar livre. O espaço comporta confortavelmente até 15 pessoas com toda a infraestrutura necessária.\n\nCom Wi-Fi disponível, estacionamento amplo e localização privilegiada em Atibaia, a Chácara Vale Encantado oferece tudo que você precisa para férias inesquecíveis em grande estilo!",
    guests: 15,
    bedrooms: 5,
    beds: 12,
    bathrooms: 3,
    price_per_night: 457,
    amenities: ["Piscina grande", "Churrasqueira profissional", "Área gourmet", "Fogueira", "Wi-Fi", "Estacionamento amplo", "Cozinha completa", "5 quartos", "3 banheiros", "Área verde"],
    owner_name: "Ricardo Pereira",
    rating: 4.9,
    reviews_count: 45,
    photos: ["/properties/chacara-10-foto-01.jpg", "/properties/chacara-10-foto-02.jpg", "/properties/chacara-10-foto-03.jpg", "/properties/chacara-10-foto-04.jpg", "/properties/chacara-10-foto-05.jpg"]
  },
  {
    id: 11,
    name: "Rancho Pedra Alta",
    location: "São Bento do Sapucaí, SP",
    description: "O Rancho Pedra Alta é um refúgio romântico e exclusivo em São Bento do Sapucaí, perfeito para casais que buscam tranquilidade nas montanhas. Com capacidade para 2 pessoas, este rancho oferece privacidade total e uma experiência única de descanso em meio à natureza exuberante da Serra da Mantiqueira.\n\nA propriedade conta com 1 quarto confortável com cama king size, cozinha equipada, e área de estar aconchegante com lareira para os dias frios. Todos os ambientes foram pensados para proporcionar conforto e intimidade ao casal.\n\nNa área externa, você encontrará uma piscina aquecida para momentos refrescantes mesmo no inverno, churrasqueira para refeições românticas ao ar livre, e amplo deck com vista panorâmica para as montanhas. A vista para a Pedra do Baú é simplesmente espetacular.\n\nCom Wi-Fi disponível, lareira, piscina aquecida e localização estratégica em São Bento do Sapucaí, o Rancho Pedra Alta é o refúgio perfeito para casais que buscam paz, natureza e momentos especiais a dois nas montanhas!",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    price_per_night: 481,
    amenities: ["Piscina aquecida", "Vista para montanhas", "Lareira", "Churrasqueira", "Wi-Fi", "Estacionamento", "Cozinha", "Deck panorâmico", "Romântico"],
    owner_name: "Luciana Souza",
    rating: 5.0,
    reviews_count: 38,
    photos: ["/properties/chacara-11-foto-01.jpg", "/properties/chacara-11-foto-02.jpg", "/properties/chacara-11-foto-03.jpg", "/properties/chacara-11-foto-04.jpg", "/properties/chacara-11-foto-05.jpg"]
  }
];
