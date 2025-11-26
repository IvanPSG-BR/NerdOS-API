import { Customers as CustomerType } from '../../generated/prisma/client.js';
import { Customer } from './customer.js';
import { CreateCustomer as CreateCustomerType, UpdateCustomer as UpdateCustomerType } from '../../schemas/customer-schemas.js';

// ==================== FUNÇÕES DE SERVIÇO (Regras de Negócio) ====================
// O acesso a dados agora é responsabilidade da classe Customer (Active Record)

export async function listAll(offset: number, limit: number): Promise<CustomerType[]> {
    return Customer.listAll(offset, limit);
}

export async function findByName(firstName: string, lastName: string | null): Promise<CustomerType[]> {
    return Customer.findByName(firstName, lastName);
}

export async function findByPhone(phoneNumber: string): Promise<CustomerType | null> {
    return Customer.findByPhone(phoneNumber);
}

export async function findById(id: number): Promise<CustomerType | null> {
    return Customer.findById(id);
}

export async function register(data: CreateCustomerType): Promise<CustomerType> {
    return Customer.create(data);
}

export async function update(id: number, data: UpdateCustomerType): Promise<CustomerType> {
    return Customer.update(id, data);
}

export async function deactivateById(id: number): Promise<void> {
    return Customer.deactivateById(id);
}

export async function getDevices(id: number): Promise<any[]> {
    return Customer.getDevices(id);
}

export async function getServiceOrders(id: number): Promise<any[]> {
    return Customer.getServiceOrders(id);
}

export async function getName(id: number): Promise<{ firstName: string; lastName: string } | null> {
    return Customer.getName(id);
}

export async function updateName(id: number, data: { firstName?: string; lastName?: string }): Promise<CustomerType> {
    return Customer.updateName(id, data);
}

export async function getPhoneNumber(id: number): Promise<{ ddd: string; phone: string } | null> {
    return Customer.getPhoneNumber(id);
}

export async function updatePhoneNumber(id: number, data: { ddd?: string; phone?: string }): Promise<CustomerType> {
    return Customer.updatePhoneNumber(id, data);
}

export async function getCpf(id: number): Promise<{ cpf: string | null } | null> {
    return Customer.getCpf(id);
}

export async function getCreatedAt(id: number): Promise<{ createdAt: Date } | null> {
    return Customer.getCreatedAt(id);
}

export async function getUpdatedAt(id: number): Promise<{ updatedAt: Date } | null> {
    return Customer.getUpdatedAt(id);
}
