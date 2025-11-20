import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { MapPin, Users, Bed, Bath, Star, Calendar } from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Properties() {
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    minCapacity: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
  });

  const { data: properties, isLoading } = trpc.properties.list.useQuery(filters);

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

  const getFirstImage = (imagesJson: string | null) => {
    if (!imagesJson) return "https://placehold.co/400x300/FF7A00/FFFFFF?text=Imóvel";
    try {
      const images = JSON.parse(imagesJson);
      return images[0] || "https://placehold.co/400x300/FF7A00/FFFFFF?text=Imóvel";
    } catch {
      return "https://placehold.co/400x300/FF7A00/FFFFFF?text=Imóvel";
    }
  };

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
          
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Minhas Reservas</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        {/* Filters */}
        <Card className="mb-8 shadow-lg border-t-4 border-[#FF7A00]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] bg-clip-text text-transparent">
              Encontre Seu Imóvel Perfeito
            </CardTitle>
            <CardDescription>Use os filtros abaixo para refinar sua busca</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="Ex: São Paulo"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select
                  value={filters.state}
                  onValueChange={(value) => setFilters({ ...filters, state: value })}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidade Mínima</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Ex: 10"
                  value={filters.minCapacity || ""}
                  onChange={(e) => setFilters({ ...filters, minCapacity: e.target.value ? parseInt(e.target.value) : undefined })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxPrice">Preço Máximo/Noite</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Ex: 500"
                  value={filters.maxPrice || ""}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? parseInt(e.target.value) * 100 : undefined })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FF7A00] border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Carregando imóveis...</p>
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-2xl transition-shadow border-2 border-gray-100 hover:border-[#FF7A00]">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getFirstImage(property.images)}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {formatPrice(property.pricePerNight)}/noite
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold line-clamp-1">{property.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {property.city}, {property.state}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {property.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-[#FF7A00]" />
                      <span>{property.capacity} pessoas</span>
                    </div>
                    {property.bedrooms && (
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4 text-[#FF2E63]" />
                        <span>{property.bedrooms} quartos</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-[#D400FF]" />
                        <span>{property.bathrooms} banheiros</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Link href={`/property/${property.id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] hover:opacity-90 font-bold">
                      <Calendar className="mr-2 h-4 w-4" />
                      Ver Detalhes e Reservar
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">Nenhum imóvel encontrado</h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou explorar outras regiões
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
