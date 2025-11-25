import { CUSTOMERSTATUS, Customers as PrismaCustomer } from '../../generated/prisma/client.js';

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

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get formattedPhone(): string {
        return `(${this.ddd}) ${this.phone}`;
    }

    isValidCpf(cpf: string): boolean {
        let isValid = true
        if (cpf !== null) {
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
        }

        return isValid;
    }

    isValidPhone(phone: string): boolean {
        let isValid = true;
        if (phone.length !== 9 && !parseInt(phone)) {
            isValid = false;
        }

        return isValid;
    }
}
