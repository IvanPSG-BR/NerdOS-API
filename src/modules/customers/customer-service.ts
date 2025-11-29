import { Customers as CustomerType } from '../../generated/prisma/client.js';
import { Customer } from './customer.js';
import { CreateCustomer as CreateCustomerType, UpdateCustomer as UpdateCustomerType, CustomerHistory as CustomerHistoryType } from '../../schemas/customer-schemas.js';

// ==================== FUNÇÕES DE SERVIÇO (Regras de Negócio) ====================
// O acesso a dados agora é responsabilidade da classe Customer (Active Record)

export async function listAll(offset: number, limit: number): Promise<CustomerType[]> {
    return await Customer.listAll(offset, limit);
}

export async function findByName(firstName: string, lastName: string | null): Promise<CustomerType[]> {
    return await Customer.findByName(firstName, lastName);
}

export async function findByPhone(phoneNumber: string): Promise<CustomerType | null> {
    return await Customer.findByPhone(phoneNumber);
}

export async function findById(id: number): Promise<CustomerType | null> {
    return await Customer.findById(id);
}

export async function register(data: CreateCustomerType): Promise<CustomerType> {
    return await Customer.create(data);
}

export async function update(id: number, data: UpdateCustomerType): Promise<CustomerType> {
    return await Customer.update(id, data);
}

export async function deactivateById(id: number): Promise<void> {
    return await Customer.deactivateById(id);
}

export async function getHistory(id: number): Promise<CustomerHistoryType | null> {
    const name = await Customer.getName(id);
    const devices = await Customer.getDevices(id);
    const serviceOrders = await Customer.getServiceOrders(id);
    if (name) {
        return {
            firstName: name["firstName"],
            lastName: name["lastName"],
            devices: devices,
            serviceOrders: serviceOrders
        };
    }

    return null;
}

export async function getName(id: number): Promise<{ firstName: string; lastName: string } | null> {
    return await Customer.getName(id);
}

export async function updateName(id: number, data: { firstName?: string; lastName?: string }): Promise<CustomerType> {
    return await Customer.updateName(id, data);
}

export async function getPhoneNumber(id: number): Promise<{ ddd: string; phone: string } | null> {
    return await Customer.getPhoneNumber(id);
}

export async function updatePhoneNumber(id: number, data: { ddd?: string; phone?: string }): Promise<CustomerType> {
    return await Customer.updatePhoneNumber(id, data);
}

export async function getCpf(id: number): Promise<{ cpf: string | null } | null> {
    return await Customer.getCpf(id);
}

export async function getCreatedAt(id: number): Promise<{ createdAt: Date } | null> {
    return await Customer.getCreatedAt(id);
}

export async function getUpdatedAt(id: number): Promise<{ updatedAt: Date } | null> {
    return await Customer.getUpdatedAt(id);
}
