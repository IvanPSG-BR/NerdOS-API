import { CUSTOMERSTATUS, Customers as PrismaCustomer, PrismaClient } from '../../generated/prisma/client.js';
import { CreateCustomer as CreateCustomerType, UpdateCustomer as UpdateCustomerType } from '../../schemas/customer-schemas.js';

const prisma = new PrismaClient();
const customersRepo = prisma.customers;

export class Customer implements PrismaCustomer {
    id: number;
    firstName: string;
    lastName: string;
    ddd: string;
    phone: string;
    cpf: string | null;
    createdAt: Date;
    updatedAt: Date;
    customerStatus: CUSTOMERSTATUS;

    constructor(data: PrismaCustomer) {
        Object.assign(this, data);
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.ddd = data.ddd;
        this.phone = data.phone;
        this.cpf = data.cpf;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
        this.customerStatus = data.customerStatus;
    }

    static async listAll(offset: number, limit: number): Promise<PrismaCustomer[]> {
        return await customersRepo.findMany({
            skip: offset,
            take: limit
        });
    }

    static async findByName(firstName: string, lastName: string | null): Promise<PrismaCustomer[]> {
        if (lastName) {
            return await customersRepo.findMany({
                where: { firstName, lastName }
            });
        }
        return await customersRepo.findMany({
            where: { firstName }
        });
    }

    static async findByPhone(phoneNumber: string): Promise<PrismaCustomer | null> {
        return await customersRepo.findFirst({
            where: { phone: phoneNumber }
        });
    }

    static async findById(id: number): Promise<PrismaCustomer | null> {
        return await customersRepo.findFirst({
            where: { id }
        });
    }

    static async create(data: CreateCustomerType): Promise<PrismaCustomer> {
        return await customersRepo.create({ data });
    }

    static async update(id: number, data: UpdateCustomerType): Promise<PrismaCustomer> {
        return await customersRepo.update({
            where: { id },
            data
        });
    }

    static async deactivateById(id: number): Promise<void> {
        // LÓGICA PARA DESATIVAR CLIENTE
    }

    static async getDevices(id: number): Promise<any[]> {
        const customer = await customersRepo.findFirst({
            where: { id },
            include: { devices: true }
        });
        return customer?.devices || [];
    }

    static async getServiceOrders(id: number): Promise<any[]> {
        const customer = await customersRepo.findFirst({
            where: { id },
            include: { serviceOrders: true }
        });
        return customer?.serviceOrders || [];
    }

    static async getName(id: number): Promise<{ firstName: string; lastName: string } | null> {
        return await customersRepo.findFirst({
            where: { id },
            select: { firstName: true, lastName: true }
        });
    }

    static async updateName(id: number, data: { firstName?: string; lastName?: string }): Promise<PrismaCustomer> {
        return await customersRepo.update({
            where: { id },
            data
        });
    }

    static async getPhoneNumber(id: number): Promise<{ ddd: string; phone: string } | null> {
        return await customersRepo.findFirst({
            where: { id },
            select: { ddd: true, phone: true }
        });
    }

    static async updatePhoneNumber(id: number, data: { ddd?: string; phone?: string }): Promise<PrismaCustomer> {
        return await customersRepo.update({
            where: { id },
            data
        });
    }

    static async getCpf(id: number): Promise<{ cpf: string | null } | null> {
        return await customersRepo.findFirst({
            where: { id },
            select: { cpf: true }
        });
    }

    static async getCreatedAt(id: number): Promise<{ createdAt: Date } | null> {
        return await customersRepo.findFirst({
            where: { id },
            select: { createdAt: true }
        });
    }

    static async getUpdatedAt(id: number): Promise<{ updatedAt: Date } | null> {
        return await customersRepo.findFirst({
            where: { id },
            select: { updatedAt: true }
        });
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get formattedPhone(): string {
        return `(${this.ddd}) ${this.phone}`;
    }

    static isValidCpf(cpf: string): boolean {
        let isValid = true
        if (cpf.length !== 11) {
            isValid = false;
        }

        let firstDigit = 0
        for (let i = 1; i < cpf.length; i++) {
            if (cpf[firstDigit] !== cpf[i]) {
                break;
            } else {
                firstDigit++;
            }
            if (firstDigit === 10) {
                isValid = false;
            }
        }

        // Cálculo do Primeiro Dígito Verificador (10º dígito)
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf[i]) * (10 - i);
        }
        let remainder = sum % 11;
        const firstVerifier = remainder < 2 ? 0 : 11 - remainder;

        // Cálculo do Segundo Dígito Verificador (11º dígito)
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf[i]) * (11 - i);
        }
        remainder = sum % 11;
        const secondVerifier = remainder < 2 ? 0 : 11 - remainder;

        // Validação Final
        if (parseInt(cpf[9]) !== firstVerifier || parseInt(cpf[10]) !== secondVerifier) {
            isValid = false;
        }

        return isValid;
    }

    static isValidPhone(phone: string): boolean {
        let isValid = true;
        if (phone.length !== 9 && !parseInt(phone)) {
            isValid = false;
        }

        return isValid;
    }
}
