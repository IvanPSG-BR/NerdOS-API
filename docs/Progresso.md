# Progresso do Projeto

## O que Funciona

### Infraestrutura e Banco de Dados

- [x] Conexão com PostgreSQL via Prisma configurada (`src/database/conn.ts`)
- [x] Schema do banco de dados definido (`prisma/schema.prisma`)
  - Tabela `Users` (id, name, email, password)
  - Tabela `Customers` (id, firstName, lastName, ddd, phone, cpf, createdAt, updatedAt)
  - Tabela `Devices` (id, customerId, brand, model, serial, createdAt, updatedAt)
  - Tabela `ServiceOrders` (id, customerId, deviceId, number, deviceProblem, service, value, status, createdAt, updatedAt)
- [x] Relacionamentos entre tabelas configurados
  - Customers → Devices (1:N)
  - Customers → ServiceOrders (1:N)
  - Devices → ServiceOrders (1:N)

### Aplicação Fastify

- [x] Instância do Fastify configurada (`src/app.ts`)
- [x] Integração com `fastify-type-provider-zod` para validação de schemas
- [x] Configuração de CORS
- [x] Documentação Swagger configurada

### Módulo de Clientes

- [x] Schemas de validação Zod para Clientes (`src/schemas/customer-schemas.ts`)
- [x] Rotas CRUD completas de Clientes (`src/routes/customer-routes.ts`)
  - POST `/customers` - Criar cliente
  - GET `/customers` - Listar todos os clientes
  - GET `/customers/{id}` - Buscar cliente por ID
  - PUT `/customers/{id}` - Atualizar cliente
  - DELETE `/customers/{id}` - Deletar cliente
- [x] Controller de Clientes (`src/modules/customers/customer-controller.ts`)
- [x] Service de Clientes para regras de negócio (`src/modules/customers/customer-service.ts`)
- [x] Modelo Customer com padrão Active Record (`src/modules/customers/customer.ts`)
  - Métodos estáticos de acesso a dados (listAll, findById, create, update, etc.)
  - Métodos de validação (isValidCpf, isValidPhone)
  - Getters utilitários (fullName, formattedPhone)

## O que Resta Construir

### Módulo de Autenticação e Usuários

- [ ] Implementar CRUD de Usuários.
- [ ] Implementar Autenticação (Login/Logout).
- [ ] Implementar Hash de Senha com `bcryptjs`.
- [ ] Integrar validação Zod nas rotas de Auth.

### Módulo de Aparelhos

- [ ] Implementar CRUD de Aparelhos (com vínculo obrigatório a Cliente)
- [ ] Implementar validação de dados de aparelhos

### Módulo de Ordens de Serviço

- [ ] Implementar CRUD de Ordens de Serviço
- [ ] Implementar geração automática de número de OS
- [ ] Implementar gestão de status da OS

## Status Atual

**Fase:** Desenvolvimento de Módulos - CRUD de Clientes Implementado

**Última atualização:** 2025-11-26

### Progresso Recente (26/11/2025)

- ✅ Refatoração do módulo de Clientes para padrão Active Record
  - Lógica de acesso a dados movida para `Customer` (métodos estáticos)
  - `CustomerService` agora contém apenas regras de negócio
  - Separação clara de responsabilidades entre camadas

### Progresso Anterior (21/11/2025)

- ✅ Implementação completa do CRUD básico de Clientes
- ✅ Criação da arquitetura em camadas (Routes → Controller → Service → Model)
- ✅ Schemas de validação e resposta para todas as rotas de clientes
- ✅ Padronização dos nomes das tabelas para plural (Users, Customers, Devices, ServiceOrders)
- ✅ Configuração da aplicação Fastify com validação Zod e Swagger

## Problemas Conhecidos e TODOs

### Clientes

- [X] Adicionar campo `status` à tabela `Customers` para soft delete
- [X] Remover a possibilidade de deletar permanentemente o cliente do histórico
- [ ] Desenvolver regras de negócio mais avançadas no `CustomerService`
- [ ] Implementar endpoint de Histórico do Cliente (aparelhos + OSs)

## Evolução das Decisões do Projeto

### Decisões de Arquitetura

- **Monolito Modular:** Escolhido para simplificar o deploy e a comunicação interna, mantendo a organização por módulos (Auth, Clientes, OS).
- **Active Record:** Escolhido para simplificar o acesso a dados e garantir consistência entre camadas.
- **Fastify:** Escolhido por performance e arquitetura de plugins, além da integração nativa com validação de schemas.

### Decisões de Modelagem

- **Prisma:** Escolhido para garantir *type-safety* ponta-a-ponta com TypeScript e facilitar a gestão de migrações.
- **Zod:** Escolhido como fonte única de verdade para validação de dados de entrada e tipagem de rotas (via `fastify-type-provider-zod`).
