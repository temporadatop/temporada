import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extended with role field to differentiate between locatário, proprietário and admin
 */
export const roleEnum = pgEnum("role", ["user", "admin", "owner"]);

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  phone: varchar("phone", { length: 20 }),
  cpf: varchar("cpf", { length: 14 }),
  // Proprietário specific fields
  isPremium: boolean("isPremium").default(false).notNull(), // Pagou os R$ 299,99
  premiumPaidAt: timestamp("premiumPaidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Imóveis (chácaras, casas) cadastrados pelos proprietários
 */
export const propertyStatusEnum = pgEnum("property_status", ["active", "inactive", "pending"]);

export const properties = pgTable("properties", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  ownerId: integer("ownerId").notNull(), // FK to users
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(), // Endereço completo (liberado após reserva)
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zipCode: varchar("zipCode", { length: 10 }),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  capacity: integer("capacity").notNull(), // Número de pessoas
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  pricePerNight: integer("pricePerNight").notNull(), // Preço por noite em centavos
  rules: text("rules"), // Regras do imóvel
  amenities: text("amenities"), // JSON string com comodidades
  images: text("images"), // JSON string com URLs das imagens
  status: propertyStatusEnum("status").default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Reservas feitas pelos locatários
 */
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "checked_in",
  "checked_out",
  "completed",
  "cancelled_by_guest",
  "cancelled_by_owner",
  "disputed"
]);

export const bookings = pgTable("bookings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  propertyId: integer("propertyId").notNull(),
  guestId: integer("guestId").notNull(), // FK to users
  checkIn: timestamp("checkIn").notNull(),
  checkOut: timestamp("checkOut").notNull(),
  totalAmount: integer("totalAmount").notNull(), // Valor total em centavos
  depositAmount: integer("depositAmount").notNull(), // 10% do valor total
  depositPaid: boolean("depositPaid").default(false).notNull(),
  depositPaidAt: timestamp("depositPaidAt"),
  fullPaymentAmount: integer("fullPaymentAmount").notNull(), // 90% restante
  fullPaymentPaid: boolean("fullPaymentPaid").default(false).notNull(),
  fullPaymentPaidAt: timestamp("fullPaymentPaidAt"),
  depositRefunded: boolean("depositRefunded").default(false).notNull(),
  depositRefundedAt: timestamp("depositRefundedAt"),
  status: bookingStatusEnum("status").default("pending").notNull(),
  // Check-in/Check-out confirmations
  guestCheckInConfirmed: boolean("guestCheckInConfirmed").default(false).notNull(),
  ownerCheckInConfirmed: boolean("ownerCheckInConfirmed").default(false).notNull(),
  guestCheckOutConfirmed: boolean("guestCheckOutConfirmed").default(false).notNull(),
  ownerCheckOutConfirmed: boolean("ownerCheckOutConfirmed").default(false).notNull(),
  // Problemas reportados
  hasIssues: boolean("hasIssues").default(false).notNull(),
  issueDescription: text("issueDescription"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

/**
 * Pagamentos (taxa de R$ 299,99 dos proprietários e depósitos dos locatários)
 */
export const paymentTypeEnum = pgEnum("payment_type", ["premium_upgrade", "deposit", "full_payment", "refund"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "completed", "failed", "refunded"]);

export const payments = pgTable("payments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(), // FK to users
  bookingId: integer("bookingId"), // Null para premium upgrade
  type: paymentTypeEnum("type").notNull(),
  amount: integer("amount").notNull(), // Em centavos
  status: paymentStatusEnum("status").default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  transactionId: varchar("transactionId", { length: 255 }),
  metadata: text("metadata"), // JSON string com dados adicionais
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Avaliações dos imóveis
 */
export const reviews = pgTable("reviews", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  propertyId: integer("propertyId").notNull(),
  bookingId: integer("bookingId").notNull(),
  guestId: integer("guestId").notNull(),
  rating: integer("rating").notNull(), // 1-5 estrelas
  comment: text("comment"),
  response: text("response"), // Resposta do proprietário
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Calendário de disponibilidade dos imóveis
 */
export const availability = pgTable("availability", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  propertyId: integer("propertyId").notNull(),
  date: timestamp("date").notNull(),
  available: boolean("available").default(true).notNull(),
  priceOverride: integer("priceOverride"), // Preço especial para esta data (em centavos)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = typeof availability.$inferInsert;

/**
 * Notificações para usuários
 */
export const notifications = pgTable("notifications", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  metadata: text("metadata"), // JSON string com dados adicionais
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
