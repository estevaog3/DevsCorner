# DevsCorner

Minha primeira aplicação web com Node no backend e React no frontend. Este projeto foi desenvolvido durante a Semana OmniStack 8.

O DevsCorner é um site para desenvolvedores avaliarem outros desenvolvedores e, 
quem sabe, encontrar alguém para fazer um _pair programming_ ou apenas trocar uma ideia. 
Funciona da seguinte maneira: Quando dois programadores curtem um ao outro, ocorre um _match_.
O site exibe uma mensagem de _match_ para os desenvolvedores em tempo real, para que eles possam ser felizes em seus projetos juntos.

### How to run

##### Pré-requisitos:
`git`, `node`, `npm`, `yarn` e um banco de dados no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (pode ser criado gratuitamente)

1. Clone o repositório e abra um terminal no diretório do projeto DevsCorner;

2. Crie este arquivo para definição de variáveis de ambiente: `touch backend/.env`. Ele deve conter as variáveis a seguir. (Insira os valores correspondentes às credenciais do seu banco de dados MongoDB.)
```
DB_USERNAME=<nome de usuário>
DB_PASSWORD=<senha>
DB_NAME=<nome do banco de dados>
```
3. Inicialize o servidor Node localmente: `cd backend && yarn install && yarn init-server`;
4. Abra outro terminal no diretório do projeto;
5. Inicie a aplicação web: `cd frontend && yarn install && yarn start`;
6. Abra a página de login no seu navegador: `http://localhost:3000`.
