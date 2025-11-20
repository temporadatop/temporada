import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { 
  Home as HomeIcon, Plus, Edit, Trash2, Calendar, 
  Users, MapPin, DollarSign, Crown, CheckCircle, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

export default function OwnerDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showAddPropertyDialog, setShowAddPropertyDialog] = useState(false);
  
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    capacity: 1,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 100,
    rules: "",
    amenities: "",
  });

  const { data: properties, refetch: refetchProperties } = trpc.properties.getByOwner.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'owner',
  });

  const upgradeMutation = trpc.payments.upgradeToPremium.useMutation({
    onSuccess: () => {
      toast.success("Upgrade realizado com sucesso! Agora você pode cadastrar imóveis.");
      setShowUpgradeDialog(false);
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const createPropertyMutation = trpc.properties.create.useMutation({
    onSuccess: () => {
      toast.success("Imóvel cadastrado com sucesso!");
      setShowAddPropertyDialog(false);
      refetchProperties();
      setNewProperty({
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        capacity: 1,
        bedrooms: 1,
        bathrooms: 1,
        pricePerNight: 100,
        rules: "",
        amenities: "",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deletePropertyMutation = trpc.properties.delete.useMutation({
    onSuccess: () => {
      toast.success("Imóvel removido com sucesso!");
      refetchProperties();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#FF7A00] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const isPremium = user?.isPremium || user?.role === 'owner' || user?.role === 'admin';

  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceInCents / 100);
  };

  const handleCreateProperty = () => {
    if (!isPremium) {
      setShowUpgradeDialog(true);
      return;
    }

    createPropertyMutation.mutate({
      ...newProperty,
      pricePerNight: newProperty.pricePerNight * 100, // Convert to cents
    });
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
            <Link href="/">
              <Button variant="ghost">Início</Button>
            </Link>
            {isPremium && (
              <Badge className="bg-gradient-to-r from-[#FF7A00] to-[#FF2E63]">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
          </nav>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] bg-clip-text text-transparent">
            Painel do Proprietário
          </h1>
          <p className="text-gray-600">Gerencie seus imóveis e reservas</p>
        </div>

        {/* Premium Upgrade Card */}
        {!isPremium && (
          <Card className="mb-8 border-4 border-[#FF7A00] bg-gradient-to-br from-orange-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Crown className="h-6 w-6 text-[#FF7A00]" />
                Torne-se um Proprietário Premium
              </CardTitle>
              <CardDescription className="text-base">
                Pague apenas R$ 299,99 uma única vez e cadastre imóveis para sempre!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Taxa única vitalícia de R$ 299,99</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Cadastre quantos imóveis quiser</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Receba 100% do valor no check-in</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Gerencie calendário e disponibilidade</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] hover:opacity-90 font-bold text-lg"
                onClick={() => setShowUpgradeDialog(true)}
              >
                <Crown className="mr-2 h-5 w-5" />
                Fazer Upgrade Agora - R$ 299,99
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Properties List */}
        <Card className="border-t-4 border-[#FF7A00]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <HomeIcon className="h-6 w-6 text-[#FF7A00]" />
                  Meus Imóveis
                </CardTitle>
                <CardDescription>Gerencie todos os seus anúncios</CardDescription>
              </div>
              <Dialog open={showAddPropertyDialog} onOpenChange={setShowAddPropertyDialog}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-[#FF7A00] to-[#FF2E63]"
                    onClick={() => {
                      if (!isPremium) {
                        setShowUpgradeDialog(true);
                        setShowAddPropertyDialog(false);
                      }
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Imóvel
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Imóvel</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes do seu imóvel
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        value={newProperty.title}
                        onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                        placeholder="Ex: Chácara com piscina e churrasqueira"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descrição *</Label>
                      <Textarea
                        id="description"
                        value={newProperty.description}
                        onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                        placeholder="Descreva seu imóvel..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={newProperty.city}
                          onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={newProperty.state}
                          onChange={(e) => setNewProperty({ ...newProperty, state: e.target.value.toUpperCase() })}
                          maxLength={2}
                          placeholder="SP"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="address">Endereço Completo *</Label>
                      <Input
                        id="address"
                        value={newProperty.address}
                        onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="capacity">Capacidade *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newProperty.capacity}
                          onChange={(e) => setNewProperty({ ...newProperty, capacity: parseInt(e.target.value) })}
                          min={1}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bedrooms">Quartos</Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          value={newProperty.bedrooms}
                          onChange={(e) => setNewProperty({ ...newProperty, bedrooms: parseInt(e.target.value) })}
                          min={0}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bathrooms">Banheiros</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          value={newProperty.bathrooms}
                          onChange={(e) => setNewProperty({ ...newProperty, bathrooms: parseInt(e.target.value) })}
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="pricePerNight">Preço por Noite (R$) *</Label>
                      <Input
                        id="pricePerNight"
                        type="number"
                        value={newProperty.pricePerNight}
                        onChange={(e) => setNewProperty({ ...newProperty, pricePerNight: parseFloat(e.target.value) })}
                        min={1}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="amenities">Comodidades (separadas por vírgula)</Label>
                      <Input
                        id="amenities"
                        value={newProperty.amenities}
                        onChange={(e) => setNewProperty({ ...newProperty, amenities: e.target.value })}
                        placeholder="Ex: Piscina, Churrasqueira, Wi-Fi"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="rules">Regras do Imóvel</Label>
                      <Textarea
                        id="rules"
                        value={newProperty.rules}
                        onChange={(e) => setNewProperty({ ...newProperty, rules: e.target.value })}
                        placeholder="Ex: Não permitido animais, Silêncio após 22h..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#FF7A00] to-[#FF2E63]"
                      onClick={handleCreateProperty}
                      disabled={createPropertyMutation.isPending}
                    >
                      {createPropertyMutation.isPending ? "Cadastrando..." : "Cadastrar Imóvel"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {!isPremium ? (
              <div className="text-center py-12">
                <Crown className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">Faça o Upgrade para Cadastrar Imóveis</h3>
                <p className="text-gray-600 mb-4">
                  Torne-se premium e comece a anunciar seus imóveis hoje mesmo!
                </p>
              </div>
            ) : !properties || properties.length === 0 ? (
              <div className="text-center py-12">
                <HomeIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhum imóvel cadastrado</h3>
                <p className="text-gray-600 mb-4">
                  Comece cadastrando seu primeiro imóvel!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {properties.map((property) => (
                  <Card key={property.id} className="border-2 border-gray-100 hover:border-[#FF7A00] transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4" />
                            {property.city}, {property.state}
                          </CardDescription>
                        </div>
                        <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                          {property.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-[#FF7A00]" />
                          <span>{property.capacity} pessoas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-[#FF2E63]" />
                          <span className="font-bold">{formatPrice(property.pricePerNight)}/noite</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Link href={`/property/${property.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Ver Detalhes
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (confirm("Tem certeza que deseja remover este imóvel?")) {
                            deletePropertyMutation.mutate({ id: property.id });
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Crown className="h-6 w-6 text-[#FF7A00]" />
              Upgrade para Premium
            </DialogTitle>
            <DialogDescription>
              Pague apenas uma vez e tenha acesso vitalício
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] bg-clip-text text-transparent">
                R$ 299,99
              </p>
              <p className="text-sm text-gray-600 mt-2">Pagamento único • Acesso vitalício</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Cadastre ilimitados imóveis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Receba 100% do valor das estadias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Gerencie calendário e disponibilidade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Suporte prioritário</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] hover:opacity-90 font-bold text-lg py-6"
              onClick={() => upgradeMutation.mutate()}
              disabled={upgradeMutation.isPending}
            >
              {upgradeMutation.isPending ? "Processando..." : "Fazer Upgrade Agora"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
