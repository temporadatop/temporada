import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Users, Bed, Bath, Star, Gift, Copy, Check } from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";
import { properties, Property } from "@/data/properties";
import { dynamicProperties } from "@/data/dynamicProperties";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function Properties() {
  const { user } = useAuth();
  const { city, loading: geoLoading } = useGeolocation();
  const [filters, setFilters] = useState({
    city: "",
    minCapacity: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
  });
  
  // Estado do modal de cupom
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  
  // Verificar se é a primeira vez do usuário e se já viu o modal
  useEffect(() => {
    if (user) {
      const hasSeenCoupon = localStorage.getItem('hasSeenWelcomeCoupon');
      if (!hasSeenCoupon) {
        // Mostrar modal após 1 segundo
        const timer = setTimeout(() => {
          setShowCouponModal(true);
          localStorage.setItem('hasSeenWelcomeCoupon', 'true');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [user]);
  
  // Copiar cupom
  const copyCoupon = () => {
    navigator.clipboard.writeText('#temporadatop');
    setCopiedCoupon(true);
    toast.success('Cupom copiado!');
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  // Combinar propriedades dinâmicas (com cidade do usuário) + propriedades fixas
  const allProperties: Property[] = useMemo(() => {
    // Criar propriedades dinâmicas com a cidade do usuário
    const dynamicPropsWithLocation = dynamicProperties.map((prop, index) => ({
      ...prop,
      id: 1000 + index, // IDs especiais para chácaras dinâmicas
      location: city ? `${city}, SP` : "São Paulo, SP",
    }));
    
    // Chácaras dinâmicas no TOPO + chácaras fixas
    return [...dynamicPropsWithLocation, ...properties];
  }, [city]);
  
  // Filtrar propriedades
  const filteredProperties = allProperties.filter(property => {
    if (filters.city && !property.location.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }
    if (filters.minCapacity && property.guests < filters.minCapacity) {
      return false;
    }
    if (filters.maxPrice && property.price_per_night > filters.maxPrice) {
      return false;
    }
    return true;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8 md:h-10 md:w-10" />
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {APP_TITLE}
                </h1>
              </div>
            </Link>
            <nav className="flex gap-2 md:gap-4">
              <Link href="/"><Button variant="ghost" size="sm" className="text-xs md:text-sm">Início</Button></Link>
              <Link href="/properties"><Button variant="default" size="sm" className="text-xs md:text-sm">Imóveis</Button></Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Filtros */}
        <Card className="mb-6 md:mb-8">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Filtrar Imóveis</CardTitle>
            <CardDescription className="text-sm md:text-base">Encontre a chácara perfeita para sua temporada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="Ex: Atibaia"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacidade Mínima</Label>
                <Select
                  value={filters.minCapacity?.toString() || ""}
                  onValueChange={(value) => setFilters({ ...filters, minCapacity: value ? parseInt(value) : undefined })}
                >
                  <SelectTrigger id="capacity">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2+ pessoas</SelectItem>
                    <SelectItem value="4">4+ pessoas</SelectItem>
                    <SelectItem value="6">6+ pessoas</SelectItem>
                    <SelectItem value="10">10+ pessoas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Preço Máximo/Noite</Label>
                <Select
                  value={filters.maxPrice?.toString() || ""}
                  onValueChange={(value) => setFilters({ ...filters, maxPrice: value ? parseInt(value) : undefined })}
                >
                  <SelectTrigger id="price">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="400">Até R$ 400</SelectItem>
                    <SelectItem value="500">Até R$ 500</SelectItem>
                    <SelectItem value="600">Até R$ 600</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setFilters({ city: "", minCapacity: undefined, maxPrice: undefined })}
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Propriedades */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Imóveis Disponíveis{city && ` próximo da Região de ${city}`}
          </h2>
          <p className="text-sm md:text-base text-gray-600">{filteredProperties.length} imóveis encontrados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src={property.photos[0]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x300/FF7A00/FFFFFF?text=Imóvel";
                  }}
                />
                {/* Badge para chácaras dinâmicas (ID >= 1000) */}
                {property.id >= 1000 && (
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                    🏡 Chácara até 10km de você
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{property.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-gray-500 text-sm">({property.reviews_count} avaliações)</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {property.guests}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      +{property.amenities.length - 3}
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatPrice(property.price_per_night)}
                  <span className="text-sm font-normal text-gray-500">/noite</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/property/${property.id}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    Ver Detalhes
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum imóvel encontrado com os filtros selecionados.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setFilters({ city: "", minCapacity: undefined, maxPrice: undefined })}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </main>
      
      {/* Modal de Cupom de Boas-Vindas */}
      <Dialog open={showCouponModal} onOpenChange={setShowCouponModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 rounded-full">
                <Gift className="h-12 w-12 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              🎉 Bem-vindo ao TemporadaTop!
            </DialogTitle>
            <DialogDescription className="text-center text-base mt-2">
              Aproveite seu <span className="font-bold text-orange-600">primeiro aluguel</span> com desconto especial!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg border-2 border-dashed border-orange-300">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">Seu cupom de desconto:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-2xl font-bold bg-white px-4 py-2 rounded border-2 border-orange-400 text-orange-600">
                    #temporadatop
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyCoupon}
                    className="border-orange-400 hover:bg-orange-50"
                  >
                    {copiedCoupon ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-orange-600" />
                    )}
                  </Button>
                </div>
                <p className="text-3xl font-bold text-orange-600 mt-3">
                  50% OFF
                </p>
                <p className="text-sm text-gray-600">
                  no valor total da sua primeira reserva!
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                ℹ️ <strong>Como usar:</strong> O cupom será aplicado automaticamente na sua primeira reserva. Escolha sua chácara favorita e aproveite!
              </p>
            </div>
          </div>
          
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            onClick={() => setShowCouponModal(false)}
          >
            Explorar Chácaras
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
