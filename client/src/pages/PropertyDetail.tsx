import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, APP_LOGO, APP_TITLE } from "@/const";
import { 
  MapPin, Users, Bed, Bath, Star, Calendar, 
  ArrowLeft, CheckCircle, AlertCircle, Home as HomeIcon 
} from "lucide-react";
import { toast } from "sonner";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const propertyId = parseInt(id || "0");
  const { data: property, isLoading } = trpc.properties.getById.useQuery({ id: propertyId });
  const { data: reviews } = trpc.reviews.getByProperty.useQuery({ propertyId });
  
  const createBookingMutation = trpc.bookings.create.useMutation({
    onSuccess: (data) => {
      toast.success("Reserva criada com sucesso!");
      toast.info(`Valor do depósito (10%): ${formatPrice(data.depositAmount)}`);
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar reserva");
    },
  });

  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceInCents / 100);
  };

  const parseAmenities = (amenitiesJson: string | null) => {
    if (!amenitiesJson) return [];
    try {
      return JSON.parse(amenitiesJson);
    } catch {
      return [];
    }
  };

  const getImages = (imagesJson: string | null) => {
    if (!imagesJson) return ["https://placehold.co/800x600/FF7A00/FFFFFF?text=Imóvel"];
    try {
      const images = JSON.parse(imagesJson);
      return images.length > 0 ? images : ["https://placehold.co/800x600/FF7A00/FFFFFF?text=Imóvel"];
    } catch {
      return ["https://placehold.co/800x600/FF7A00/FFFFFF?text=Imóvel"];
    }
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !property) return null;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return null;
    
    const total = days * property.pricePerNight;
    const deposit = Math.ceil(total * 0.1);
    
    return { days, total, deposit };
  };

  const handleReserve = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error("Selecione as datas de check-in e check-out");
      return;
    }

    const calculation = calculateTotal();
    if (!calculation || calculation.days <= 0) {
      toast.error("Datas inválidas");
      return;
    }

    createBookingMutation.mutate({
      propertyId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#FF7A00] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Imóvel não encontrado</h3>
            <Link href="/properties">
              <Button className="mt-4">Voltar para Busca</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const images = getImages(property.images);
  const amenities = parseAmenities(property.amenities);
  const calculation = calculateTotal();
  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] bg-clip-text text-transparent">
                {APP_TITLE}
              </span>
            </div>
          </Link>
        </div>
      </header>

      <div className="container py-8">
        <Link href="/properties">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Busca
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <Card className="overflow-hidden border-2 border-gray-100">
              <img
                src={images[0]}
                alt={property.title}
                className="w-full h-96 object-cover"
              />
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">{property.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <MapPin className="h-5 w-5" />
                      {property.city}, {property.state}
                    </CardDescription>
                  </div>
                  {reviews && reviews.length > 0 && (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] text-white px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold">{averageRating.toFixed(1)}</span>
                      <span className="text-sm">({reviews.length})</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#FF7A00]" />
                    <span className="font-semibold">{property.capacity} pessoas</span>
                  </div>
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-[#FF2E63]" />
                      <span className="font-semibold">{property.bedrooms} quartos</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-[#D400FF]" />
                      <span className="font-semibold">{property.bathrooms} banheiros</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Descrição</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                {amenities.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">Comodidades</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {amenities.map((amenity: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {property.rules && (
                  <div>
                    <h3 className="text-xl font-bold mb-3">Regras do Imóvel</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.rules}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            {reviews && reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Avaliações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-[#FF7A00] text-[#FF7A00]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="text-gray-600">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 border-2 border-[#FF7A00] shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {formatPrice(property.pricePerNight)}
                  <span className="text-base font-normal text-gray-600">/noite</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in</Label>
                  <input
                    id="checkIn"
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out</Label>
                  <input
                    id="checkOut"
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>

                {calculation && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{formatPrice(property.pricePerNight)} x {calculation.days} noites</span>
                      <span className="font-semibold">{formatPrice(calculation.total)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-[#FF7A00]">{formatPrice(calculation.total)}</span>
                    </div>
                    <div className="bg-gradient-to-r from-[#FF7A00]/10 to-[#FF2E63]/10 p-3 rounded-md">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Depósito para reserva (10%):
                      </p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] bg-clip-text text-transparent">
                        {formatPrice(calculation.deposit)}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        Valor devolvido após check-out confirmado
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] hover:opacity-90 font-bold text-lg py-6"
                  onClick={handleReserve}
                  disabled={createBookingMutation.isPending || !checkIn || !checkOut}
                >
                  {createBookingMutation.isPending ? (
                    <>Processando...</>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-5 w-5" />
                      Reservar Agora
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
