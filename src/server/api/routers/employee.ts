import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const employeeRouter = createTRPCRouter({
  fetchEmployees: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.employee.findMany();
  }),
  createEmployee: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]),
        dateOfBirth: z.date(),
        position: z.string(),
        department: z.string(),
        dateOfHire: z.date(),
        salary: z.number(),
        bonus: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        position,
        department,
        dateOfHire,
        salary,
        bonus,
      } = input;
      const { user } = ctx.session;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const organization = await ctx.db.organization.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!organization) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      return ctx.db.employee.create({
        data: {
          firstName,
          lastName,
          gender,
          dateOfBirth,
          position,
          department,
          dateOfHire,
          salary,
          bonus,
          userId: user.id,
          organizationId: organization.id,
        },
      });
    }),
  updateEmployee: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
        dateOfBirth: z.date().optional(),
        position: z.string().optional(),
        department: z.string().optional(),
        dateOfHire: z.date().optional(),
        salary: z.number().optional(),
        bonus: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      const { user } = ctx.session;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const employee = await ctx.db.employee.findUnique({
        where: { id },
        include: { organization: true },
      });

      if (!employee) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Employee not found",
        });
      }

      if (employee.organization.id !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to update this employee",
        });
      }

      return ctx.db.employee.update({
        where: { id },
        data: updateData,
      });
    }),
});
