# Projeto

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

projeto/
│
├── server/                # Backend - API
│   ├── src/               # Código fonte do servidor
│   ├── .env               # Variáveis de ambiente para configuração do servidor
│   ├── package.json       # Dependências e scripts do backend
│   ├── prisma/            # Configuração do Prisma
│   └── db/                # Scripts para manipulação do banco de dados
│
└── web/                   # Frontend - Aplicação React
├── public/            # Arquivos públicos (HTML, imagens, etc.)
├── src/               # Código fonte do frontend
├── .env               # Variáveis de ambiente para configuração do frontend
└── package.json       # Dependências e scripts do frontend


## Tecnologias Utilizadas

### Backend (server)
- **Node.js** e **Express**: Framework para construção do backend.
- **Prisma**: ORM para conectar e manipular dados no banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados da aplicação.

### Frontend (web)
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Material-UI**: Framework de componentes para estilização.
- **Axios**: Para chamadas à API do backend.
- **React Router**: Para navegação entre as páginas do aplicativo.

## 1. Configuração do Backend

### 1.1 Instalar dependências

Acesse a pasta server e instale as dependências
```bash
cd server
npm install
```
### 1.2 Configurar variáveis de ambiente

Configure o arquivo .env na pasta server

### 1.3 Rodar as migrações do banco de dados
No diretório server, rode as migrações para configurar o banco de dados:
```bash
npx prisma migrate dev --name init
```

### 1.4 Rodar as migrações do banco de dados
Para popular o banco de dados com dados iniciais, como produtos de exemplo, execute o script de seed:
```bash
node src/db/addProducts.js
```

Para Limpar o banco
```bash
node src/db/clearProducts.js
```

### 1.5 Rodar o backend
```bash
npm run dev
```

## 2. Configuração do Frontend
### 2.1 Instalar dependências

Acesse a pasta web e instale as dependências
```bash
cd web
npm install
```
### 2.2 Configurar variáveis de ambiente

Configure o arquivo .env na pasta web


### 2.3 Rodar o frontend
Agora, rode o servidor frontend:
```bash
npm start
```

