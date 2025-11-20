# Progresso do Projeto

## O que Funciona

- Nenhum módulo implementado ainda.

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

**Fase:** Planejamento e Estrutura Inicial

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
