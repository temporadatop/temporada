import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import * as db from "./db";

// Helper to check if user is property owner
const ownerProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'owner' && ctx.user.role !== 'admin') {
    throw new TRPCError({ 
      code: 'FORBIDDEN',
      message: 'Você precisa ser proprietário para acessar esta funcionalidade. Faça o upgrade pagando a taxa de R$ 299,99.'
    });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        cpf: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertUser({
          openId: ctx.user.openId,
          ...input,
        });
        return { success: true };
      }),
  }),

  // ============ PROPERTIES ROUTER ============
  properties: router({
    list: publicProcedure
      .input(z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        minCapacity: z.number().optional(),
        maxPrice: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        const allProperties = await db.getAllActiveProperties();
        
        if (!input) return allProperties;
        
        return allProperties.filter(prop => {
          if (input.city && prop.city !== input.city) return false;
          if (input.state && prop.state !== input.state) return false;
          if (input.minCapacity && prop.capacity < input.minCapacity) return false;
          if (input.maxPrice && prop.pricePerNight > input.maxPrice) return false;
          return true;
        });
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const property = await db.getPropertyById(input.id);
        if (!property) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Imóvel não encontrado' });
        }
        return property;
      }),

    getByOwner: ownerProcedure
      .query(async ({ ctx }) => {
        return await db.getPropertiesByOwner(ctx.user.id);
      }),

    create: publicProcedure // TEMPORÁRIO: Liberado sem login para seed
      .input(z.object({
        title: z.string().min(5),
        description: z.string().min(20),
        address: z.string(),
        city: z.string(),
        state: z.string().length(2),
        zipCode: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        capacity: z.number().min(1),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        pricePerNight: z.number().min(1),
        rules: z.string().optional(),
        amenities: z.string().optional(),
        images: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createProperty({
          ...input,
          ownerId: 1, // TEMPORÁRIO: Admin padrão
          status: 'active',
        });
        return { success: true };
      }),

    update: ownerProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(5).optional(),
        description: z.string().min(20).optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().length(2).optional(),
        zipCode: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        capacity: z.number().min(1).optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        pricePerNight: z.number().min(1).optional(),
        rules: z.string().optional(),
        amenities: z.string().optional(),
        images: z.string().optional(),
        status: z.enum(['active', 'inactive', 'pending']).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        const property = await db.getPropertyById(id);
        
        if (!property) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Imóvel não encontrado' });
        }
        
        if (property.ownerId !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Você não tem permissão para editar este imóvel' });
        }
        
        await db.updateProperty(id, data);
        return { success: true };
      }),

    delete: ownerProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const property = await db.getPropertyById(input.id);
        
        if (!property) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Imóvel não encontrado' });
        }
        
        if (property.ownerId !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Você não tem permissão para deletar este imóvel' });
        }
        
        await db.deleteProperty(input.id);
        return { success: true };
      }),
  }),

  // ============ BOOKINGS ROUTER ============
  bookings: router({
    myBookings: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getBookingsByGuest(ctx.user.id);
      }),

    propertyBookings: ownerProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ ctx, input }) => {
        const property = await db.getPropertyById(input.propertyId);
        if (!property) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Imóvel não encontrado' });
        }
        if (property.ownerId !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        return await db.getBookingsByProperty(input.propertyId);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const booking = await db.getBookingById(input.id);
        if (!booking) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Reserva não encontrada' });
        }
        
        // Check if user has access to this booking
        const property = await db.getPropertyById(booking.propertyId);
        if (booking.guestId !== ctx.user.id && property?.ownerId !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        
        return booking;
      }),

    create: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        checkIn: z.date(),
        checkOut: z.date(),
      }))
      .mutation(async ({ ctx, input }) => {
        const property = await db.getPropertyById(input.propertyId);
        if (!property) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Imóvel não encontrado' });
        }

        // Check availability
        const isAvailable = await db.checkPropertyAvailability(
          input.propertyId,
          input.checkIn,
          input.checkOut
        );

        if (!isAvailable) {
          throw new TRPCError({ 
            code: 'BAD_REQUEST', 
            message: 'Imóvel não disponível para as datas selecionadas' 
          });
        }

        // Calculate total amount
        const days = Math.ceil((input.checkOut.getTime() - input.checkIn.getTime()) / (1000 * 60 * 60 * 24));
        const totalAmount = days * property.pricePerNight;
        const depositAmount = Math.ceil(totalAmount * 0.1); // 10%

        await db.createBooking({
          propertyId: input.propertyId,
          guestId: ctx.user.id,
          checkIn: input.checkIn,
          checkOut: input.checkOut,
          totalAmount,
          depositAmount,
          fullPaymentAmount: totalAmount - depositAmount,
          status: 'pending',
        });

        return { success: true, totalAmount, depositAmount };
      }),

    confirmCheckIn: protectedProcedure
      .input(z.object({ bookingId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const booking = await db.getBookingById(input.bookingId);
        if (!booking) {
          throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const property = await db.getPropertyById(booking.propertyId);
        const isGuest = booking.guestId === ctx.user.id;
        const isOwner = property?.ownerId === ctx.user.id;

        if (!isGuest && !isOwner) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }

        const updateData: any = {};
        if (isGuest) {
          updateData.guestCheckInConfirmed = true;
        }
        if (isOwner) {
          updateData.ownerCheckInConfirmed = true;
        }

        // If both confirmed, update status
        if ((isGuest && booking.ownerCheckInConfirmed) || (isOwner && booking.guestCheckInConfirmed)) {
          updateData.status = 'checked_in';
        }

        await db.updateBooking(input.bookingId, updateData);
        return { success: true };
      }),

    confirmCheckOut: protectedProcedure
      .input(z.object({ bookingId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const booking = await db.getBookingById(input.bookingId);
        if (!booking) {
          throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const property = await db.getPropertyById(booking.propertyId);
        const isGuest = booking.guestId === ctx.user.id;
        const isOwner = property?.ownerId === ctx.user.id;

        if (!isGuest && !isOwner) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }

        const updateData: any = {};
        if (isGuest) {
          updateData.guestCheckOutConfirmed = true;
        }
        if (isOwner) {
          updateData.ownerCheckOutConfirmed = true;
        }

        // If both confirmed and no problems, update status to completed
        if ((isGuest && booking.ownerCheckOutConfirmed) || (isOwner && booking.guestCheckOutConfirmed)) {
          if (!booking.hasIssues) {
            updateData.status = 'checked_out';
            updateData.depositReturned = true;
            updateData.depositReturnedAt = new Date();
          } else {
            updateData.status = 'disputed';
          }
        }

        await db.updateBooking(input.bookingId, updateData);
        return { success: true };
      }),

    reportProblem: ownerProcedure
      .input(z.object({
        bookingId: z.number(),
        description: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const booking = await db.getBookingById(input.bookingId);
        if (!booking) {
          throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const property = await db.getPropertyById(booking.propertyId);
        if (property?.ownerId !== ctx.user.id && ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }

        await db.updateBooking(input.bookingId, {
          hasIssues: true,
          issueDescription: input.description,
          status: 'disputed',
        });

        return { success: true };
      }),

    cancel: protectedProcedure
      .input(z.object({ bookingId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const booking = await db.getBookingById(input.bookingId);
        if (!booking) {
          throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const property = await db.getPropertyById(booking.propertyId);
        const isGuest = booking.guestId === ctx.user.id;
        const isOwner = property?.ownerId === ctx.user.id;

        if (!isGuest && !isOwner) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }

        const status = isGuest ? 'cancelled_by_guest' : 'cancelled_by_owner';
        await db.updateBooking(input.bookingId, { status });

        return { success: true };
      }),
  }),

  // ============ PAYMENTS ROUTER ============
  payments: router({
    myPayments: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getPaymentsByUser(ctx.user.id);
      }),

    upgradeToPremium: protectedProcedure
      .mutation(async ({ ctx }) => {
        // In production, this would integrate with payment gateway
        // For now, we'll simulate the payment
        
        if (ctx.user.isPremium) {
          throw new TRPCError({ 
            code: 'BAD_REQUEST', 
            message: 'Você já é um usuário premium' 
          });
        }

        // Create payment record
        await db.createPayment({
          userId: ctx.user.id,
          type: "premium_upgrade",
          amount: 29999, // R$ 299,99 em centavos
          status: 'pending',
        });

        return { 
          success: true,
          message: 'Pagamento iniciado. Você será redirecionado para o gateway de pagamento.',
          // In production, return payment URL from gateway
        };
      }),

    confirmPremiumPayment: protectedProcedure
      .input(z.object({
        transactionId: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // This would be called by webhook or after payment confirmation
        await db.updateUserPremiumStatus(ctx.user.id, true, new Date());
        
        return { success: true };
      }),

    processBookingDeposit: protectedProcedure
      .input(z.object({
        bookingId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const booking = await db.getBookingById(input.bookingId);
        if (!booking) {
          throw new TRPCError({ code: 'NOT_FOUND' });
        }

        if (booking.guestId !== ctx.user.id) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }

        if (booking.depositPaid) {
          throw new TRPCError({ 
            code: 'BAD_REQUEST', 
            message: 'Depósito já foi pago' 
          });
        }

        // Create payment record
        await db.createPayment({
          userId: ctx.user.id,
          bookingId: input.bookingId,
          type: "deposit",
          amount: booking.depositAmount,
          status: 'pending',
        });

        return { 
          success: true,
          amount: booking.depositAmount,
        };
      }),
  }),

  // ============ REVIEWS ROUTER ============
  reviews: router({
    getByProperty: publicProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getReviewsByProperty(input.propertyId);
      }),

    create: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        bookingId: z.number(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const booking = await db.getBookingById(input.bookingId);
        if (!booking) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Reserva não encontrada' });
        }

        if (booking.guestId !== ctx.user.id) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }

        if (booking.status !== 'completed') {
          throw new TRPCError({ 
            code: 'BAD_REQUEST', 
            message: 'Você só pode avaliar após completar a estadia' 
          });
        }

        await db.createReview({
          propertyId: input.propertyId,
          bookingId: input.bookingId,
          guestId: ctx.user.id,
          rating: input.rating,
          comment: input.comment,
        });

        return { success: true };
      }),
  }),

  // ============ NOTIFICATIONS ROUTER ============
  notifications: router({
    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getNotificationsByUser(ctx.user.id);
      }),

    unreadCount: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUnreadNotificationsCount(ctx.user.id);
      }),

    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markNotificationAsRead(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
