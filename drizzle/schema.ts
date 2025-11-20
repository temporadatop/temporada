import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with role field to differentiate between locatário, proprietário and admin
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "owner"]).default("user").notNull(),
  phone: varchar("phone", { length: 20 }),
  cpf: varchar("cpf", { length: 14 }),
  // Proprietário specific fields
  isPremium: boolean("isPremium").default(false).notNull(), // Pagou os R$ 299,99
  premiumPaidAt: timestamp("premiumPaidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Imóveis (chácaras, casas) cadastrados pelos proprietários
 */
export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(), // FK to users
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(), // Endereço completo (liberado após reserva)
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zipCode: varchar("zipCode", { length: 10 }),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  capacity: int("capacity").notNull(), // Número de pessoas
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  pricePerNight: int("pricePerNight").notNull(), // Preço por noite em centavos
  rules: text("rules"), // Regras do imóvel
  amenities: text("amenities"), // JSON string com comodidades
  images: text("images"), // JSON string com URLs das imagens
  status: mysqlEnum("status", ["active", "inactive", "pending"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Reservas feitas pelos locatários
 */
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(), // FK to properties
  guestId: int("guestId").notNull(), // FK to users (locatário)
  checkIn: timestamp("checkIn").notNull(),
  checkOut: timestamp("checkOut").notNull(),
  totalAmount: int("totalAmount").notNull(), // Valor total em centavos
  depositAmount: int("depositAmount").notNull(), // 10% do valor total em centavos
  depositPaid: boolean("depositPaid").default(false).notNull(),
  depositPaidAt: timestamp("depositPaidAt"),
  fullPaymentPaid: boolean("fullPaymentPaid").default(false).notNull(),
  fullPaymentPaidAt: timestamp("fullPaymentPaidAt"),
  depositReturned: boolean("depositReturned").default(false).notNull(),
  depositReturnedAt: timestamp("depositReturnedAt"),
  status: mysqlEnum("status", [
    "pending", // Aguardando pagamento dos 10%
    "confirmed", // 10% pago, aguardando check-in
    "checked_in", // Check-in confirmado
    "checked_out", // Check-out confirmado
    "completed", // Finalizado (10% devolvido)
    "cancelled_by_guest", // Cancelado pelo locatário
    "cancelled_by_owner", // Cancelado pelo proprietário
    "disputed" // Em disputa
  ]).default("pending").notNull(),
  guestCheckInConfirmed: boolean("guestCheckInConfirmed").default(false).notNull(),
  ownerCheckInConfirmed: boolean("ownerCheckInConfirmed").default(false).notNull(),
  guestCheckOutConfirmed: boolean("guestCheckOutConfirmed").default(false).notNull(),
  ownerCheckOutConfirmed: boolean("ownerCheckOutConfirmed").default(false).notNull(),
  problemReported: boolean("problemReported").default(false).notNull(),
  problemDescription: text("problemDescription"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

/**
 * Pagamentos realizados na plataforma
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // FK to users
  bookingId: int("bookingId"), // FK to bookings (null para pagamento de premium)
  type: mysqlEnum("type", [
    "premium_subscription", // R$ 299,99 do proprietário
    "booking_deposit", // 10% da reserva
    "booking_full", // Pagamento total da estadia
    "deposit_refund", // Devolução dos 10%
    "cancellation_penalty" // Penalidade de cancelamento
  ]).notNull(),
  amount: int("amount").notNull(), // Valor em centavos
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  transactionId: varchar("transactionId", { length: 255 }), // ID da transação no gateway
  gatewayResponse: text("gatewayResponse"), // JSON com resposta do gateway
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Avaliações dos imóveis
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(), // FK to properties
  bookingId: int("bookingId").notNull(), // FK to bookings
  guestId: int("guestId").notNull(), // FK to users
  rating: int("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Calendário de disponibilidade dos imóveis
 */
export const availability = mysqlTable("availability", {
  id: int("id").autoincrement().primaryKey(),
  propertyId: int("propertyId").notNull(), // FK to properties
  date: timestamp("date").notNull(),
  available: boolean("available").default(true).notNull(),
  reason: varchar("reason", { length: 255 }), // Motivo do bloqueio (reserva, manutenção, etc)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = typeof availability.$inferInsert;

/**
 * Notificações para usuários
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // FK to users
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", [
    "booking_request",
    "booking_confirmed",
    "payment_received",
    "check_in_reminder",
    "check_out_reminder",
    "review_request",
    "problem_reported",
    "general"
  ]).notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
