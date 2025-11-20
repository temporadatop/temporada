import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_SLOGAN, APP_TITLE, getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Home as HomeIcon, 
  CheckCircle, 
  Shield, 
  Clock, 
  Star, 
  MapPin, 
  Calendar,
  CreditCard,
  Users,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Header/Navbar */}
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
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/properties">
                  <Button variant="ghost">Imóveis</Button>
                </Link>
              </>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="ghost">Entrar</Button>
                </a>
                <a href={getLoginUrl()}>
                  <Button className="bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] hover:opacity-90">
                    Cadastrar
                  </Button>
                </a>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF7A00] via-[#FF2E63] to-[#D400FF] py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Plataforma de Aluguel de Temporada</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-black text-white md:text-6xl lg:text-7xl drop-shadow-lg">
              {APP_SLOGAN}
            </h1>
            
            <p className="mb-10 max-w-2xl text-lg text-white/90 md:text-xl font-medium">
              Encontre a chácara ou casa perfeita para suas férias, feriados e eventos especiais. 
              Reserve com segurança pagando apenas 10% do valor total.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={isAuthenticated ? "/properties" : getLoginUrl()}>
                <Button size="lg" className="bg-white text-[#FF2E63] hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-2xl">
                  <MapPin className="mr-2 h-5 w-5" />
                  Quero Alugar Temporada
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              
              <a href={isAuthenticated ? "/owner/properties" : getLoginUrl()}>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6 backdrop-blur-sm shadow-2xl">
                  <HomeIcon className="mr-2 h-5 w-5" />
                  Cadastrar Meu Imóvel
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] bg-clip-text text-transparent">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Processo simples e seguro para locatários e proprietários
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Para Locatários */}
            <Card className="border-2 border-[#FF7A00]/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#FF7A00] flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Para Locatários
                </CardTitle>
                <CardDescription className="text-base">Alugue com segurança e praticidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">1. Busque e Escolha</p>
                    <p className="text-sm text-gray-600">Encontre o imóvel perfeito por região, capacidade e comodidades</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-[#FF2E63] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">2. Reserve Pagando 10%</p>
                    <p className="text-sm text-gray-600">Garanta sua reserva com apenas 10% do valor total</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-[#D400FF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">3. Pague o Restante no Check-in</p>
                    <p className="text-sm text-gray-600">Complete o pagamento ao chegar no imóvel</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">4. Receba os 10% de Volta</p>
                    <p className="text-sm text-gray-600">Após o check-out, os 10% são devolvidos automaticamente</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Para Proprietários */}
            <Card className="border-2 border-[#FF2E63]/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#FF2E63] flex items-center gap-2">
                  <HomeIcon className="h-6 w-6" />
                  Para Proprietários
                </CardTitle>
                <CardDescription className="text-base">Anuncie e lucre com seu imóvel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">1. Pague R$ 299,99 (Único)</p>
                    <p className="text-sm text-gray-600">Taxa vitalícia para cadastrar seu imóvel na plataforma</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-[#FF2E63] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">2. Cadastre Seu Imóvel</p>
                    <p className="text-sm text-gray-600">Adicione fotos, descrição, regras e comodidades</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-[#D400FF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">3. Receba Reservas</p>
                    <p className="text-sm text-gray-600">Seja notificado quando alguém reservar seu imóvel</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">4. Receba o Pagamento Total</p>
                    <p className="text-sm text-gray-600">Valor integral creditado no dia do check-in</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] bg-clip-text text-transparent">
              Por Que Escolher o TemporadaTop?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#FF7A00]">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF2E63]">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Segurança Garantida</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sistema de pagamento seguro com retenção dos 10% até o check-out confirmado
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#FF2E63]">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FF2E63] to-[#D400FF]">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Processo Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Reserve em minutos e receba confirmação instantânea com todos os detalhes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#D400FF]">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D400FF] to-[#FF7A00]">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Avaliações Reais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sistema de avaliações verificadas para garantir a melhor experiência
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto Para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão aproveitando suas temporadas com segurança e praticidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={isAuthenticated ? "/properties" : getLoginUrl()}>
              <Button size="lg" className="bg-white text-[#FF2E63] hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-2xl">
                Buscar Imóveis Agora
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />
                <span className="text-xl font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-gray-400 text-sm">{APP_SLOGAN}</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Para Você</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Buscar Imóveis</a></li>
                <li><a href="#" className="hover:text-white">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white">Minhas Reservas</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Para Proprietários</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Cadastrar Imóvel</a></li>
                <li><a href="#" className="hover:text-white">Gerenciar Anúncios</a></li>
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 {APP_TITLE}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
