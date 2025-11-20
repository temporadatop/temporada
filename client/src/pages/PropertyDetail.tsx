import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { APP_LOGO, APP_TITLE } from "@/const";
import { properties } from "@/data/properties";
import { createBooking, checkAvailability } from "@/lib/bookings";
import { 
  MapPin, Users, Bed, Bath, Star, Calendar, 
  ArrowLeft, CheckCircle
} from "lucide-react";
import { toast } from "sonner";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useLocalAuth();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const property = properties.find(p => p.id === parseInt(id || "0"));

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Imóvel não encontrado</h1>
          <Link href="/properties">
            <Button>Voltar para Imóveis</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * property.price_per_night : 0;
  };

  const handleReservation = () => {
    if (!isAuthenticated || !user) {
      toast.error("Você precisa fazer login para reservar");
      setLocation("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error("Selecione as datas de check-in e check-out");
      return;
    }

    if (guests > property.guests) {
      toast.error(`Este imóvel acomoda no máximo ${property.guests} pessoas`);
      return;
    }

    // Verificar disponibilidade
    const available = checkAvailability(property.id, checkIn, checkOut);
    if (!available) {
      toast.error("Imóvel não disponível para estas datas");
      return;
    }

    const totalPrice = calculateTotalPrice();
    const depositAmount = totalPrice * 0.1; // 10% de depósito

    const result = createBooking({
      userId: user.id,
      propertyId: property.id,
      propertyName: property.name,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      depositPaid: false,
      depositAmount,
    });

    if (result.success) {
      toast.success("Reserva criada com sucesso!");
      toast.info(`Valor do depósito (10%): ${formatPrice(depositAmount)}`);
      setLocation("/dashboard");
    } else {
      toast.error(result.error || "Erro ao criar reserva");
    }
  };

  const totalPrice = calculateTotalPrice();
  const depositAmount = totalPrice * 0.1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {APP_TITLE}
                </h1>
              </div>
            </Link>
            <nav className="flex gap-4">
              <Link href="/"><Button variant="ghost">Início</Button></Link>
              <Link href="/properties"><Button variant="ghost">Imóveis</Button></Link>
              {isAuthenticated && <Link href="/dashboard"><Button variant="ghost">Minhas Reservas</Button></Link>}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <Link href="/properties">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Imóveis
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2">
            {/* Galeria de Fotos */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="col-span-2 h-96 overflow-hidden rounded-lg">
                <img
                  src={property.photos[0]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/800x600/FF7A00/FFFFFF?text=Imóvel";
                  }}
                />
              </div>
              {property.photos.slice(1, 5).map((photo, index) => (
                <div key={index} className="h-48 overflow-hidden rounded-lg">
                  <img
                    src={photo}
                    alt={`${property.name} - ${index + 2}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/400x300/FF7A00/FFFFFF?text=Imóvel";
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Informações Principais */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{property.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <MapPin className="h-5 w-5" />
                      {property.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{property.rating}</span>
                    <span className="text-gray-500">({property.reviews_count})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{property.guests} hóspedes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    <span>{property.bedrooms} quartos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5" />
                    <span>{property.bathrooms} banheiros</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-3">Sobre este espaço</h3>
                  <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Comodidades */}
            <Card>
              <CardHeader>
                <CardTitle>Comodidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Card de Reserva */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {formatPrice(property.price_per_night)}
                  <span className="text-base font-normal text-gray-500">/noite</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="checkIn">Check-in</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="checkOut">Check-out</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="guests">Hóspedes</Label>
                  <Input
                    id="guests"
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    min={1}
                    max={property.guests}
                  />
                </div>

                {totalPrice > 0 && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Total da estadia</span>
                      <span className="font-semibold">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Depósito (10%)</span>
                      <span>{formatPrice(depositAmount)}</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  onClick={handleReservation}
                  disabled={!checkIn || !checkOut}
                >
                  {isAuthenticated ? "Reservar" : "Fazer Login para Reservar"}
                </Button>

                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 text-center">
                    Você precisa fazer login para reservar
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
