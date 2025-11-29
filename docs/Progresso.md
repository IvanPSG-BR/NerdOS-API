# Progresso do Projeto

## O que Funciona

### Infraestrutura e Banco de Dados

- [x] Conexão com PostgreSQL via Prisma configurada
- [x] Schema do banco de dados definido (`prisma/schema.prisma`)
  - Tabela `Users` (id, name, email, password)
  - Tabela `Customers` (id, firstName, lastName, ddd, phone, cpf, createdAt, updatedAt)
  - Tabela `Devices` (id, customerId, brand, model, serial, createdAt, updatedAt)
  - Tabela `ServiceOrders` (id [Char(15)], customerId, deviceId, deviceProblem, service, value, status, createdAt, updatedAt)
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
  - `CustomerSchema`, `CreateCustomerSchema`, `UpdateCustomerSchema`
  - `CustomerHistorySchema` para endpoint de histórico
- [x] Rotas CRUD completas de Clientes (`src/routes/customer-routes.ts`)
  - POST `/customers` - Criar cliente
  - GET `/customers` - Listar todos os clientes
  - GET `/customers/{id}` - Buscar cliente por ID
  - PUT `/customers/{id}` - Atualizar cliente
  - DELETE `/customers/{id}` - Desativar cliente (soft delete)
  - GET `/customers/{id}/history` - Histórico do cliente (dispositivos + OSs)
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

### ~~Módulo de Aparelhos~~ (Removido)

> **Decisão (29/11/2025):** Após análise das funcionalidades e fluxo de uso do sistema, o módulo de Aparelhos foi removido. Os dados de dispositivos serão gerenciados diretamente através das Ordens de Serviço, simplificando o modelo de dados e a experiência do usuário.

### Módulo de Ordens de Serviço

- [ ] Implementar CRUD de Ordens de Serviço
- [ ] Implementar geração automática de ID de OS (formato Char(15))
- [ ] Implementar gestão de status da OS

## Status Atual

**Fase:** Desenvolvimento de Módulos - CRUD de Clientes Implementado

**Última atualização:** 2025-11-29

### Progresso Recente (29/11/2025)

- ✅ Endpoint de Histórico do Cliente implementado (`GET /customers/{id}/history`)
  - Consolida dispositivos e ordens de serviço do cliente em uma única resposta
  - Substituiu os endpoints separados `/customers/{id}/devices` e `/customers/{id}/service-orders`
- ✅ Novo schema `CustomerHistorySchema` criado para tipagem do endpoint
- ✅ Atualização do schema de `ServiceOrders`: ID agora é `Char(15)` em vez de autoincrement
- ✅ Atualização de dependências: Prisma atualizado para versão 7.0.1
- ✅ Migração de npm para pnpm como gerenciador de pacotes
- ✅ Remoção do módulo de Aparelhos (Devices) - dados gerenciados via Ordens de Serviço

### Progresso Anterior (26/11/2025)

- ✅ Refatoração do módulo de Clientes para padrão Active Record
  - Lógica de acesso a dados movida para `Customer` (métodos estáticos)
  - `CustomerService` agora contém apenas regras de negócio
  - Separação clara de responsabilidades entre camadas

### Progresso (21/11/2025)

- ✅ Implementação completa do CRUD básico de Clientes
- ✅ Criação da arquitetura em camadas (Routes → Controller → Service → Model)
- ✅ Schemas de validação e resposta para todas as rotas de clientes
- ✅ Padronização dos nomes das tabelas para plural (Users, Customers, Devices, ServiceOrders)
- ✅ Configuração da aplicação Fastify com validação Zod e Swagger

## Problemas Conhecidos e TODOs

### Clientes

- [X] Adicionar campo `status` à tabela `Customers` para soft delete
- [X] Remover a possibilidade de deletar permanentemente o cliente do histórico
- [X] Implementar endpoint de Histórico do Cliente (aparelhos + OSs)
- [ ] Desenvolver regras de negócio mais avançadas no `CustomerService`

## Evolução das Decisões do Projeto

### Decisões de Arquitetura

- **Monolito Modular:** Escolhido para simplificar o deploy e a comunicação interna, mantendo a organização por módulos (Auth, Clientes, OS).
- **Active Record:** Escolhido para simplificar o acesso a dados e garantir consistência entre camadas.
- **Fastify:** Escolhido por performance e arquitetura de plugins, além da integração nativa com validação de schemas.
- **Remoção do Módulo de Aparelhos:** Decidido simplificar o modelo de dados, integrando informações de dispositivos diretamente nas Ordens de Serviço.

### Decisões de Modelagem

- **Prisma:** Escolhido para garantir *type-safety* ponta-a-ponta com TypeScript e facilitar a gestão de migrações.
- **Zod:** Escolhido como fonte única de verdade para validação de dados de entrada e tipagem de rotas (via `fastify-type-provider-zod`).
