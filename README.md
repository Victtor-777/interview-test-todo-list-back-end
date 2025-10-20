# 📝 Todo List API - Backend

API RESTful completa para gerenciamento de tarefas (Todo List) construída com **NestJS**, **Prisma**, **PostgreSQL** e **Clean Architecture**.

---

## 📑 Índice

- [📋 Sobre o Projeto](#-sobre-o-projeto)
- [🏗️ Arquitetura](#️-arquitetura)
- [🚀 Tecnologias](#-tecnologias)
- [📦 Pré-requisitos](#-pré-requisitos)
- [⚙️ Instalação](#️-instalação)
- [🔧 Configuração](#-configuração)
- [🗄️ Banco de Dados](#️-banco-de-dados)
- [▶️ Executando o Projeto](#️-executando-o-projeto)
- [🧪 Testes](#-testes)
- [📚 Documentação da API](#-documentação-da-api)
- [🛣️ Rotas da API](#️-rotas-da-api)
  - [🔐 Autenticação](#-autenticação)
  - [✅ Tasks](#-tasks)
- [🔒 Autenticação e Autorização](#-autenticação-e-autorização)
- [👥 Roles e Permissões](#-roles-e-permissões)
- [📊 Estrutura de Dados](#-estrutura-de-dados)
- [🎯 Casos de Uso](#-casos-de-uso)
- [📁 Estrutura de Pastas](#-estrutura-de-pastas)
- [🔍 Padrões de Código](#-padrões-de-código)
- [🐳 Docker](#-docker)
- [🚨 Tratamento de Erros](#-tratamento-de-erros)
- [📝 Exemplos de Uso](#-exemplos-de-uso)
- [🤝 Contribuindo](#-contribuindo)
- [📄 Licença](#-licença)

---

## 📋 Sobre o Projeto

API completa para gerenciamento de tarefas com autenticação JWT, controle de permissões (ADMIN/USER) e CRUD completo de tasks.

### ✨ Funcionalidades

- ✅ Autenticação JWT (Sign Up / Login)
- ✅ Controle de permissões (ADMIN / USER)
- ✅ CRUD completo de Tasks
- ✅ Marcação automática de data de conclusão
- ✅ Filtro de tasks por usuário/role
- ✅ Validação de dados com class-validator
- ✅ Documentação Swagger completa
- ✅ Testes unitários (100% coverage)
- ✅ Clean Architecture
- ✅ Docker + Docker Compose

---

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture** e **SOLID**, com separação clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│                  (Controllers, DTOs, Swagger)                │
├─────────────────────────────────────────────────────────────┤
│                     USE CASES LAYER                          │
│         (Business Logic, Application Services)               │
├─────────────────────────────────────────────────────────────┤
│                      DOMAIN LAYER                            │
│          (Entities, Repositories, Adapters)                  │
├─────────────────────────────────────────────────────────────┤
│                  INFRASTRUCTURE LAYER                        │
│     (Prisma, Database, Cryptography, Token, etc)            │
└─────────────────────────────────────────────────────────────┘
```

### Camadas

#### **1. Domain Layer** (`src/domain`)

- **Entities**: Modelos de domínio (User, Task)
- **Repositories**: Interfaces de repositórios
- **Adapters**: Interfaces de serviços externos (Token, Cryptography, Exceptions)

#### **2. Use Cases Layer** (`src/use-cases`)

- **User**: SignUp, Login, GetCurrentUser
- **Task**: Create, Update, Delete, FindById, FindAll
- **Authentication**: RouteAuthentication, RoleValidator
- **Mapper**: UserMapper

#### **3. Infrastructure Layer** (`src/infra`)

- **Controllers**: Endpoints HTTP
- **Repositories**: Implementação com Prisma
- **Integrations**: JWT, Bcrypt, Exception handling
- **Modules**: Organização do NestJS
- **Config**: Swagger, Prisma, Environment

#### **4. Tests** (`test`)

- **Stubs**: Mocks para testes unitários
- **Unit Tests**: 61 testes cobrindo 100% dos use cases

---

## 🚀 Tecnologias

### Core

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset do JavaScript
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional

### Autenticação e Segurança

- **[JWT](https://jwt.io/)** - JSON Web Tokens
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hash de senhas

### Validação e Documentação

- **[class-validator](https://github.com/typestack/class-validator)** - Validação de DTOs
- **[class-transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos
- **[Swagger](https://swagger.io/)** - Documentação OpenAPI

### Testes

- **[Jest](https://jestjs.io/)** - Framework de testes
- **[ts-jest](https://kulshekhar.github.io/ts-jest/)** - Preset Jest para TypeScript

### DevOps

- **[Docker](https://www.docker.com/)** - Containerização
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração de containers

---

## 📦 Pré-requisitos

- **Node.js** >= 18.x
- **pnpm** >= 8.x (ou npm/yarn)
- **Docker** >= 20.x (opcional, mas recomendado)
- **PostgreSQL** >= 13.x (se não usar Docker)

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd back-end
```

### 2. Instale as dependências

```bash
pnpm install
```

---

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

**`.env` (Exemplo completo):**

```env
# Application
NODE_ENV=development
PORT=3001

# Prisma Database URL
DATABASE_URL=postgresql://todo_user:todo_password_2025@localhost:5432/todo_database?schema=public

# Database PostgreSQL
POSTGRES_USER=todo_user
POSTGRES_PASSWORD=todo_password_2025
POSTGRES_DB=todo_database
PGPORT=5432

# JWT Authentication
JWT_SECRET=todo_list_jwt_secret_2025
```

### 2. Configurações Importantes

#### **DATABASE_URL**

- Formato: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA`
- Usado pelo Prisma para conexão com o banco

#### **JWT_SECRET**

- Chave secreta para assinar tokens JWT
- **⚠️ NUNCA commit essa chave em produção!**
- Gere uma chave forte: `openssl rand -base64 32`

---

## 🗄️ Banco de Dados

### Com Docker (Recomendado)

#### 1. Subir o PostgreSQL

```bash
pnpm docker:up
```

Isso vai:

- ✅ Criar container `todo-list` com PostgreSQL 13
- ✅ Expor na porta `5432`
- ✅ Criar volume persistente `todo-list-postgres-volume`

#### 2. Verificar container

```bash
docker ps
```

**Saída esperada:**

```
CONTAINER ID   IMAGE         STATUS       PORTS                    NAMES
62e3e7e541d3   postgres:13   Up 2 hours   0.0.0.0:5432->5432/tcp   todo-list
```

### Sem Docker

Se você já tem PostgreSQL instalado:

1. Crie o banco de dados:

```sql
CREATE DATABASE todo_database;
CREATE USER todo_user WITH PASSWORD 'todo_password_2025';
GRANT ALL PRIVILEGES ON DATABASE todo_database TO todo_user;
```

2. Atualize o `.env` com suas credenciais

---

## 🚀 Migrations

### Executar migrations

```bash
# Development
pnpm prisma:dev

# Production
pnpm prisma:deploy
```

### Ver o banco de dados (Prisma Studio)

```bash
pnpm prisma:studio
```

Abre interface visual em: `http://localhost:5555`

### Outras operações

```bash
# Gerar Prisma Client
pnpm prisma:generate

# Sincronizar schema com o banco (força)
pnpm prisma:push

# Resetar banco (CUIDADO: apaga todos os dados!)
pnpm prisma:reset
```

---

## ▶️ Executando o Projeto

### Development (modo watch)

```bash
pnpm start:dev
```

Servidor rodando em: `http://localhost:3001`

### Production

```bash
# Build
pnpm build

# Start
pnpm start:prod
```

---

## 🧪 Testes

### Estrutura de Testes

O projeto possui **61 testes unitários** cobrindo 100% dos use cases:

```
Use Cases                      │ Testes │ Cobertura
──────────────────────────────┼────────┼──────────
CreateTaskUseCase             │   6    │   100%
UpdateTaskUseCase             │   9    │   100%
DeleteTaskUseCase             │   8    │   100%
FindTaskByIdUseCase           │   8    │   100%
FindAllTasksUseCase           │   8    │   100%
UserMapperUseCase             │   5    │   100%
RouteAuthenticationUseCase    │   7    │   100%
RoleValidatorUseCase          │  10    │   100%
──────────────────────────────┼────────┼──────────
TOTAL                         │  61    │   100%
```

### Executar testes

```bash
# Todos os testes
pnpm test

# Modo watch (desenvolvimento)
pnpm test:watch

# Coverage (relatório de cobertura)
pnpm test:cov

# Teste específico
pnpm test create.spec.ts
```

### Relatório de Coverage

Após `pnpm test:cov`, abra: `coverage/lcov-report/index.html`

---

## 📚 Documentação da API

### Swagger UI

Acesse: **http://localhost:3001/api**

Documentação interativa com:

- ✅ Todos os endpoints
- ✅ Exemplos de request/response
- ✅ Autenticação Bearer Token
- ✅ Teste direto na interface

---

## 🛣️ Rotas da API

### Base URL

```
http://localhost:3001
```

---

## 🔐 Autenticação

### 1️⃣ Sign Up (Criar Conta)

```http
POST /auth/signup
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123",
  "role": "USER" // Opcional: "USER" ou "ADMIN" (padrão: "USER")
}
```

**Response (201 Created):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "createdAt": "2025-10-20T10:00:00.000Z",
  "updatedAt": "2025-10-20T10:00:00.000Z"
}
```

**Validações:**

- ✅ Email válido e único
- ✅ Senha mínima 8 caracteres
- ✅ `password` === `confirmPassword`

---

### 2️⃣ Login

```http
POST /auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (200 OK):**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token Payload:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

### 3️⃣ Get Current User

```http
GET /auth/me
```

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "createdAt": "2025-10-20T10:00:00.000Z",
  "updatedAt": "2025-10-20T10:00:00.000Z"
}
```

---

## ✅ Tasks

> **🔒 Todas as rotas de Tasks exigem autenticação!**

---

### 1️⃣ Criar Task

```http
POST /tasks
```

**Headers:**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**

```json
{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread" // Opcional
}
```

**Response (201 Created):**

```json
{
  "id": "task-uuid",
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread",
  "isCompleted": false,
  "completedAt": null,
  "userId": "user-uuid",
  "createdAt": "2025-10-20T10:00:00.000Z",
  "updatedAt": "2025-10-20T10:00:00.000Z"
}
```

---

### 2️⃣ Listar Todas as Tasks

```http
GET /tasks
```

**Headers:**

```
Authorization: Bearer {token}
```

**Response (200 OK):**

```json
[
  {
    "id": "task-1",
    "title": "Buy groceries",
    "description": "Buy milk",
    "isCompleted": false,
    "completedAt": null,
    "userId": "user-uuid",
    "createdAt": "2025-10-20T10:00:00.000Z",
    "updatedAt": "2025-10-20T10:00:00.000Z"
  },
  {
    "id": "task-2",
    "title": "Read book",
    "description": null,
    "isCompleted": true,
    "completedAt": "2025-10-20T15:30:00.000Z",
    "userId": "user-uuid",
    "createdAt": "2025-10-19T10:00:00.000Z",
    "updatedAt": "2025-10-20T15:30:00.000Z"
  }
]
```

**Regras:**

- **USER**: Vê apenas suas próprias tasks
- **ADMIN**: Vê todas as tasks de todos os usuários

---

### 3️⃣ Buscar Task por ID

```http
GET /tasks/{id}
```

**Headers:**

```
Authorization: Bearer {token}
```

**Path Params:**

- `id` (UUID) - ID da task

**Response (200 OK):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread",
  "isCompleted": false,
  "completedAt": null,
  "userId": "user-uuid",
  "createdAt": "2025-10-20T10:00:00.000Z",
  "updatedAt": "2025-10-20T10:00:00.000Z"
}
```

**Erros:**

- **404 Not Found** - Task não existe
- **403 Forbidden** - USER tentando acessar task de outro usuário

---

### 4️⃣ Atualizar Task

```http
PUT /tasks/{id}
```

**Headers:**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body (todos os campos são opcionais):**

```json
{
  "title": "Buy groceries and fruits",
  "description": "Updated description",
  "isCompleted": true
}
```

**Response (200 OK):**

```json
{
  "id": "task-uuid",
  "title": "Buy groceries and fruits",
  "description": "Updated description",
  "isCompleted": true,
  "completedAt": "2025-10-20T16:00:00.000Z", // ✅ Preenchido automaticamente
  "userId": "user-uuid",
  "createdAt": "2025-10-20T10:00:00.000Z",
  "updatedAt": "2025-10-20T16:00:00.000Z"
}
```

**Regras Especiais:**

1. **Marcar como completada** (`isCompleted: true`):
   - `completedAt` é preenchido automaticamente
2. **Desmarcar como completada** (`isCompleted: false`):
   - `completedAt` é setado para `null`

---

### 5️⃣ Deletar Task

```http
DELETE /tasks/{id}
```

**Headers:**

```
Authorization: Bearer {token}
```

**Response (204 No Content)**

- Sem body na resposta

**Erros:**

- **404 Not Found** - Task não existe
- **403 Forbidden** - USER tentando deletar task de outro usuário

---

## 🔒 Autenticação e Autorização

### Como Funciona

1. **Login** → Recebe `accessToken`
2. **Salvar token** (localStorage, cookies, etc)
3. **Enviar token** em todas as requisições protegidas:

```http
Authorization: Bearer {accessToken}
```

### Formato do Token

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImlhdCI6MTczMjEyMzQ1Nn0.XYZ...
```

### Decodificação do Token

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "iat": 1732123456
}
```

---

## 👥 Roles e Permissões

### Roles Disponíveis

| Role      | Descrição                      |
| --------- | ------------------------------ |
| **USER**  | Usuário comum (padrão)         |
| **ADMIN** | Administrador com acesso total |

### Matriz de Permissões

| Ação             | USER       | ADMIN       |
| ---------------- | ---------- | ----------- |
| **Criar task**   | ✅ Própria | ✅ Qualquer |
| **Listar tasks** | ✅ Só suas | ✅ Todas    |
| **Ver task**     | ✅ Só suas | ✅ Qualquer |
| **Editar task**  | ✅ Só suas | ✅ Qualquer |
| **Deletar task** | ✅ Só suas | ✅ Qualquer |

---

## 📊 Estrutura de Dados

### User Entity

```typescript
interface User {
  id: string; // UUID (ULID)
  name: string;
  email: string; // Único
  password: string; // Hash bcrypt
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}
```

### Task Entity

```typescript
interface Task {
  id: string; // UUID (ULID)
  title: string;
  description?: string | null;
  isCompleted: boolean;
  completedAt?: Date | null; // Preenchido automaticamente
  userId: string; // FK para User
  createdAt: Date;
  updatedAt: Date;
}
```

### Relacionamentos

```
User (1) ──────── (N) Task
  │                      │
  └──────────────────────┘
       userId (FK)
```

---

## 🎯 Casos de Uso

### User Use Cases

#### **1. SignUpUseCase**

```typescript
Entrada: { name, email, password, confirmPassword, role? }
Validações:
  - Email único
  - Senha === confirmPassword
  - Senha hash com bcrypt (10 rounds)
Saída: User (sem password)
```

#### **2. LoginUseCase**

```typescript
Entrada: { email, password }
Validações:
  - Usuário existe
  - Senha correta (bcrypt.compare)
Saída: { accessToken: string }
```

#### **3. GetCurrentUserUseCase**

```typescript
Entrada: userId (do token JWT)
Validações:
  - Usuário existe
Saída: User (sem password)
```

---

### Task Use Cases

#### **1. CreateTaskUseCase**

```typescript
Entrada: { title, description?, user }
Validações:
  - Title não vazio
  - UserId do token
Saída: Task
```

#### **2. UpdateTaskUseCase**

```typescript
Entrada: { id, title?, description?, isCompleted?, user }
Validações:
  - Task existe
  - Permissão (USER: só suas | ADMIN: qualquer)
  - Se isCompleted = true → completedAt = now()
  - Se isCompleted = false → completedAt = null
Saída: Task
```

#### **3. DeleteTaskUseCase**

```typescript
Entrada: { id, user }
Validações:
  - Task existe
  - Permissão (USER: só suas | ADMIN: qualquer)
Saída: void
```

#### **4. FindTaskByIdUseCase**

```typescript
Entrada: { id, user }
Validações:
  - Task existe
  - Permissão (USER: só suas | ADMIN: qualquer)
Saída: Task
```

#### **5. FindAllTasksUseCase**

```typescript
Entrada: { user }
Lógica:
  - Se USER → findAll(userId)
  - Se ADMIN → findAll()
Saída: Task[]
```

---

### Authentication Use Cases

#### **1. RouteAuthenticationUseCase**

```typescript
Entrada: Request (com header Authorization)
Validações:
  - Header "Authorization: Bearer {token}" existe
  - Token válido (JWT.verify)
  - Usuário existe no banco
Saída: Request.user = User
```

#### **2. RoleValidatorUseCase**

```typescript
Entrada: { roles: UserRole[], user?: User }
Validações:
  - Usuário existe
  - Role do usuário está na lista permitida
Saída: boolean
```

---

## 📁 Estrutura de Pastas

```
back-end/
├── prisma/
│   ├── migrations/           # Histórico de migrations
│   └── schema.prisma         # Schema do banco
├── src/
│   ├── domain/              # Camada de Domínio
│   │   ├── adapters/        # Interfaces de serviços
│   │   │   ├── cryptography.ts
│   │   │   ├── exceptions.ts
│   │   │   └── token.ts
│   │   ├── entities/        # Entidades do domínio
│   │   │   ├── base.ts
│   │   │   ├── task.ts
│   │   │   └── user.ts
│   │   └── repositories/    # Interfaces de repositórios
│   │       ├── task.ts
│   │       └── user.ts
│   ├── use-cases/          # Camada de Aplicação
│   │   ├── authentication/
│   │   │   ├── role-validator/
│   │   │   └── route-authentication/
│   │   ├── mapper/
│   │   │   └── user/
│   │   ├── task/
│   │   │   ├── create/
│   │   │   ├── update/
│   │   │   ├── delete/
│   │   │   ├── find-by-id/
│   │   │   └── find-all/
│   │   └── user/
│   │       ├── sign-up/
│   │       ├── login/
│   │       └── current-user/
│   └── infra/              # Camada de Infraestrutura
│       ├── commons/
│       │   └── decorators/  # Decorators NestJS
│       ├── config/
│       │   ├── env/         # Validação de variáveis
│       │   ├── prisma/      # Prisma Client
│       │   └── swagger/     # Documentação OpenAPI
│       ├── controllers/     # Endpoints HTTP
│       │   ├── auth/
│       │   └── task/
│       ├── integrations/    # Serviços externos
│       │   ├── cryptography/
│       │   ├── exceptions/
│       │   └── token/
│       ├── modules/         # Módulos NestJS
│       │   ├── app/
│       │   ├── authentication/
│       │   ├── cryptography/
│       │   ├── database/
│       │   ├── exceptions/
│       │   ├── task/
│       │   ├── token/
│       │   └── user/
│       └── repositories/    # Implementação com Prisma
│           ├── task/
│           └── user/
├── test/
│   └── stubs/              # Mocks para testes
│       ├── adapters/
│       └── repositories/
├── .env                    # Variáveis de ambiente
├── .env.example            # Template de variáveis
├── docker-compose.yml      # Configuração Docker
├── nest-cli.json          # Configuração NestJS
├── package.json           # Dependências
├── tsconfig.json          # Configuração TypeScript
└── README.md              # Este arquivo
```

---

## 🔍 Padrões de Código

### Clean Architecture

O projeto segue **4 princípios fundamentais**:

1. **Dependency Inversion**: Dependências sempre apontam para dentro (domain)
2. **Separation of Concerns**: Cada camada tem uma responsabilidade única
3. **Testability**: 100% dos use cases testáveis sem infraestrutura
4. **Framework Independence**: Domain não conhece NestJS/Prisma

### SOLID Principles

#### **Single Responsibility Principle (SRP)**

```typescript
// ✅ Cada use case faz UMA coisa
export class CreateTaskUseCase {
  async execute(data: CreateTaskDto, user: User): Promise<Task> {
    // Apenas cria task
  }
}
```

#### **Open/Closed Principle (OCP)**

```typescript
// ✅ Aberto para extensão, fechado para modificação
export interface ExceptionsAdapter {
  badRequest(data?: any): void;
  unauthorized(data?: any): void;
  // Pode adicionar novos métodos sem quebrar existentes
}
```

#### **Liskov Substitution Principle (LSP)**

```typescript
// ✅ Implementações podem ser substituídas
class PrismaTaskRepository implements TaskRepository {}
class InMemoryTaskRepository implements TaskRepository {} // Para testes
```

#### **Interface Segregation Principle (ISP)**

```typescript
// ✅ Interfaces específicas
export interface TaskRepository {
  create(data: CreateTaskParams): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  // Apenas métodos que TaskRepository precisa
}
```

#### **Dependency Inversion Principle (DIP)**

```typescript
// ✅ Dependências via interfaces (abstrações)
export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository, // Interface!
    private readonly exceptionService: ExceptionsAdapter // Interface!
  ) {}
}
```

---

## 🐳 Docker

### Docker Compose

**`docker-compose.yml`:**

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:13
    container_name: todo-list
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - todo-list-postgres-volume:/var/lib/postgresql/data

volumes:
  todo-list-postgres-volume:
    name: todo-list-postgres-volume
```

### Comandos Docker

```bash
# Subir container
pnpm docker:up
# ou
docker-compose up -d

# Parar container
pnpm docker:down
# ou
docker-compose down

# Ver logs
docker-compose logs -f postgres

# Acessar terminal do container
docker exec -it todo-list psql -U todo_user -d todo_database

# Remover volumes (apaga dados!)
docker-compose down -v
```

### Configuração de Restart Policy

```bash
# Ver política atual
docker inspect todo-list | grep -i restart

# Mudar para "unless-stopped" (recomendado)
docker update --restart=unless-stopped todo-list

# Opções:
# - no: Nunca reinicia
# - always: Sempre reinicia (mesmo após reboot)
# - unless-stopped: Reinicia, exceto se parado manualmente
# - on-failure: Reinicia apenas se falhou
```

---

## 🚨 Tratamento de Erros

### Estrutura de Exceções

```typescript
// ExceptionsAdapter Interface
export interface ExceptionsAdapter {
  badRequest(data?: any): void;
  unauthorized(data?: any): void;
  forbidden(data?: any): void;
  notFound(data?: any): void;
  wrongCredentials(): void;
  internalServerError(data?: any): void;
}
```

### Códigos HTTP Retornados

| Código  | Método                  | Quando Usar                        |
| ------- | ----------------------- | ---------------------------------- |
| **400** | `badRequest()`          | Dados inválidos, validação falhou  |
| **401** | `unauthorized()`        | Token inválido/ausente             |
| **403** | `forbidden()`           | Sem permissão para acessar recurso |
| **404** | `notFound()`            | Recurso não encontrado             |
| **500** | `internalServerError()` | Erro não tratado                   |

### Exemplo de Resposta de Erro

```json
{
  "message": "Task not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### Uso nos Use Cases

```typescript
export class FindTaskByIdUseCase {
  async execute(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      return this.exceptionService.notFound({
        message: "Task not found"
      });
    }

    if (user.role !== UserRole.ADMIN && task.userId !== user.id) {
      return this.exceptionService.forbidden({
        message: "You do not have permission to access this task"
      });
    }

    return task;
  }
}
```

---

## 📝 Exemplos de Uso

### Fluxo Completo: Sign Up → Login → Criar Task

```typescript
// 1. SIGN UP
const signUpResponse = await fetch("http://localhost:3001/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    password: "Password123",
    confirmPassword: "Password123",
    role: "USER"
  })
});

const user = await signUpResponse.json();
console.log("User created:", user);

// 2. LOGIN
const loginResponse = await fetch("http://localhost:3001/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "john@example.com",
    password: "Password123"
  })
});

const { accessToken } = await loginResponse.json();
localStorage.setItem("token", accessToken);

// 3. GET CURRENT USER
const currentUserResponse = await fetch("http://localhost:3001/auth/me", {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const currentUser = await currentUserResponse.json();
console.log("Current user:", currentUser);

// 4. CREATE TASK
const createTaskResponse = await fetch("http://localhost:3001/tasks", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Buy groceries",
    description: "Buy milk, eggs, and bread"
  })
});

const task = await createTaskResponse.json();
console.log("Task created:", task);

// 5. LIST ALL TASKS
const tasksResponse = await fetch("http://localhost:3001/tasks", {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const tasks = await tasksResponse.json();
console.log("Tasks:", tasks);

// 6. UPDATE TASK (marcar como completada)
const updateTaskResponse = await fetch(
  `http://localhost:3001/tasks/${task.id}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isCompleted: true
    })
  }
);

const updatedTask = await updateTaskResponse.json();
console.log("Task updated:", updatedTask);
// completedAt será preenchido automaticamente!

// 7. DELETE TASK
await fetch(`http://localhost:3001/tasks/${task.id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

console.log("Task deleted!");
```

---

### Exemplo com Axios

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Sign Up
const { data: user } = await api.post("/auth/signup", {
  name: "John Doe",
  email: "john@example.com",
  password: "Password123",
  confirmPassword: "Password123"
});

// Login
const {
  data: { accessToken }
} = await api.post("/auth/login", {
  email: "john@example.com",
  password: "Password123"
});

localStorage.setItem("token", accessToken);

// Get Current User
const { data: currentUser } = await api.get("/auth/me");

// Create Task
const { data: task } = await api.post("/tasks", {
  title: "Buy groceries",
  description: "Buy milk, eggs, and bread"
});

// List Tasks
const { data: tasks } = await api.get("/tasks");

// Update Task
const { data: updatedTask } = await api.put(`/tasks/${task.id}`, {
  isCompleted: true
});

// Delete Task
await api.delete(`/tasks/${task.id}`);
```

---

### Tratamento de Erros

```typescript
try {
  const response = await fetch("http://localhost:3001/tasks/invalid-id", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();

    switch (response.status) {
      case 401:
        console.error("Token inválido, redirecionar para login");
        window.location.href = "/login";
        break;
      case 403:
        console.error("Sem permissão:", error.message);
        break;
      case 404:
        console.error("Task não encontrada:", error.message);
        break;
      default:
        console.error("Erro:", error.message);
    }

    throw new Error(error.message);
  }

  const task = await response.json();
  console.log("Task:", task);
} catch (error) {
  console.error("Erro na requisição:", error);
}
```

---

## 🤝 Contribuindo

### Como Contribuir

1. **Fork o projeto**
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit suas mudanças** (`git commit -m 'Add some AmazingFeature'`)
4. **Push para a branch** (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Padrões de Commit

Seguimos o padrão **Conventional Commits**:

```
feat: adiciona endpoint GET /auth/me
fix: corrige validação de senha no SignUp
docs: atualiza README com exemplos de uso
test: adiciona testes para UpdateTaskUseCase
refactor: melhora estrutura do ExceptionsAdapter
chore: atualiza dependências do projeto
```

### Checklist de PR

- [ ] Código segue os padrões de Clean Architecture
- [ ] Testes unitários adicionados/atualizados
- [ ] Coverage mantido em 100%
- [ ] Documentação atualizada (README, Swagger)
- [ ] Sem erros de lint (`pnpm lint`)
- [ ] Build funciona (`pnpm build`)

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contato

- **GitHub**: [Victtor-777](https://github.com/Victtor-777)

---

## 🙏 Agradecimentos

- [NestJS](https://nestjs.com/) - Framework incrível
- [Prisma](https://www.prisma.io/) - ORM moderno e type-safe
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados robusto
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Princípios de arquitetura

---

## 📊 Estatísticas do Projeto

```
Languages:
├── TypeScript      95.2%
├── JavaScript       3.1%
├── Dockerfile       1.2%
└── Shell            0.5%

Files:              127
Lines of Code:      3,450
Tests:              61
Test Coverage:      100%
```

---

## 🚀 Próximos Passos

- [ ] Implementar refresh token
- [ ] Adicionar paginação nas listagens
- [ ] Implementar filtros avançados
- [ ] Adicionar websockets para atualizações em tempo real
- [ ] Implementar rate limiting
- [ ] Adicionar logs estruturados (Winston)
- [ ] Implementar cache com Redis
- [ ] Adicionar CI/CD (GitHub Actions)
- [ ] Deploy em produção (AWS/Heroku/Railway)

---

## 📖 Recursos Adicionais

### Documentação

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)

### Tutoriais

- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [RESTful API Best Practices](https://restfulapi.net/)

---

**Desenvolvido com ❤️ usando NestJS + Clean Architecture**

---

## 📝 Changelog

### [1.0.0] - 2025-10-20

#### ✨ Added

- Autenticação JWT completa (Sign Up / Login / Get Current User)
- CRUD completo de Tasks
- Sistema de permissões (USER / ADMIN)
- Marcação automática de data de conclusão
- Validação de dados com class-validator
- Documentação Swagger completa
- 61 testes unitários com 100% de cobertura
- Clean Architecture + SOLID
- Docker + Docker Compose
- README completo com exemplos

---

**🎉 Projeto Completo e Pronto para Uso!**
