import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { 
  Calendar, MapPin, CheckCircle, XCircle, Clock, 
  AlertCircle, Home as HomeIcon, User, Bell
} from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: bookings, refetch } = trpc.bookings.myBookings.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: notifications } = trpc.notifications.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const confirmCheckInMutation = trpc.bookings.confirmCheckIn.useMutation({
    onSuccess: () => {
      toast.success("Check-in confirmado!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const confirmCheckOutMutation = trpc.bookings.confirmCheckOut.useMutation({
    onSuccess: () => {
      toast.success("Check-out confirmado!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const cancelBookingMutation = trpc.bookings.cancel.useMutation({
    onSuccess: () => {
      toast.success("Reserva cancelada");
      refetch();
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

  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(priceInCents / 100);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Pendente", variant: "outline" },
      confirmed: { label: "Confirmada", variant: "default" },
      checked_in: { label: "Check-in Feito", variant: "default" },
      checked_out: { label: "Check-out Feito", variant: "secondary" },
      completed: { label: "Concluída", variant: "secondary" },
      cancelled_by_guest: { label: "Cancelada", variant: "destructive" },
      cancelled_by_owner: { label: "Cancelada pelo Proprietário", variant: "destructive" },
      disputed: { label: "Em Disputa", variant: "destructive" },
    };

    const config = statusConfig[status] || { label: status, variant: "outline" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
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
            <Link href="/properties">
              <Button variant="ghost">Buscar Imóveis</Button>
            </Link>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium">{user?.name || user?.email}</span>
            </div>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FF7A00] via-[#FF2E63] to-[#D400FF] bg-clip-text text-transparent">
            Meu Dashboard
          </h1>
          <p className="text-gray-600">Gerencie suas reservas e acompanhe seu histórico</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-t-4 border-[#FF7A00]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-[#FF7A00]" />
                  Minhas Reservas
                </CardTitle>
                <CardDescription>Acompanhe todas as suas reservas</CardDescription>
              </CardHeader>
              <CardContent>
                {!bookings || bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Nenhuma reserva ainda</h3>
                    <p className="text-gray-600 mb-4">
                      Comece a explorar imóveis incríveis para suas próximas férias!
                    </p>
                    <Link href="/properties">
                      <Button className="bg-gradient-to-r from-[#FF7A00] to-[#FF2E63]">
                        Buscar Imóveis
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="border-2 border-gray-100 hover:border-[#FF7A00] transition-colors">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">Reserva #{booking.id}</CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1">
                                <MapPin className="h-4 w-4" />
                                Imóvel ID: {booking.propertyId}
                              </CardDescription>
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Check-in</p>
                              <p className="font-semibold">{formatDate(booking.checkIn)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Check-out</p>
                              <p className="font-semibold">{formatDate(booking.checkOut)}</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Valor Total:</span>
                              <span className="font-bold text-[#FF7A00]">{formatPrice(booking.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Taxa de reserva:</span>
                              <span className="font-semibold">{formatPrice(booking.depositAmount)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                              {booking.depositPaid ? (
                                <><CheckCircle className="h-3 w-3 text-green-500" /> Taxa paga (será devolvida no dia)</>
                              ) : (
                                <><Clock className="h-3 w-3 text-orange-500" /> Aguardando pagamento</>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              * Taxa devolvida no dia da reserva
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              {booking.guestCheckInConfirmed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-300" />
                              )}
                              <span>Meu check-in</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {booking.ownerCheckInConfirmed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-300" />
                              )}
                              <span>Check-in proprietário</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {booking.guestCheckOutConfirmed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-300" />
                              )}
                              <span>Meu check-out</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {booking.ownerCheckOutConfirmed ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-300" />
                              )}
                              <span>Check-out proprietário</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          {booking.status === "confirmed" && !booking.guestCheckInConfirmed && (
                            <Button
                              size="sm"
                              onClick={() => confirmCheckInMutation.mutate({ bookingId: booking.id })}
                              disabled={confirmCheckInMutation.isPending}
                            >
                              Confirmar Check-in
                            </Button>
                          )}
                          {booking.status === "checked_in" && !booking.guestCheckOutConfirmed && (
                            <Button
                              size="sm"
                              onClick={() => confirmCheckOutMutation.mutate({ bookingId: booking.id })}
                              disabled={confirmCheckOutMutation.isPending}
                            >
                              Confirmar Check-out
                            </Button>
                          )}
                          {booking.status === "pending" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => cancelBookingMutation.mutate({ bookingId: booking.id })}
                              disabled={cancelBookingMutation.isPending}
                            >
                              Cancelar Reserva
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="border-t-4 border-[#FF2E63]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/properties">
                  <Button className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FF2E63]">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Buscar Imóveis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Notifications */}
            {notifications && notifications.length > 0 && (
              <Card className="border-t-4 border-[#D400FF]">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <p className="font-semibold text-sm">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
