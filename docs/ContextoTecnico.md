# Contexto Técnico

## Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Build Tool:** npm
- **Framework Backend:** Fastify
- **Framework de Testes:** Jest
- **SGBD Relacional:** PostgreSQL (Hospedado no Supabase)
- **Validação de Schemas:** Zod (Integrado via `fastify-type-provider-zod`)
- **Documentação de API:** @fastify/swagger e @fastify/swagger-ui (Geração automática via Schemas Zod)

## Estrutura de Diretórios

```
.
├── node_modules/
├── src/
│   ├── modules/
│   │   ├── clientes/
│   │   ├── aparelhos/
│   │   ├── ordens-servico/
│   │   └── auth/
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── fastify.ts
│   ├── server.ts
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
