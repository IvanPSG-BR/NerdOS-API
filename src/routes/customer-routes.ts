import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { CreateCustomerSchema, CustomerSchema } from '../schemas/customer-schemas'

const customerRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<ZodTypeProvider>()
    
    server.get('/customers', {
        schema: {
            tags: ['customers'],
            desc: 'Lista clientes',
            response: CustomerSchema,
            statusCode: 200
        }
    }, async function (request, reply) {
        return { placeholder: true }
    })

    server.post('/customers', {
        schema: {
            tags: ['customers'],
            desc: 'Cria um novo cliente',
            body: CreateCustomerSchema,
            statusCode: 201
        }
    }, async function (request, reply) {
        return { placeholder: true }
    })

    server.get('/customers/{id}', async function (request, reply) {
        return { placeholder: true }
    })

    server.put('/customers/{id}', async function (request, reply) {
        return { placeholder: true }
    })

    server.delete('/customers/{id}', async function (request, reply) {
        return { placeholder: true }
    })

    server.get('/customers/{id}/devices', async function (request, reply) {
        return { placeholder: true }
    })

    server.get('/customers/{id}/service-orders', async function (request, reply) {
        return { placeholder: true }
    })

    server.get('/customers/{id}/name', async function (request, reply) {
        return { placeholder: true }
    })

    server.patch('/customers/{id}/name', async function (request, reply) {
        return { placeholder: true }
    })

    server.get('/customers/{id}/phone-number', async function (request, reply) {
        return { placeholder: true }
    })

    server.patch('/customers/{id}/phone-number', async function (request, reply) {
        return { placeholder: true }
    })

    server.get('/customers/{id}/cpf', async function (request, reply) {
        return { placeholder: true }
    })

    server.get('/customers/{id}/created-at', async function (request, reply) {
        return { placeholder: true }
    })

    server.get('/customers/{id}/updated-at', async function (request, reply) {
        return { placeholder: true }
    })
}

export default customerRoutes