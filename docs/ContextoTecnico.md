# Contexto Técnico

## Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Build Tool:** npm
- **Framework Backend:** Fastify
- **Framework de Testes:** Jest
- **SGBD Relacional:** PostgreSQL (Hospedado no Neon)
- **Validação de Schemas:** Zod (Integrado via `fastify-type-provider-zod`)
- **Documentação de API:** @fastify/swagger e @fastify/swagger-ui (Geração automática via Schemas Zod)

## Estrutura de Diretórios

```
.
├── node_modules/
├── src/
│   ├── database/
│   │   ├── conn.ts
│   ├── modules/
│   │   ├── customers/
│   │   ├── devices/
│   │   ├── service-orders/
│   │   └── auth/
│   ├── plugins/
│   │   ├── sensible.ts
│   │   └── support.ts
│   ├── routes/
│   │   ├── root.ts
│   │   └── users.ts
│   │   └── ...
│   ├── schemas/
│   └── app.ts
├── prisma/
│   └── schema.prisma
├── docs/
├── package.json
├── tsconfig.json
└── .env
```

## Dependências

- **ORM:** Prisma
- **Autenticação:** jsonwebtoken
- **Hash:** bcryptjs
- **Validação:** Zod
- **Integração Fastify/Zod:** fastify-type-provider-zod
- **Environment Config:** dotenv

## Padrões de Uso de Ferramentas

- **npm:** Para gerenciamento de dependências e execução.
- **IDE:** VSCodium/VSCode para desenvolvimento.
