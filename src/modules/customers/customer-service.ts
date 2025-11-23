import { Customers as CustomerType, PrismaClient } from '../../generated/prisma';
import { Customer } from './customer';
import { CreateCustomer as CreateCustomerType, UpdateCustomer as UpdateCustomerType } from '../../schemas/customer-schemas';

const customerUtil = new Customer({} as CustomerType);
const prisma = new PrismaClient();
const customersRepo = prisma.customers;

export async function listAll(offset: number, limit: number): Promise<CustomerType[]> {
    let customers = await customersRepo.findMany({
        skip: offset,
        take: limit
    });

    return customers;
}

export async function findByName(firstName: string, lastName:string | null): Promise<CustomerType | null> {
    let foundCustomer = null;
    if (lastName) {
        foundCustomer = await customersRepo.findMany({
            where: {
                firstName,
                lastName
            }
        });
    } else {
        foundCustomer = await customersRepo.findMany({
            where: {
                firstName
            }
        });
    }

    return foundCustomer;
}

export async function findByPhone(phoneNumber: string): Promise<CustomerType | null> {
    let foundCustomer = null;
    if (customerUtil.isValidPhone(phoneNumber)) {
        foundCustomer = await customersRepo.findFirst({
                where: {
                    phone: phoneNumber
                }
            });
    }

    return foundCustomer;
}

export async function findById(id: number): Promise<CustomerType | null> {
    let foundCustomer = await customersRepo.findFirst({
        where: {
            id
        }
    });

    return foundCustomer;
}

export async function register(data: CreateCustomerType): Promise<CustomerType> {
    const newCustomer = await customersRepo.create({
        data
    });

    return newCustomer;
}

export async function update(id: number, data: UpdateCustomerType): Promise<CustomerType> {
    const updatedCustomer = await customersRepo.update({
        where: {
            id
        },
        data
    });

    return updatedCustomer;
}

export async function deactivateById(id: number): Promise<void> {
    // LÓGICA PARA DESATIVAR CLIENTE
}

export async function getDevices(id: number): Promise<any[]> {
    const customer = await customersRepo.findFirst({
        where: {
            id
        },
        include: {
            devices: true
        }
    });

    return customer?.devices || [];
}

export async function getServiceOrders(id: number): Promise<any[]> {
    const customer = await customersRepo.findFirst({
        where: {
            id
        },
        include: {
            serviceOrders: true
        }
    });

    return customer?.serviceOrders || [];
}

export async function getName(id: number): Promise<{ firstName: string; lastName: string } | null> {
    const customer = await customersRepo.findFirst({
        where: {
            id
        },
        select: {
            firstName: true,
            lastName: true
        }
    });

    return customer;
}

export async function updateName(id: number, data: { firstName?: string; lastName?: string }): Promise<CustomerType> {
    const updatedCustomer = await customersRepo.update({
        where: {
            id
        },
        data
    });

    return updatedCustomer;
}

export async function getPhoneNumber(id: number): Promise<{ ddd: string; phone: string } | null> {
    const customer = await customersRepo.findFirst({
        where: {
            id
        },
        select: {
            ddd: true,
            phone: true
        }
    });

    return customer;
}

export async function updatePhoneNumber(id: number, data: { ddd?: string; phone?: string }): Promise<CustomerType> {
    const updatedCustomer = await customersRepo.update({
        where: {
            id
        },
        data
    });

    return updatedCustomer;
}

export async function getCpf(id: number): Promise<{ cpf: string | null } | null> {
    const customer = await customersRepo.findFirst({
        where: {
            id
        },
        select: {
            cpf: true
        }
    });

    return customer;
}

export async function getCreatedAt(id: number): Promise<{ createdAt: Date } | null> {
    const customer = await customersRepo.findFirst({
        where: {
            id
        },
        select: {
            createdAt: true
        }
    });

    return customer;
}

export async function getUpdatedAt(id: number): Promise<{ updatedAt: Date } | null> {
    const customer = await customersRepo.findFirst({
        where: {
            id
        },
        select: {
            updatedAt: true
        }
    });

    return customer;
}
