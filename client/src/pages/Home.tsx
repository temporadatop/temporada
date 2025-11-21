import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_SLOGAN, APP_TITLE, getLoginUrl } from "@/const";
import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useGeolocation } from "@/hooks/useGeolocation";
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
  ArrowRight,
  Search,
  Key,
  ThumbsUp
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useLocalAuth();
  const { city, loading: geoLoading } = useGeolocation();

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
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] hover:opacity-90">
                Cadastrar
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF7A00] via-[#FF2E63] to-[#D400FF] py-12 md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Plataforma de Aluguel de Temporada</span>
            </div>
            
            <h1 className="mb-2 text-4xl font-black text-white md:text-5xl lg:text-6xl drop-shadow-lg">
              TemporadaTOP
            </h1>
            <p className="mb-6 text-2xl font-bold text-white/90 md:text-3xl italic drop-shadow-md">
              salvando a sua temporada!!!
            </p>
            
            <p className="mb-10 max-w-2xl text-lg text-white/90 md:text-xl font-medium">
              Encontre a chácara ou casa perfeita para suas férias, feriados e eventos especiais. 
              Reserve com segurança e praticidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-white text-[#FF2E63] hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-xl">
                  <Search className="mr-2 h-5 w-5" />
                  Quero Alugar Temporada
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white/50 font-bold text-lg px-8 py-6 shadow-xl cursor-not-allowed" 
                disabled
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Cadastrar Meu Imóvel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques - Fotos de Chácaras */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] bg-clip-text text-transparent">
              Imóveis em Destaque {city && `próximo da Região de ${city}`}
            </h2>
            <p className="text-lg text-gray-600">
              Reserve agora para as melhores datas do ano
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Chácara Natal */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/chacara-natal.jpg" 
                  alt="Chácara disponível para o Natal" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-green-600 text-white font-bold text-sm rounded-full shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  Disponível para o Natal
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Chácara Réveillon */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/chacara-reveillon.jpg" 
                  alt="Chácara disponível para o Réveillon" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] text-white font-bold text-sm rounded-full shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  Disponível Réveillon
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Chácara Carnaval */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/chacara-carnaval.jpg" 
                  alt="Chácara disponível para o Carnaval" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF2E63] to-[#D400FF] text-white font-bold text-sm rounded-full shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  Disponível Carnaval
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] bg-clip-text text-transparent">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Processo simples e seguro para locatários e proprietários
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Para Locatários */}
            <Card className="border-2 border-[#FF7A00]/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-[#FF7A00]/10 to-[#FF2E63]/10">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-8 w-8 text-[#FF7A00]" />
                  <CardTitle className="text-2xl">Para Locatários</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Alugue com segurança e praticidade
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Busque e Escolha</h3>
                    <p className="text-gray-600">
                      Encontre o imóvel perfeito por região, capacidade e comodidades
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Reserve com Segurança</h3>
                    <p className="text-gray-600">
                      Garanta sua reserva de forma rápida e segura
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Aproveite sua Estadia</h3>
                    <p className="text-gray-600">
                      Faça check-in e aproveite momentos inesquecíveis
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Avalie sua Experiência</h3>
                    <p className="text-gray-600">
                      Compartilhe sua opinião e ajude outros locatários
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Para Proprietários */}
            <Card className="border-2 border-[#D400FF]/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-[#FF2E63]/10 to-[#D400FF]/10">
                <div className="flex items-center gap-3 mb-2">
                  <HomeIcon className="h-8 w-8 text-[#D400FF]" />
                  <CardTitle className="text-2xl">Para Proprietários</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Anuncie e lucre com seu imóvel
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#D400FF] flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Cadastre-se na Plataforma</h3>
                    <p className="text-gray-600">
                      Crie sua conta e tenha acesso ao painel de proprietário
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#D400FF] flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Cadastre Seu Imóvel</h3>
                    <p className="text-gray-600">
                      Adicione fotos, descrição, regras e comodidades
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#D400FF] flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Receba Reservas</h3>
                    <p className="text-gray-600">
                      Seja notificado quando alguém reservar seu imóvel
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#D400FF] flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Gerencie com Facilidade</h3>
                    <p className="text-gray-600">
                      Controle reservas, calendário e receba pagamentos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Por Que Escolher */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] bg-clip-text text-transparent">
              Por Que Escolher o TemporadaTop?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-[#FF7A00] transition-colors shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63] flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Segurança Garantida</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sistema de pagamento seguro com retenção e confirmação de check-out
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-[#FF2E63] transition-colors shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-[#FF2E63] to-[#D400FF] flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Processo Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Reserve em minutos e receba confirmação instantânea com todos os detalhes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-[#D400FF] transition-colors shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-[#D400FF] to-[#FF7A00] flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Avaliações Reais</CardTitle>
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
      <section className="py-20 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto Para Começar?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão aproveitando suas temporadas com segurança e praticidade
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-[#FF2E63] hover:bg-white/90 font-bold text-xl px-10 py-7 shadow-2xl">
              Buscar Imóveis Agora
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10" />
                <span className="text-xl font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-gray-400">
                {APP_SLOGAN}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Para Você</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white transition-colors">Buscar Imóveis</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Como Funciona</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Minhas Reservas</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Para Proprietários</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white transition-colors">Cadastrar Imóvel</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Gerenciar Anúncios</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TemporadaTop. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
