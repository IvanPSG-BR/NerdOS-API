import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { CreateCustomerSchema, CustomerHistorySchema, CustomerSchema } from '../schemas/customer-schemas.js'
import { z } from 'zod'
import * as CustomerController from '../modules/customers/customer-controller.js'
import { getOneSchema, getManySchema, postSchema, updateSchema, deleteSchema } from '../utils/route-schema-helpers.js'

const customerRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<ZodTypeProvider>()
    
    server.get('/customers', {
        schema: getManySchema(
            ['customers'],
            'Lista clientes',
            CustomerSchema,
            z.object({
                limit: z.coerce.number().min(1).max(100).default(10),
                offset: z.coerce.number().min(0).default(0),
                name: z.string().optional(),
                phone: z.string().optional()
            })
        )
    }, CustomerController.listCustomers)

    server.post('/customers', {
        schema: postSchema(['customers'], 'Cria um novo cliente', CreateCustomerSchema)
    }, CustomerController.createCustomer)

    server.get('/customers/{id}', {
        schema: getOneSchema(['customers'], 'Busca um cliente por ID', CustomerSchema)
    }, CustomerController.getCustomerById)

    server.put('/customers/{id}', {
        schema: updateSchema(['customers'], 'Atualiza um cliente', CreateCustomerSchema)
    }, CustomerController.updateCustomer)

    server.delete('/customers/{id}', {
        schema: deleteSchema(['customers'], 'Desativa um cliente')
    }, CustomerController.deactivateCustomer)

    server.get('/customers/{id}/history', {
        schema: getOneSchema(['customers'], 'Expõe histórico de um cliente', CustomerHistorySchema)
    }, CustomerController.getCustomerHistory)

    server.get('/customers/{id}/name', {
        schema: getOneSchema(['customers'], 'Busca o nome de um cliente', z.object({
            firstName: z.string(),
            lastName: z.string()
        }))
    }, CustomerController.getCustomerName)

    server.patch('/customers/{id}/name', {
        schema: updateSchema(['customers'], 'Atualiza o nome de um cliente', z.object({
            firstName: z.string().optional(),
            lastName: z.string().optional()
        }))
    }, CustomerController.updateCustomerName)

    server.get('/customers/{id}/phone-number', {
        schema: getOneSchema(['customers'], 'Busca o telefone de um cliente', z.object({
            ddd: z.string(),
            phone: z.string()
        }))
    }, CustomerController.getCustomerPhoneNumber)

    server.patch('/customers/{id}/phone-number', {
        schema: updateSchema(['customers'], 'Atualiza o telefone de um cliente', z.object({
            ddd: z.string().optional(),
            phone: z.string().optional()
        }))
    }, CustomerController.updateCustomerPhoneNumber)

    server.get('/customers/{id}/cpf', {
        schema: getOneSchema(['customers'], 'Busca o CPF de um cliente', z.object({
            cpf: z.string().nullable()
        }))
    }, CustomerController.getCustomerCpf)

    server.get('/customers/{id}/created-at', {
        schema: getOneSchema(['customers'], 'Busca a data de criação de um cliente', z.object({
            createdAt: z.date()
        }))
    }, CustomerController.getCustomerCreatedAt)

    server.get('/customers/{id}/updated-at', {
        schema: getOneSchema(['customers'], 'Busca a data de atualização de um cliente', z.object({
            updatedAt: z.date()
        }))
    }, CustomerController.getCustomerUpdatedAt)
}

export default customerRoutes