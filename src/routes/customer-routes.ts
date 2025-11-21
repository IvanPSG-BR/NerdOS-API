import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { CreateCustomerSchema, CustomerSchema } from '../schemas/customer-schemas'
import { z } from 'zod'

const customerRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<ZodTypeProvider>()
    
    server.get('/customers', {
        schema: {
            tags: ['customers'],
            desc: 'Lista clientes',
            response: {
                200: z.array(CustomerSchema)
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })

    server.post('/customers', {
        schema: {
            tags: ['customers'],
            desc: 'Cria um novo cliente',
            body: CreateCustomerSchema,
            response: {
                201: z.object({})
            }
        }
    }, async function (req, rep) {
        return {}
    })

    server.get('/customers/{id}', {
        schema: {
            tags: ['customers'],
            desc: 'Busca um cliente por ID',
            response: {
                200: CustomerSchema
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })

    server.put('/customers/{id}', {
        schema: {
            tags: ['customers'],
            desc: 'Atualiza um cliente',
            body: CreateCustomerSchema,
            response: {
                200: z.object({})
            }
        }
    }, async function (req, rep) {
        return {}
    })

    server.delete('/customers/{id}', {
        schema: {
            tags: ['customers'],
            desc: 'Deleta um cliente',
            // 204 No Content - Sem corpo de resposta
        }
    }, async function (req, rep) {
        return
    })

    server.get('/customers/{id}/devices', {
        schema: {
            tags: ['customers'],
            desc: 'Lista dispositivos de um cliente',
            response: {
                200: z.array(z.any())
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })

    server.get('/customers/{id}/service-orders', {
        schema: {
            tags: ['customers'],
            desc: 'Lista ordens de serviço de um cliente',
            response: {
                200: z.array(z.any())
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })

    server.get('/customers/{id}/name', {
        schema: {
            tags: ['customers'],
            desc: 'Busca o nome de um cliente',
            response: {
                200: z.object({
                    firstName: z.string(),
                    lastName: z.string()
                })
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })

    server.patch('/customers/{id}/name', {
        schema: {
            tags: ['customers'],
            desc: 'Atualiza o nome de um cliente',
            body: z.object({
                firstName: z.string().optional(),
                lastName: z.string().optional()
            }),
            response: {
                200: z.object({})
            }
        }
    }, async function (req, rep) {
        return {}
    })

    server.get('/customers/{id}/phone-number', {
        schema: {
            tags: ['customers'],
            desc: 'Busca o telefone de um cliente',
            response: {
                200: z.object({
                    ddd: z.string(),
                    phone: z.string()
                })
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })

    server.patch('/customers/{id}/phone-number', {
        schema: {
            tags: ['customers'],
            desc: 'Atualiza o telefone de um cliente',
            body: z.object({
                ddd: z.string().optional(),
                phone: z.string().optional()
            }),
            response: {
                200: z.object({})
            }
        }
    }, async function (req, rep) {
        return {}
    })

    server.get('/customers/{id}/cpf', {
        schema: {
            tags: ['customers'],
            desc: 'Busca o CPF de um cliente',
            response: {
                200: z.object({
                    cpf: z.string().nullable()
                })
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })

    server.get('/customers/{id}/created-at', {
        schema: {
            tags: ['customers'],
            desc: 'Busca a data de criação de um cliente',
            response: {
                200: z.object({
                    createdAt: z.date()
                })
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })

    server.get('/customers/{id}/updated-at', {
        schema: {
            tags: ['customers'],
            desc: 'Busca a data de atualização de um cliente',
            response: {
                200: z.object({
                    updatedAt: z.date()
                })
            }
        }
    }, async function (req, rep) {
        return { placeholder: true } as any
    })
}

export default customerRoutes