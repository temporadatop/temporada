import { getDb } from "./db";
import { properties } from "../drizzle/schema";

/**
 * Script para popular o banco de dados com as 11 chácaras fictícias
 * Execute com: tsx server/seed-properties.ts
 */

const propertiesData = [
  {
    ownerId: 1, // Será criado um usuário owner fictício
    title: "Chácara Primavera",
    description: "Bem-vindo à Chácara Primavera, seu refúgio perfeito em meio à natureza de Atibaia! Localizada a apenas 10 minutos do centro, nossa propriedade oferece a combinação ideal entre tranquilidade e conveniência. Com água mineral de poço artesiano e vistas deslumbrantes, este é o lugar perfeito para relaxar e reconectar com a família.\n\nA chácara conta com 3 quartos aconchegantes que acomodam até 6 pessoas, cozinha completa equipada com air fryer, aparelho de fondue e todos os utensílios necessários para preparar refeições deliciosas. A sala de estar convida para momentos de descanso e convivência.\n\nNa área externa, você encontrará uma piscina SPA com hidromassagem (3x3m), churrasqueira completa, fogueira para noites estreladas e amplo quintal privativo. O espaço é perfeito para churrasco em família, banhos relaxantes na piscina e momentos inesquecíveis ao ar livre.\n\nVenha viver uma experiência única na Chácara Primavera, onde cada detalhe foi pensado para proporcionar conforto, privacidade e momentos especiais com quem você ama!",
    address: "Rua das Primaveras, 123 - Bairro Boa Vista",
    city: "Atibaia",
    state: "SP",
    zipCode: "12940-000",
    capacity: 6,
    bedrooms: 3,
    bathrooms: 1,
    pricePerNight: 42500, // R$ 425,00 em centavos
    amenities: JSON.stringify(["Piscina", "Wi-Fi", "Churrasqueira", "Estacionamento", "Cozinha completa", "Fogueira", "TV", "Quintal privado", "Hidromassagem", "Air fryer"]),
    images: JSON.stringify(["/properties/chacara-01-foto-01.jpg", "/properties/chacara-01-foto-02.jpg", "/properties/chacara-01-foto-03.jpg", "/properties/chacara-01-foto-04.jpg", "/properties/chacara-01-foto-05.jpg"]),
    rules: "Não é permitido fumar. Não são permitidas festas ou eventos. Permitido animais de estimação.",
    status: "active" as const
  },
  {
    ownerId: 2,
    title: "Sítio Cantinho do Céu",
    description: "O Sítio Cantinho do Céu é um verdadeiro paraíso escondido em Nazaré Paulista, perfeito para quem busca paz, natureza e momentos inesquecíveis em família. Com vista privilegiada para as montanhas e o rio, nossa propriedade oferece a experiência autêntica de campo que você sempre sonhou.\n\nO espaço conta com um quarto aconchegante (cama de casal + treliche) que acomoda confortavelmente até 5 pessoas. A cozinha está equipada com fogão, geladeira, micro-ondas e todos os utensílios básicos para preparar suas refeições. Mesa para 5 pessoas convida para refeições em família com vista para a natureza.\n\nNa área externa, você pode desfrutar de uma refrescante piscina, churrasqueira completa, redes para relaxar e amplo quintal privado cercado. Perfeito para piqueniques em família, banhos de piscina e churrascos ao ar livre. O chuveiro externo é ideal para se refrescar após um dia de sol.\n\nCom flexibilidade total nos horários de check-in e check-out, o Sítio Cantinho do Céu é o lugar perfeito para desconectar do agito da cidade e reconectar com a natureza e com quem você ama!",
    address: "Estrada Municipal do Rio, Km 8",
    city: "Nazaré Paulista",
    state: "SP",
    zipCode: "12960-000",
    capacity: 5,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 33500,
    amenities: JSON.stringify(["Piscina", "Vista para montanhas", "Vista para rio", "Churrasqueira", "Wi-Fi", "Estacionamento", "Cozinha", "Quintal privado", "Chuveiro externo", "Redes"]),
    images: JSON.stringify(["/properties/chacara-02-foto-01.jpg", "/properties/chacara-02-foto-02.jpg", "/properties/chacara-02-foto-03.jpg", "/properties/chacara-02-foto-04.jpg", "/properties/chacara-02-foto-05.jpg"]),
    rules: "Permitido fumar. Animais de estimação permitidos. Flexibilidade nos horários.",
    status: "active" as const
  },
  {
    ownerId: 3,
    title: "Rancho Vista Alegre",
    description: "O Rancho Vista Alegre é uma propriedade excepcional localizada no coração da natureza exuberante entre Guararema, Salesópolis e Biritiba-Mirim. Cercado por mata nativa e com capacidade para até 12 pessoas, este rancho é perfeito para reuniões de família, eventos corporativos ou celebrações especiais.\n\nA cabana principal oferece acomodações confortáveis com 10 camas distribuídas estrategicamente. O Rancho (salão gourmet) conta com cozinha completa, churrasqueira profissional, fogão a lenha e forno de pizza artesanal. Todos os utensílios de cozinha e roupa de cama estão inclusos para sua comodidade.\n\nA propriedade dispõe de piscina, acesso ao lago, amplo salão com banheiros masculino e feminino, e estacionamento para até 12 veículos. O espaço é ideal para day use, festas de aniversário e eventos corporativos, comportando confortavelmente até 60 pessoas.\n\nCom Wi-Fi disponível e espaço de trabalho exclusivo, o Rancho Vista Alegre combina perfeitamente natureza, conforto e infraestrutura completa. Venha viver momentos inesquecíveis em harmonia com a natureza!",
    address: "Estrada do Mirante Rio Acima, s/n",
    city: "Mogi das Cruzes",
    state: "SP",
    zipCode: "08780-000",
    capacity: 12,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 49600,
    amenities: JSON.stringify(["Piscina", "Acesso ao lago", "Churrasqueira", "Forno de pizza", "Fogão a lenha", "Wi-Fi", "Estacionamento (12 vagas)", "Cozinha completa", "Salão de eventos", "Pet friendly"]),
    images: JSON.stringify(["/properties/chacara-03-foto-01.jpg", "/properties/chacara-03-foto-02.jpg", "/properties/chacara-03-foto-03.jpg", "/properties/chacara-03-foto-04.jpg", "/properties/chacara-03-foto-05.jpg"]),
    rules: "Ideal para eventos. Proibido festas Rave ou Funk. Máximo 60 pessoas para eventos.",
    status: "active" as const
  },
  {
    ownerId: 4,
    title: "Chácara Recanto das Águas",
    description: "A Chácara Recanto das Águas é um verdadeiro oásis de tranquilidade com mais de 4.000m² de área verde em local calmo e silencioso. Com vista privilegiada às margens da represa e piscina panorâmica, este é o refúgio perfeito para relaxar e se reconectar com a natureza.\n\nA propriedade conta com 2 quartos confortáveis (4 camas de solteiro) + sofá retrátil, acomodando até 6 pessoas. A cozinha está completamente equipada para preparar refeições deliciosas. Os 2 banheiros garantem conforto para todos os hóspedes.\n\nNa área externa, você encontrará uma piscina refrescante com vista panorâmica para a represa, varanda com redes para relaxar, espaço gourmet completo e estacionamento interno para até 5 carros. O poço semi-artesiano garante água de qualidade durante toda a estadia.\n\nCom check-in flexível e checkout até 17h, a Chácara Recanto das Águas oferece a combinação perfeita de natureza, conforto e privacidade. Venha desfrutar de momentos únicos com vista para as águas!",
    address: "Estrada da Represa, Km 15 - Zona Rural",
    city: "São Paulo",
    state: "SP",
    zipCode: "04890-000",
    capacity: 6,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 59100,
    amenities: JSON.stringify(["Piscina com vista", "Vista para represa", "Espaço gourmet", "Varanda com redes", "Wi-Fi", "TV", "Estacionamento (5 vagas)", "Cozinha completa", "Poço semi-artesiano", "4.000m² de área"]),
    images: JSON.stringify(["/properties/chacara-04-foto-01.jpg", "/properties/chacara-04-foto-02.jpg", "/properties/chacara-04-foto-03.jpg", "/properties/chacara-04-foto-04.jpg", "/properties/chacara-04-foto-05.jpg"]),
    rules: "Check-in flexível. Checkout até 17h. Máximo 6 hóspedes.",
    status: "active" as const
  },
  {
    ownerId: 5,
    title: "Sítio Flor do Campo",
    description: "O Sítio Flor do Campo é um refúgio encantador em meio à natureza de Ibiúna, perfeito para famílias que buscam descanso, diversão e contato com a natureza. Com casa aconchegante para 9 pessoas, piscina de 80 mil litros e amplo gramado de 350m², este sítio oferece tudo que você precisa para férias inesquecíveis.\n\nA casa conta com 2 quartos (cama Queen + treliche + cama Queen + colchão extra), cozinha totalmente equipada com fogão 5 bocas, geladeira duplex, micro-ondas e aparelho de fondue. A sala ampla possui TV de 42 polegadas, sofá confortável e cristaleira com taças de cristal.\n\nA área externa é um verdadeiro parque de diversões: piscina com guarda-sóis e espreguiçadeiras, churrasqueira completa com freezer, sala de jogos (sinuca, ping-pong, basquete), área de fogueira, pomar com árvores frutíferas (limão, laranja, jabuticaba, banana) e horta orgânica. O gramado pode ser usado como campo de futebol!\n\nCom limpeza impecável, roupas de cama cheirosas e estacionamento para 6 carros, o Sítio Flor do Campo é o lugar perfeito para criar memórias especiais em família!",
    address: "Estrada de Caucaia do Alto, Km 30",
    city: "Ibiúna",
    state: "SP",
    zipCode: "18150-000",
    capacity: 9,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 49400,
    amenities: JSON.stringify(["Piscina (80 mil litros)", "Churrasqueira", "Sala de jogos", "Mesa de sinuca", "Ping-pong", "Basquete", "Fogueira", "Pomar", "Horta", "Wi-Fi", "TV 42\"", "Pet friendly"]),
    images: JSON.stringify(["/properties/chacara-05-foto-01.jpg", "/properties/chacara-05-foto-02.jpg", "/properties/chacara-05-foto-03.jpg", "/properties/chacara-05-foto-04.jpg", "/properties/chacara-05-foto-05.jpg"]),
    rules: "Não é permitido festas ou eventos. Permitido fumar. Limpeza impecável garantida.",
    status: "active" as const
  },
  {
    ownerId: 6,
    title: "Chácara Bela Vista",
    description: "A Chácara Bela Vista é um cantinho especial em Mairiporã, a apenas 60km de São Paulo. Perfeita para quem busca descanso junto à natureza sem se afastar muito da capital. Com capacidade para 6 hóspedes, nossa chácara oferece a combinação ideal de tranquilidade e diversão.\n\nA propriedade conta com 2 quartos confortáveis, sala aconchegante, banheiro completo + lavabo, e cozinha integrada com a área da churrasqueira. A varanda ampla é perfeita para relaxar e apreciar a vista. Todos os ambientes foram pensados para proporcionar conforto e praticidade.\n\nNa área externa, você encontrará uma grande piscina privativa, campinho de futebol para as crianças (e adultos!) se divertirem, e amplo espaço verde. A churrasqueira completa convida para refeições ao ar livre em família.\n\nPedimos bom senso com relação ao som (ambiente durante o dia, silêncio à noite) para garantir a tranquilidade de todos. Máximo de 6 hóspedes, sem visitas durante a estadia. Venha desfrutar de momentos especiais na Chácara Bela Vista!",
    address: "Estrada Cantinho Mineiro, 245",
    city: "Mairiporã",
    state: "SP",
    zipCode: "07600-000",
    capacity: 6,
    bedrooms: 2,
    bathrooms: 1,
    pricePerNight: 44500,
    amenities: JSON.stringify(["Piscina privativa", "Campinho de futebol", "Churrasqueira", "Wi-Fi", "Espaço de trabalho", "Estacionamento", "Cozinha completa", "Varanda", "TV", "Pet friendly"]),
    images: JSON.stringify(["/properties/chacara-06-foto-01.jpg", "/properties/chacara-06-foto-02.jpg", "/properties/chacara-06-foto-03.jpg", "/properties/chacara-06-foto-04.jpg", "/properties/chacara-06-foto-05.jpg"]),
    rules: "Som ambiente durante o dia, silêncio à noite. Máximo 6 hóspedes. Sem visitas.",
    status: "active" as const
  },
  {
    ownerId: 7,
    title: "Rancho Paraíso Verde",
    description: "O Rancho Paraíso Verde é uma propriedade excepcional em Guararema, perfeita para grandes grupos e famílias que buscam conforto, diversão e contato com a natureza. Com capacidade para 13 pessoas, 3 quartos espaçosos e infraestrutura completa, este rancho é ideal para reuniões memoráveis.\n\nA casa principal oferece acomodações confortáveis, cozinha totalmente equipada, sala ampla com lareira para os dias mais frios e áreas de convivência aconchegantes. Todos os ambientes foram projetados pensando no bem-estar e na integração entre os hóspedes.\n\nA área externa é simplesmente espetacular: piscina refrescante, churrasqueira profissional, área gourmet completa, fogueira para noites estreladas e amplo gramado para atividades ao ar livre. A lareira externa cria o ambiente perfeito para reunir a família em noites frias.\n\nCom Wi-Fi disponível, estacionamento amplo e localização privilegiada em Guararema, o Rancho Paraíso Verde oferece tudo que você precisa para férias inesquecíveis. Venha criar memórias especiais em meio ao verde!",
    address: "Estrada Velha de Guararema, Km 12",
    city: "Guararema",
    state: "SP",
    zipCode: "08900-000",
    capacity: 13,
    bedrooms: 3,
    bathrooms: 2,
    pricePerNight: 53500,
    amenities: JSON.stringify(["Piscina", "Churrasqueira", "Lareira", "Fogueira", "Área gourmet", "Wi-Fi", "Estacionamento", "Cozinha completa", "Gramado amplo", "3 quartos"]),
    images: JSON.stringify(["/properties/chacara-07-foto-01.jpg", "/properties/chacara-07-foto-02.jpg", "/properties/chacara-07-foto-03.jpg", "/properties/chacara-07-foto-04.jpg"]),
    rules: "Ideal para reuniões de família. Respeitar horários de silêncio.",
    status: "active" as const
  },
  {
    ownerId: 8,
    title: "Chácara Sonho Meu",
    description: "A Chácara Sonho Meu é uma propriedade ampla e versátil em Ribeirão Pires, perfeita para grandes grupos de até 16 pessoas. Ideal para reuniões de família, eventos corporativos ou celebrações especiais, nossa chácara oferece espaço, conforto e infraestrutura completa.\n\nA propriedade conta com amplas acomodações distribuídas estrategicamente, cozinha industrial equipada para preparar refeições para grandes grupos, e áreas de convivência espaçosas. Com 2 banheiros completos, todos os hóspedes terão conforto e privacidade.\n\nA área externa é perfeita para entretenimento: piscina grande para refrescar nos dias quentes, churrasqueira profissional, área gourmet coberta e amplo espaço verde para atividades ao ar livre. O espaço comporta confortavelmente até 16 pessoas com toda a infraestrutura necessária.\n\nCom localização estratégica em Ribeirão Pires e capacidade para grandes grupos, a Chácara Sonho Meu é a escolha perfeita para quem busca espaço, conforto e momentos inesquecíveis em família ou com amigos!",
    address: "Rua das Acácias, 789 - Zona Rural",
    city: "Ribeirão Pires",
    state: "SP",
    zipCode: "09400-000",
    capacity: 16,
    bedrooms: 1,
    bathrooms: 2,
    pricePerNight: 55200,
    amenities: JSON.stringify(["Piscina grande", "Churrasqueira profissional", "Área gourmet", "Cozinha industrial", "Estacionamento amplo", "Espaço para eventos", "2 banheiros", "Área verde ampla"]),
    images: JSON.stringify(["/properties/chacara-08-foto-01.jpg", "/properties/chacara-08-foto-02.jpg", "/properties/chacara-08-foto-03.jpg", "/properties/chacara-08-foto-04.jpg", "/properties/chacara-08-foto-05.jpg"]),
    rules: "Ideal para eventos e grandes grupos. Respeitar capacidade máxima.",
    status: "active" as const
  },
  {
    ownerId: 9,
    title: "Sítio Morada do Sol",
    description: "O Sítio Morada do Sol é um chalé romântico e aconchegante localizado na Serra do Lopo, em Extrema/MG. Perfeito para casais que buscam privacidade, tranquilidade e contato íntimo com a natureza. Com capacidade para 2 pessoas, este é o refúgio ideal para uma escapada romântica.\n\nO chalé conta com quarto confortável, cozinha equipada, sala de estar aconchegante e banheiro completo. Todos os ambientes foram decorados com carinho para criar uma atmosfera romântica e acolhedora. A arquitetura do chalé se integra perfeitamente com a paisagem natural.\n\nA área externa oferece vista deslumbrante para as montanhas, varanda privativa para apreciar o pôr do sol, e jardim florido com hortênsias que dão nome ao chalé. O silêncio da serra e o ar puro criam o ambiente perfeito para relaxar e se desconectar.\n\nCom localização privilegiada na Serra do Lopo e atmosfera romântica, o Sítio Morada do Sol é o destino perfeito para casais que buscam momentos especiais em meio à natureza!",
    address: "Serra do Lopo, s/n - Zona Rural",
    city: "Extrema",
    state: "MG",
    zipCode: "37640-000",
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 46300,
    amenities: JSON.stringify(["Vista para montanhas", "Varanda privativa", "Jardim", "Cozinha", "Chalé romântico", "Ar puro", "Silêncio", "Natureza"]),
    images: JSON.stringify(["/properties/chacara-09-foto-01.jpg", "/properties/chacara-09-foto-02.jpg", "/properties/chacara-09-foto-03.jpg", "/properties/chacara-09-foto-04.jpg", "/properties/chacara-09-foto-05.jpg"]),
    rules: "Ideal para casais. Ambiente romântico. Respeitar o silêncio.",
    status: "active" as const
  },
  {
    ownerId: 10,
    title: "Chácara Vale Encantado",
    description: "A Chácara Vale Encantado é uma propriedade excepcional em Atibaia, perfeita para grandes famílias e grupos de até 15 pessoas. Com piscina aquecida, 3 quartos espaçosos e infraestrutura completa, este é o lugar ideal para reunir quem você ama.\n\nA casa principal oferece 3 quartos confortáveis, sala ampla, cozinha totalmente equipada e áreas de convivência espaçosas. Todos os ambientes foram projetados para proporcionar conforto e integração entre os hóspedes. A decoração aconchegante cria uma atmosfera familiar.\n\nO grande destaque é a piscina aquecida, perfeita para aproveitar em qualquer época do ano! A área externa também conta com churrasqueira completa, área gourmet, fogueira, e amplo gramado para as crianças brincarem. O espaço é ideal para festas de família e celebrações especiais.\n\nCom localização privilegiada em Atibaia, piscina aquecida e capacidade para 15 pessoas, a Chácara Vale Encantado é a escolha perfeita para criar memórias inesquecíveis em família!",
    address: "Estrada do Recanto da Família, 456",
    city: "Atibaia",
    state: "SP",
    zipCode: "12940-000",
    capacity: 15,
    bedrooms: 3,
    bathrooms: 2,
    pricePerNight: 45700,
    amenities: JSON.stringify(["Piscina aquecida", "Churrasqueira", "Área gourmet", "Fogueira", "3 quartos", "Gramado amplo", "Estacionamento", "Cozinha completa", "Wi-Fi"]),
    images: JSON.stringify(["/properties/chacara-10-foto-01.jpg", "/properties/chacara-10-foto-02.jpg", "/properties/chacara-10-foto-03.jpg", "/properties/chacara-10-foto-04.jpg"]),
    rules: "Ideal para festas de família. Respeitar capacidade máxima de 15 pessoas.",
    status: "active" as const
  },
  {
    ownerId: 11,
    title: "Rancho Pedra Alta",
    description: "O Rancho Pedra Alta é um chalé romântico e exclusivo em São Bento do Sapucaí, conhecido como a 'Suíça Brasileira'. Perfeito para casais que buscam privacidade, conforto e uma experiência única em meio às montanhas. Com hidromassagem privativa, este é o refúgio ideal para momentos a dois.\n\nO chalé conta com quarto confortável, banheiro com hidromassagem, cozinha equipada e sala de estar aconchegante. A decoração rústica-chique cria uma atmosfera romântica e sofisticada. Todos os detalhes foram pensados para proporcionar uma experiência inesquecível.\n\nA área externa oferece vista panorâmica para as montanhas, varanda privativa para apreciar o nascer do sol, e jardim com flores. A hidromassagem é perfeita para relaxar após um dia explorando as belezas naturais da região.\n\nCom localização privilegiada em São Bento do Sapucaí, hidromassagem privativa e atmosfera romântica, o Rancho Pedra Alta é o destino perfeito para casais que buscam uma escapada especial nas montanhas!",
    address: "Estrada do Vale do Sonho, Km 3",
    city: "São Bento do Sapucaí",
    state: "SP",
    zipCode: "12490-000",
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 48100,
    amenities: JSON.stringify(["Hidromassagem", "Vista para montanhas", "Varanda privativa", "Chalé romântico", "Cozinha", "Lareira", "Jardim", "Decoração rústica-chique"]),
    images: JSON.stringify(["/properties/chacara-11-foto-01.jpg", "/properties/chacara-11-foto-02.jpg", "/properties/chacara-11-foto-03.jpg", "/properties/chacara-11-foto-04.jpg"]),
    rules: "Ideal para casais. Ambiente romântico e exclusivo.",
    status: "active" as const
  }
];

async function seedProperties() {
  console.log("🌱 Iniciando seed das propriedades...\n");

  const db = await getDb();
  if (!db) {
    console.error("❌ Erro: Banco de dados não disponível");
    process.exit(1);
  }

  try {
    // Inserir todas as propriedades
    for (const property of propertiesData) {
      await db.insert(properties).values(property);
      console.log(`✅ ${property.title} - ${property.city}/${property.state}`);
    }

    console.log(`\n🎉 ${propertiesData.length} propriedades inseridas com sucesso!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao inserir propriedades:", error);
    process.exit(1);
  }
}

seedProperties();
