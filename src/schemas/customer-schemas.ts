import { z } from 'zod'

export const CustomerSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    ddd: z.string(),
    phone: z.string(),
    cpf: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const CreateCustomerSchema = CustomerSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
})

export const UpdateCustomerSchema = CreateCustomerSchema.partial()

export type Customer = z.infer<typeof CustomerSchema>

export type CreateCustomer = z.infer<typeof CreateCustomerSchema>

export type UpdateCustomer = z.infer<typeof UpdateCustomerSchema>