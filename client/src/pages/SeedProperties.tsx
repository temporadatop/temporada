import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

// Dados da chácara fictícia para MVP
const CHACARA_RECANTO_SERRANO = {
  title: 'Chácara Recanto Serrano',
  description: `Hospede-se em uma chácara charmosa no estilo europeu montanhês, ideal para quem busca conforto e contato com a natureza. 

A propriedade oferece uma decoração rústica e elegante, complementada por uma variedade de comodidades premium, incluindo sauna, piscina aquecida, sala de jogos, churrasqueira gourmet, academia completa e um lindo lago com peixes ornamentais.

Perfeita para famílias, grupos de amigos ou eventos especiais. Ambiente tranquilo e seguro, cercado pela natureza, mas com fácil acesso à cidade.`,
  address: 'Região Serrana',
  city: 'dynamic',
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
};

export default function SeedProperties() {
  const [loading, setLoading] = useState(false);
  const createProperty = trpc.properties.create.useMutation();

  const handleSeedChacara = async () => {
    setLoading(true);
    try {
      await createProperty.mutateAsync(CHACARA_RECANTO_SERRANO);
      toast.success('✅ Chácara Recanto Serrano criada com sucesso!');
    } catch (error: any) {
      toast.error(`❌ Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-8">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
          Seed Properties - Admin
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Chácara Recanto Serrano</CardTitle>
            <CardDescription>
              Primeira chácara fictícia para MVP
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                <strong>Capacidade:</strong> 15 pessoas
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Quartos:</strong> 5 | <strong>Banheiros:</strong> 4
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Preço:</strong> R$ 350/noite
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Comodidades:</strong> Piscina, Sauna, Lago, Churrasqueira, Academia, Wi-Fi, etc.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Imagens:</strong> 4 fotos
              </p>
            </div>

            <Button 
              onClick={handleSeedChacara}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700"
            >
              {loading ? 'Criando...' : 'Criar Chácara'}
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Atenção:</strong> Esta página é apenas para administradores. Você precisa estar logado como proprietário (owner) para criar imóveis.
          </p>
        </div>
      </div>
    </div>
  );
}
