# Regras de Negócio

## Gerenciamento de Usuário

- RN-U01: O endereço de e-mail deve ser único para cada usuário na plataforma.
- RN-U02: Um nome de usuário (apelido) deve ser único na plataforma.
- RN-U03: Para o cadastro, a senha deve obedecer a critérios mínimos de segurança (mínimo de 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais).
- RN-U04: As ações de um usuário só pode afetar o seu próprio perfil.

## Gerenciamento de Clientes e Aparelhos

- RN-CA01: Um Aparelho deve ser obrigatoriamente associado a um Cliente (relação 1:N).
- RN-CA02: O Cliente deve ter campos como Nome, Telefone/WhatsApp e CPF.
- RN-CA03: O Aparelho deve ter campos como Marca, Modelo e IMEI/Nº Série.

## Gerenciamento de Ordem de Serviço (OS)

- RN-OS01: Ao criar uma OS, deve-se vincular um Cliente e um de seus Aparelhos, registrando o "defeito reclamado" inicial.
- RN-OS02: O backend deve gerar um **número de OS sequencial e único** (ex: "2024-001") que serve como identificador de negócio.
- RN-OS03: A OS deve ter um fluxo de status claro (ex: 'Em Análise', 'Aguardando Aprovação', 'Em Reparo', 'Concluído', 'Entregue').
- RN-OS04: O técnico deve poder atualizar a OS com "diagnóstico técnico", "serviço realizado", "peças utilizadas" e o "valor" final do serviço.
