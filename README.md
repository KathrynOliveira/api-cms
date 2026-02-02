# 🚀 API CMS (Gestão de Conteúdo)

Uma API RESTful para gerenciamento de usuários, artigos e categorias, com autenticação JWT, roles (ADMIN/AUTHOR), validação, segurança e testes automatizados.

## 🛠️ Tecnologias Utilizadas

- 🟩 **Node.js** + **Express**
- 🟦 **TypeScript**
- 🟪 **Prisma ORM** + 🐘 **PostgreSQL**
- 🔐 **JWT** (jsonwebtoken)
- 🔑 **bcrypt**
- ✅ **express-validator**
- 🛡️ **helmet**
- 🚦 **express-rate-limit**
- 🐳 **Docker**
- 🧪 **Jest** + **Supertest**

## 📋 Regras de Negócio

- 👤 Usuários podem ser **ADMIN** ou **AUTHOR**
- ✏️ Apenas **ADMIN** pode editar/remover qualquer artigo; **AUTHOR** só pode editar/remover seus próprios artigos
- 🚫 Não é possível remover uma categoria se houver artigos vinculados
- 🔒 Autenticação via JWT obrigatória para rotas protegidas
- 🧹 Validação de dados em todas as rotas de entrada
- 🚦 Limite de requisições na rota de login para evitar brute force

## ⚙️ Variáveis de Ambiente (.env)

- `DATABASE_URL` - string de conexão do PostgreSQL
- `JWT_SECRET` - segredo para assinar tokens JWT
- `PORT` - porta do servidor (opcional, padrão 3000)

## 📚 Rotas da API

### 🔑 Auth

- `POST /api/auth/login` - Login (JWT + cookie)

### 👤 Usuários

- `GET /api/users` - Listar usuários (paginação)
- `GET /api/users/me` - Dados do usuário autenticado
- `POST /api/users` - Criar usuário

### 📝 Artigos

- `GET /api/articles` - Listar artigos (paginação)
- `GET /api/articles/category/:categoryId` - Listar artigos por categoria
- `POST /api/articles` - Criar artigo (autenticado)
- `PUT /api/articles/:id` - Editar artigo (ADMIN ou se for o próprio autor)
- `DELETE /api/articles/:id` - Remover artigo (ADMIN ou autor)

### 🏷️ Categorias

- `GET /api/categories` - Listar categorias (paginação)
- `POST /api/categories` - Criar categoria (ADMIN)
- `PUT /api/categories/:id` - Editar categoria (ADMIN)
- `DELETE /api/categories/:id` - Remover categoria (ADMIN, só se não houver artigos)

## ▶️ Como Rodar o Projeto

1. 📥 Clone o repositório e instale as dependências:
   ```sh
   git clone <repo-url>
   cd api-cms
   npm install
   ```
2. ⚙️ Configure o arquivo `.env` com as variáveis necessárias.
3. 🐳 Suba o banco de dados (exemplo com Docker):
   ```sh
   docker-compose up -d
   ```
4. 🟪 Rode as migrations do Prisma:
   ```sh
   npx prisma migrate dev
   ```
5. ▶️ Inicie a API:
   ```sh
   npm run dev
   # ou
   npx ts-node src/app.ts
   ```

## 🧪 Rodando os Testes

```sh
npm test
```

Os testes cobrem autenticação, regras de permissão, validação e fluxos principais da API.

## 👨‍💻 Desenvolvido por

- [Kathryn Oliveira](https://github.com/KathrynOliveira)
