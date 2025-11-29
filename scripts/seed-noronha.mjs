import { getDb } from "../server/db.ts";
import { properties } from "../drizzle/schema.ts";

async function seedNoronhaProperty() {
  console.log("Iniciando o seeding do imóvel de Fernando de Noronha...");

  const noronhaProperty = {
    id: 11, // Próximo ID disponível após o último imóvel do seed-property.mjs (que era 10)
    title: "Brisa Mar Noronha - 03 (Quarto duplo)",
    description: `Localizada na Vila do Trinta, a Brisa Mar fica próximo aos principais supermercados e padarias da ilha, restaurantes, centro de convivência, academias, biblioteca pública, agência do Banco Bradesco e pontos de ônibus. Há 1,5 km está à praia do Porto e de 10 a 15 minutos você estará nas praias do Cachorro, Meio e Conceição.

O espaço
O quarto dispõe de ar condicionado, tv, frigobar e banho quente. Acomoda até 3 pessoas.
Possuímos área de estar compartilhada e área externa com redes, uma verdadeira brisa e vista para o mar.
A Brisa Mar também oferece um refeitório compartilhado equipado com utensílios domésticos onde possibilita aos nossos hóspedes prepararem seu próprio café e refeições.`,
    location: "Fernando de Noronha, Brasil",
    price: 487.50, // R$975 / 2 noites = R$487.50 por noite
    guests: 15, // Padrão solicitado pelo usuário
    bedrooms: 1,
    beds: 1,
    baths: 1,
    host: "Pousada Brisa Mar",
    amenities: [
      "Água quente",
      "Toalhas, lençóis, sabonete e papel higiênico",
      "Cabides",
      "Roupa de cama",
      "TV com TV a cabo",
      "Ar-condicionado",
      "Estacionamento gratuito na rua",
      "Acesso à praia (à beira-mar)",
      "Permitido animais",
      "Microondas",
      "Detector de fumaça",
      "Pátio ou varanda",
      "Alarme de monóxido de carbono"
    ],
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-34906169/original/1315303713/original.jpeg", // Imagem 1
      "https://a0.muscache.com/im/pictures/miso/Hosting-34906169/original/1315303201/original.jpeg", // Imagem 2
      "https://a0.muscache.com/im/pictures/miso/Hosting-34906169/original/1315303563/original.jpeg", // Imagem 3
      "https://a0.muscache.com/im/pictures/miso/Hosting-34906169/original/1315303931/original.jpeg", // Imagem 4
      "https://a0.muscache.com/im/pictures/miso/Hosting-34906169/original/1357590096/original.jpeg", // Imagem 5
      "https://a0.muscache.com/im/pictures/miso/Hosting-34906169/original/1357591438/original.jpeg"  // Imagem 6
    ],
    rating: 4.86,
    reviews: 118,
    type: "Casa"
  };

  try {
    const db = await getDb();
  if (!db) {
    console.error("❌ Erro: Banco de dados não disponível");
    return;
  }
  await db.insert(properties).values(noronhaProperty);
    console.log("Imóvel de Fernando de Noronha adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar imóvel de Fernando de Noronha:", error);
  }
}

seedNoronhaProperty();
console.log("Seeding concluído.");
