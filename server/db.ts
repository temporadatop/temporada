import { eq, and, gte, lte, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  InsertUser, 
  users, 
  properties, 
  bookings, 
  payments, 
  reviews, 
  availability, 
  notifications,
  InsertProperty,
  InsertBooking,
  InsertPayment,
  InsertReview,
  InsertAvailability,
  InsertNotification
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER HELPERS ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "phone", "cpf"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (user.isPremium !== undefined) {
      values.isPremium = user.isPremium;
      updateSet.isPremium = user.isPremium;
    }

    if (user.premiumPaidAt !== undefined) {
      values.premiumPaidAt = user.premiumPaidAt;
      updateSet.premiumPaidAt = user.premiumPaidAt;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserPremiumStatus(userId: number, isPremium: boolean, paidAt?: Date) {
  const db = await getDb();
  if (!db) return;
  await db.update(users)
    .set({ 
      isPremium, 
      premiumPaidAt: paidAt || new Date(),
      role: isPremium ? 'owner' : 'user'
    })
    .where(eq(users.id, userId));
}

// ============ PROPERTY HELPERS ============

export async function createProperty(property: InsertProperty) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(properties).values(property);
  return result;
}

export async function getPropertyById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPropertiesByOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(properties).where(eq(properties.ownerId, ownerId));
}

export async function getAllActiveProperties() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(properties).where(eq(properties.status, 'active'));
}

export async function updateProperty(id: number, data: Partial<InsertProperty>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(properties).set(data).where(eq(properties.id, id));
}

export async function deleteProperty(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(properties).where(eq(properties.id, id));
}

// ============ BOOKING HELPERS ============

export async function createBooking(booking: InsertBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(bookings).values(booking);
  return result;
}

export async function getBookingById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getBookingsByGuest(guestId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(bookings)
    .where(eq(bookings.guestId, guestId))
    .orderBy(desc(bookings.createdAt));
}

export async function getBookingsByProperty(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(bookings)
    .where(eq(bookings.propertyId, propertyId))
    .orderBy(desc(bookings.createdAt));
}

export async function updateBooking(id: number, data: Partial<InsertBooking>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(bookings).set(data).where(eq(bookings.id, id));
}

export async function checkPropertyAvailability(propertyId: number, checkIn: Date, checkOut: Date) {
  const db = await getDb();
  if (!db) return true;
  
  const conflictingBookings = await db.select().from(bookings)
    .where(
      and(
        eq(bookings.propertyId, propertyId),
        sql`${bookings.status} NOT IN ('cancelled_by_guest', 'cancelled_by_owner')`,
        sql`${bookings.checkIn} < ${checkOut}`,
        sql`${bookings.checkOut} > ${checkIn}`
      )
    );
  
  return conflictingBookings.length === 0;
}

// ============ PAYMENT HELPERS ============

export async function createPayment(payment: InsertPayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(payments).values(payment);
  return result;
}

export async function getPaymentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPaymentsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(payments)
    .where(eq(payments.userId, userId))
    .orderBy(desc(payments.createdAt));
}

export async function getPaymentsByBooking(bookingId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(payments)
    .where(eq(payments.bookingId, bookingId))
    .orderBy(desc(payments.createdAt));
}

export async function updatePayment(id: number, data: Partial<InsertPayment>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(payments).set(data).where(eq(payments.id, id));
}

// ============ REVIEW HELPERS ============

export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(reviews).values(review);
  return result;
}

export async function getReviewsByProperty(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(reviews)
    .where(eq(reviews.propertyId, propertyId))
    .orderBy(desc(reviews.createdAt));
}

export async function getReviewsByGuest(guestId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(reviews)
    .where(eq(reviews.guestId, guestId))
    .orderBy(desc(reviews.createdAt));
}

// ============ AVAILABILITY HELPERS ============

export async function setPropertyAvailability(data: InsertAvailability) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(availability).values(data);
  return result;
}

export async function getPropertyAvailability(propertyId: number, startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(availability)
    .where(
      and(
        eq(availability.propertyId, propertyId),
        gte(availability.date, startDate),
        lte(availability.date, endDate)
      )
    );
}

// ============ NOTIFICATION HELPERS ============

export async function createNotification(notification: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(notifications).values(notification);
  return result;
}

export async function getNotificationsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt));
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
}

export async function getUnreadNotificationsCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` })
    .from(notifications)
    .where(and(
      eq(notifications.userId, userId),
      eq(notifications.read, false)
    ));
  return result[0]?.count || 0;
}
