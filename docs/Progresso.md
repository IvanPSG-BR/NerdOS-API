# Progresso do Projeto

## O que Funciona

### Infraestrutura e Banco de Dados

- [x] Conexão com PostgreSQL via Prisma configurada (`src/database/conn.ts`)
- [x] Schema do banco de dados definido (`prisma/schema.prisma`)
  - Tabela `User` (id, name, email, password)
  - Tabela `Customer` (id, firstName, lastName, ddd, phone, cpf, createdAt, updatedAt)
  - Tabela `Device` (id, customerId, brand, model, serial, createdAt, updatedAt)
  - Tabela `ServiceOrder` (id, customerId, deviceId, number, deviceProblem, service, value, status, createdAt, updatedAt)
- [x] Relacionamentos entre tabelas configurados
  - Customer → Device (1:N)
  - Customer → ServiceOrder (1:N)
  - Device → ServiceOrder (1:N)

## O que Resta Construir

### Módulo de Autenticação e Usuários

- [ ] Implementar CRUD de Usuários.
- [ ] Implementar Autenticação (Login/Logout).
- [ ] Implementar Hash de Senha com `bcryptjs`.
- [ ] Integrar validação Zod nas rotas de Auth.

### Módulo de Clientes e Aparelhos

- [ ] Implementar CRUD de Clientes.
- [ ] Implementar CRUD de Aparelhos (com vínculo obrigatório a Cliente).
- [ ] Implementar endpoint de Histórico do Cliente (aparelhos + OSs).

## Status Atual

**Fase:** Infraestrutura Configurada - Pronto para Implementação de Módulos

**Última atualização:** 2025-11-20

## Problemas Conhecidos

- Nenhum problema conhecido no momento.

## Evolução das Decisões do Projeto

### Decisões de Arquitetura

- **Monolito Modular:** Escolhido para simplificar o deploy e a comunicação interna, mantendo a organização por módulos (Auth, Clientes, OS).
- **Fastify:** Escolhido por performance e arquitetura de plugins, além da integração nativa com validação de schemas.

### Decisões de Modelagem

- **Prisma:** Escolhido para garantir *type-safety* ponta-a-ponta com TypeScript e facilitar a gestão de migrações.
- **Zod:** Escolhido como fonte única de verdade para validação de dados de entrada e tipagem de rotas (via `fastify-type-provider-zod`).
