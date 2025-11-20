import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Bed, Bath, Star } from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";
import { properties } from "@/data/properties";

export default function Properties() {
  const [filters, setFilters] = useState({
    city: "",
    minCapacity: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
  });

  // Filtrar propriedades
  const filteredProperties = properties.filter(property => {
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
              <Link href="/properties"><Button variant="default">Imóveis</Button></Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtrar Imóveis</CardTitle>
            <CardDescription>Encontre a chácara perfeita para sua temporada</CardDescription>
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Imóveis Disponíveis</h2>
          <p className="text-gray-600">{filteredProperties.length} imóveis encontrados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.photos[0]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x300/FF7A00/FFFFFF?text=Imóvel";
                  }}
                />
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
    </div>
  );
}
