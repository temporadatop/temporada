// Sistema de reservas usando localStorage

export interface Booking {
  id: string;
  userId: string;
  propertyId: number;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  depositPaid: boolean;
  depositAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

const BOOKINGS_KEY = 'temporadatop_bookings';

// Obter todas as reservas
export function getAllBookings(): Booking[] {
  const bookings = localStorage.getItem(BOOKINGS_KEY);
  return bookings ? JSON.parse(bookings) : [];
}

// Salvar reservas
function saveBookings(bookings: Booking[]) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

// Criar nova reserva
export function createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'status'>): { success: boolean; error?: string; booking?: Booking } {
  const bookings = getAllBookings();
  
  // Verificar se já existe reserva para as mesmas datas
  const hasConflict = bookings.some(b => 
    b.propertyId === data.propertyId &&
    b.status !== 'cancelled' &&
    (
      (data.checkIn >= b.checkIn && data.checkIn < b.checkOut) ||
      (data.checkOut > b.checkIn && data.checkOut <= b.checkOut) ||
      (data.checkIn <= b.checkIn && data.checkOut >= b.checkOut)
    )
  );
  
  if (hasConflict) {
    return { success: false, error: 'Já existe uma reserva para estas datas' };
  }
  
  // Criar nova reserva
  const newBooking: Booking = {
    ...data,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  bookings.push(newBooking);
  saveBookings(bookings);
  
  return { success: true, booking: newBooking };
}

// Obter reservas de um usuário
export function getUserBookings(userId: string): Booking[] {
  const bookings = getAllBookings();
  return bookings.filter(b => b.userId === userId);
}

// Obter reservas de uma propriedade
export function getPropertyBookings(propertyId: number): Booking[] {
  const bookings = getAllBookings();
  return bookings.filter(b => b.propertyId === propertyId && b.status !== 'cancelled');
}

// Atualizar status da reserva
export function updateBookingStatus(bookingId: string, status: Booking['status']): { success: boolean; error?: string; booking?: Booking } {
  const bookings = getAllBookings();
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    return { success: false, error: 'Reserva não encontrada' };
  }
  
  bookings[bookingIndex].status = status;
  saveBookings(bookings);
  
  return { success: true, booking: bookings[bookingIndex] };
}

// Marcar depósito como pago
export function markDepositAsPaid(bookingId: string): { success: boolean; error?: string; booking?: Booking } {
  const bookings = getAllBookings();
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    return { success: false, error: 'Reserva não encontrada' };
  }
  
  bookings[bookingIndex].depositPaid = true;
  bookings[bookingIndex].status = 'confirmed';
  saveBookings(bookings);
  
  return { success: true, booking: bookings[bookingIndex] };
}

// Cancelar reserva
export function cancelBooking(bookingId: string): { success: boolean; error?: string } {
  const bookings = getAllBookings();
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    return { success: false, error: 'Reserva não encontrada' };
  }
  
  bookings[bookingIndex].status = 'cancelled';
  saveBookings(bookings);
  
  return { success: true };
}

// Verificar disponibilidade
export function checkAvailability(propertyId: number, checkIn: string, checkOut: string): boolean {
  const bookings = getPropertyBookings(propertyId);
  
  return !bookings.some(b => 
    (checkIn >= b.checkIn && checkIn < b.checkOut) ||
    (checkOut > b.checkIn && checkOut <= b.checkOut) ||
    (checkIn <= b.checkIn && checkOut >= b.checkOut)
  );
}
