# Padrões de Sistema

## Arquitetura Proposta

Monolito Modular: É a escolha mais adequada para o caso devido ao escopo e propósito do projeto.

### Camadas de cada Módulo

- **Controller:** Responsável por receber a requisição HTTP, validar os dados de entrada (via Zod/Fastify) e chamar a lógica de negócio no Service. Não deve conter lógica de negócio.
- **Service:** Contém a lógica de negócio principal. Recebe dados já validados e interage com o Model (Prisma) para persistência.
- **Model (Prisma):** Representa a camada de acesso a dados (ORM). O Prisma Client é a interface para o banco de dados.

## Padrões de Design

- **YAGNI**
- **SOLID**
- **DRY**
