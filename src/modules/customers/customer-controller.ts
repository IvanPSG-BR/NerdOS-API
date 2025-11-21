import { FastifyRequest, FastifyReply } from 'fastify';
import * as CustomerService from './customer-service';

// GET /customers - Lista clientes
export async function listCustomers(req: FastifyRequest<{
    Querystring: {
        limit: number;
        offset: number;
        name?: string;
        phone?: string;
    }
}>, rep: FastifyReply) {
    const { limit, offset, name, phone } = req.query;

    if (phone) {
        const customer = await CustomerService.findByPhone(phone);
        return customer ? [customer] : [];
    }

    if (name) {
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.length > 0 ? lastNameParts.join(' ') : null;
        const customer = await CustomerService.findByName(firstName, lastName);
        return customer ? [customer] : [];
    }

    return await CustomerService.listAll(offset, limit);
}

// POST /customers - Cria um novo cliente
export async function createCustomer(req: FastifyRequest<{
    Body: {
        firstName: string;
        lastName: string;
        ddd: string;
        phone: string;
        cpf: string | null;
    }
}>, rep: FastifyReply) {
    await CustomerService.register(req.body);
    rep.status(201);
    return {};
}

// GET /customers/{id} - Busca um cliente por ID
export async function getCustomerById(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    const customer = await CustomerService.findById(id);

    if (!customer) {
        return rep.status(404).send({ error: 'Customer not found' });
    }

    return customer;
}

// PUT /customers/{id} - Atualiza um cliente
export async function updateCustomer(req: FastifyRequest<{
    Params: {
        id: string;
    };
    Body: {
        firstName?: string;
        lastName?: string;
        ddd?: string;
        phone?: string;
        cpf?: string | null;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    await CustomerService.update(id, req.body);
    return {};
}

// DELETE /customers/{id} - Deleta um cliente
export async function deleteCustomer(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    await CustomerService.deleteById(id);
    rep.status(204);
    return;
}

// GET /customers/{id}/devices - Lista dispositivos de um cliente
export async function getCustomerDevices(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    return await CustomerService.getDevices(id);
}

// GET /customers/{id}/service-orders - Lista ordens de serviço de um cliente
export async function getCustomerServiceOrders(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    return await CustomerService.getServiceOrders(id);
}

// GET /customers/{id}/name - Busca o nome de um cliente
export async function getCustomerName(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    const result = await CustomerService.getName(id);

    if (!result) {
        return rep.status(404).send({ error: 'Customer not found' });
    }

    return result;
}

// PATCH /customers/{id}/name - Atualiza o nome de um cliente
export async function updateCustomerName(req: FastifyRequest<{
    Params: {
        id: string;
    };
    Body: {
        firstName?: string;
        lastName?: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    await CustomerService.updateName(id, req.body);
    return {};
}

// GET /customers/{id}/phone-number - Busca o telefone de um cliente
export async function getCustomerPhoneNumber(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    const result = await CustomerService.getPhoneNumber(id);

    if (!result) {
        return rep.status(404).send({ error: 'Customer not found' });
    }

    return result;
}

// PATCH /customers/{id}/phone-number - Atualiza o telefone de um cliente
export async function updateCustomerPhoneNumber(req: FastifyRequest<{
    Params: {
        id: string;
    };
    Body: {
        ddd?: string;
        phone?: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    await CustomerService.updatePhoneNumber(id, req.body);
    return {};
}

// GET /customers/{id}/cpf - Busca o CPF de um cliente
export async function getCustomerCpf(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    const result = await CustomerService.getCpf(id);

    if (!result) {
        return rep.status(404).send({ error: 'Customer not found' });
    }

    return result;
}

// GET /customers/{id}/created-at - Busca a data de criação de um cliente
export async function getCustomerCreatedAt(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    const result = await CustomerService.getCreatedAt(id);

    if (!result) {
        return rep.status(404).send({ error: 'Customer not found' });
    }

    return result;
}

// GET /customers/{id}/updated-at - Busca a data de atualização de um cliente
export async function getCustomerUpdatedAt(req: FastifyRequest<{
    Params: {
        id: string;
    }
}>, rep: FastifyReply) {
    const id = parseInt(req.params.id);
    const result = await CustomerService.getUpdatedAt(id);

    if (!result) {
        return rep.status(404).send({ error: 'Customer not found' });
    }

    return result;
}
