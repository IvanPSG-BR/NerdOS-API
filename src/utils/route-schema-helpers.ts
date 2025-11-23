import { z } from 'zod'

/**
 * Schema padrão para responses de sucesso sem corpo (updates, patches, etc)
 */
const emptySuccessResponse = z.object({})

/**
 * Cria schema para rota GET que retorna um único item
 * 
 * @param tags - Tags para categorizar a rota (ex: ['customers'], ['devices'])
 * @param desc - Descrição da rota
 * @param responseSchema - Schema Zod do response
 * 
 * @example
 * getOneSchema(['customers'], 'Busca um cliente por ID', CustomerSchema)
 */
export function getOneSchema(tags: string[], desc: string, responseSchema: z.ZodTypeAny) {
    return {
        tags,
        desc,
        response: {
            200: responseSchema
        }
    }
}

/**
 * Cria schema para rota GET que retorna array
 * 
 * @param tags - Tags para categorizar a rota
 * @param desc - Descrição da rota
 * @param responseSchema - Schema Zod de cada item do array
 * @param querystring - (Opcional) Schema Zod para query parameters
 * 
 * @example
 * getManySchema(['customers'], 'Lista clientes', CustomerSchema, z.object({ limit: z.number() }))
 */
export function getManySchema(
    tags: string[], 
    desc: string, 
    responseSchema: z.ZodTypeAny, 
    querystring?: z.ZodTypeAny
) {
    const schema: any = {
        tags,
        desc,
        response: {
            200: z.array(responseSchema)
        }
    }
    
    if (querystring) {
        schema.querystring = querystring
    }
    
    return schema
}

/**
 * Cria schema para rota POST
 * 
 * @param tags - Tags para categorizar a rota
 * @param desc - Descrição da rota
 * @param bodySchema - Schema Zod do body
 * @param status - Status code do response (padrão: 201)
 * 
 * @example
 * postSchema(['customers'], 'Cria um novo cliente', CreateCustomerSchema)
 */
export function postSchema(
    tags: string[], 
    desc: string, 
    bodySchema: z.ZodTypeAny, 
    status: number = 201
) {
    return {
        tags,
        desc,
        body: bodySchema,
        response: {
            [status]: emptySuccessResponse
        }
    }
}

/**
 * Cria schema para rota PUT/PATCH que retorna sucesso vazio
 * 
 * @param tags - Tags para categorizar a rota
 * @param desc - Descrição da rota
 * @param bodySchema - Schema Zod do body
 * 
 * @example
 * updateSchema(['customers'], 'Atualiza um cliente', CreateCustomerSchema)
 */
export function updateSchema(tags: string[], desc: string, bodySchema: z.ZodTypeAny) {
    return {
        tags,
        desc,
        body: bodySchema,
        response: {
            200: emptySuccessResponse
        }
    }
}

/**
 * Cria schema para rota DELETE
 * 
 * @param tags - Tags para categorizar a rota
 * @param desc - Descrição da rota
 * 
 * @example
 * deleteSchema(['customers'], 'Desativa um cliente')
 */
export function deleteSchema(tags: string[], desc: string) {
    return {
        tags,
        desc
        // 204 No Content - sem response
    }
}

