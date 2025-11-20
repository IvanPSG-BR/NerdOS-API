# NerdOS API

<!-- Badges serão adicionados aqui -->

## Índice

- [NerdOS API](#nerdos-api)
  - [Índice](#índice)
  - [Descrição do Projeto](#descrição-do-projeto)
  - [Status do Projeto](#status-do-projeto)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Licença](#licença)

## Descrição do Projeto

NerdOS é uma API para sistema de visualização de histórico e gerenciamento de Ordens de Serviço (OS) para assistências técnicas de celulares. A plataforma busca resolver problemas comuns enfrentados por assistências técnicas, como:

- Dificuldade em rastrear o status de cada conserto.
- Falta de um histórico organizado de serviços por cliente e aparelho.
- Processos manuais e propensos a erros para gerar identificadores de OS.
- Dificuldade em gerar relatórios e estatísticas de faturamento e produtividade.

Essa API fornece endpoints que salvam os dados acerca do cliente, seu aparelho e sobre o conserto em si, além de permitir seu gerenciamento. Isso cria um histórico de todos os clientes, aparelhos e consertos, permitindo que o usuário possa visualizar e gerenciar todos os dados de forma fácil e rápida.

**Principais Módulos:**

- **Autenticação e Usuários:** Gerenciamento de usuários e autenticação segura.
- **Clientes e Aparelhos:** Cadastro e gerenciamento de clientes e seus aparelhos.
- **Ordens de Serviço:** Criação e acompanhamento de OSs com fluxo de status claro (Em Análise, Aguardando Aprovação, Em Reparo, Concluído, Entregue).

## Status do Projeto

O projeto NerdOS API encontra-se atualmente na fase de planejamento e estrutura inicial.

## Funcionalidades

As principais funcionalidades planejadas para a plataforma incluem:

**Funcionalidades de Usuário:**

- Cadastro, login e gerenciamento de perfil de usuário.
- Autenticação segura com hash de senha.
- Validação de dados de entrada com critérios de segurança.

**Funcionalidades de Clientes e Aparelhos:**

- CRUD completo de Clientes (Nome, Telefone/WhatsApp, CPF).
- CRUD completo de Aparelhos vinculados a Clientes (Marca, Modelo, IMEI/Nº Série).
- Consulta de histórico do cliente (aparelhos + OSs).

**Funcionalidades de Ordem de Serviço:**

- Criação de OS vinculada a Cliente e Aparelho.
- Geração automática de número de OS sequencial e único.
- Gestão de status da OS com fluxo claro.
- Atualização de diagnóstico técnico, serviço realizado, peças utilizadas e valor final.
- Endpoints de Dashboard com estatísticas de OS e faturamento.

## Tecnologias Utilizadas

O desenvolvimento da NerdOS API utiliza as seguintes tecnologias:

- **Linguagem:** TypeScript
- **Build Tool:** npm
- **Framework Backend:** Fastify
- **Framework de Testes:** Jest
- **SGBD Relacional:** PostgreSQL (Hospedado no Supabase)
- **ORM:** Prisma
- **Autenticação:** jsonwebtoken com bcryptjs para hash de senhas
- **Validação de Schemas:** Zod (Integrado via `fastify-type-provider-zod`)
- **Documentação de API:** @fastify/swagger e @fastify/swagger-ui (Geração automática via Schemas Zod)
- **Configuração de Ambiente:** dotenv

## Licença

Este projeto está licenciado sob a [Licença GNU General Public License v3.0](LICENSE).
