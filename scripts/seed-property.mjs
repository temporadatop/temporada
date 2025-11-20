import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { properties, reviews, availability } from '../drizzle/schema.ts';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não definida!');
  process.exit(1);
}

const client = postgres(DATABASE_URL);
const db = drizzle(client);

async function seedProperty() {
  console.log('🌱 Populando banco com Chácara Recanto Serrano...');

  try {
    // 1. Criar a propriedade
    const [property] = await db.insert(properties).values({
      ownerId: 1, // Admin/owner padrão
      title: 'Chácara Recanto Serrano',
      description: `Hospede-se em uma chácara charmosa no estilo europeu montanhês, ideal para quem busca conforto e contato com a natureza. 

A propriedade oferece uma decoração rústica e elegante, complementada por uma variedade de comodidades premium, incluindo sauna, piscina aquecida, sala de jogos, churrasqueira gourmet, academia completa e um lindo lago com peixes ornamentais.

Perfeita para famílias, grupos de amigos ou eventos especiais. Ambiente tranquilo e seguro, cercado pela natureza, mas com fácil acesso à cidade.`,
      address: 'Região Serrana', // Será dinâmico baseado no IP
      city: 'dynamic', // Marcador especial para cidade dinâmica
      state: 'SP',
      zipCode: '00000-000',
      capacity: 15,
      bedrooms: 5,
      bathrooms: 4,
      pricePerNight: 35000, // R$ 350,00 em centavos
      rules: `• Check-in: 14h | Check-out: 12h
• Proibido fumar dentro da casa
• Festas permitidas com aviso prévio
• Animais de estimação bem-vindos
• Respeite os vizinhos e a natureza
• Deixe a chácara limpa e organizada`,
      amenities: JSON.stringify([
        'Piscina',
        'Sauna',
        'Lago com Peixes',
        'Churrasqueira',
        'Academia',
        'Sala de Jogos',
        'Wi-Fi',
        'Estacionamento',
        'Cozinha Completa',
        'TV a Cabo',
      ]),
      images: JSON.stringify([
        '/properties/chacara-recanto-serrano-1.webp',
        '/properties/chacara-recanto-serrano-2.webp',
        '/properties/chacara-recanto-serrano-3.webp',
        '/properties/chacara-recanto-serrano-4-quarto.webp',
      ]),
      status: 'active',
    }).returning();

    console.log(`✅ Propriedade criada: ${property.title} (ID: ${property.id})`);

    // 2. Adicionar avaliações fictícias (sem bookingId por enquanto)
    const reviewsList = [
      {
        propertyId: property.id,
        bookingId: 1, // Placeholder
        guestId: 2,
        rating: 5,
        comment: 'Lugar maravilhoso! A família toda adorou a piscina e o lago. Voltaremos com certeza!',
      },
      {
        propertyId: property.id,
        bookingId: 2, // Placeholder
        guestId: 3,
        rating: 5,
        comment: 'Chácara impecável, muito bem cuidada. A sauna é incrível! Recomendo demais!',
      },
      {
        propertyId: property.id,
        bookingId: 3, // Placeholder
        guestId: 4,
        rating: 5,
        comment: 'Perfeito para confraternização em família. Espaço amplo, limpo e aconchegante.',
      },
    ];

    for (const review of reviewsList) {
      await db.insert(reviews).values(review);
    }

    console.log(`✅ ${reviewsList.length} avaliações adicionadas`);

    // 3. Marcar algumas datas como ocupadas (simular reservas)
    const natal = new Date('2025-12-24');
    const reveillon = new Date('2025-12-31');
    
    // Marcar Natal como ocupado
    await db.insert(availability).values({
      propertyId: property.id,
      date: natal,
      isAvailable: false,
      specialPrice: 50000, // R$ 500 para data especial
    });

    // Marcar Réveillon como ocupado
    await db.insert(availability).values({
      propertyId: property.id,
      date: reveillon,
      isAvailable: false,
      specialPrice: 60000, // R$ 600 para data especial
    });

    console.log('✅ Disponibilidade configurada');

    console.log('\n🎉 Chácara Recanto Serrano criada com sucesso!');
    console.log(`📊 Resumo:
- Nome: ${property.title}
- Quartos: ${property.bedrooms}
- Hóspedes: ${property.capacity}
- Preço: R$ ${property.pricePerNight / 100}/noite
- Imagens: 4
- Avaliações: ${reviewsList.length}
`);

  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
    process.exit(1);
  } finally {
    await client.end();
    process.exit(0);
  }
}

seedProperty();
