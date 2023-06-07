# Aplicação para organizar a festa junina
O projeto foi construido **vite** usando ReactJS e as bibliotecas Styled-Components para estilização, Reack Hook Forms e Zod para os formulários e validações, Axios para realização das requisições para API.

## Executando o projeto

1. Instalação de dependência
``npm install``

2. Execução em modo de desenvolvimento
``npm run dev``

Para buildar o projeto, basta executar o comando
``npm run build``

## Padronização de código
No projeto está sendo utilizando o ESlint para a padronização de código. O template ultilizado foi o da **Rocketseat** que tem como base o Style Guide do AirBnB

Para verificar erros de lint:
``npm run lint``

Para corrigir os erros:
``npm run lint:fix``

## Variáveis de ambiente
Para que o projeto funcione corretamente, é necessário que as variáveis sejam configuradas corretamente. É necessário alterar o arquivo ``.env`` encontrado na raiz do projeto. Também existe um arquivo chamado ``.env.example`` ele é um arquivo de exemplo com as variáveis de ambiente presentes no projeto.

Variáveis:
- VITE_BASE_URL -> Essa variável é a URL do API

