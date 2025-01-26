# API para Gerenciamento de Tarefas 

Essa documentação foi desenvolvida com o objetivo de utilizar conceitos de autorização e autenticação em uma API de gerenciamento de tarefas. 

Rode o comando abaixo para iniciar a aplicação:

```bash
    npm install
```

Rode os comando abaixo para executar a migração do banco de dados para o modo de testes e desenvolvimento, respectivamente:

```bash
    npm run migrate:test
```

```bash
    npm run migrate:dev
```

**Será essencial ter um banco de dados criado e referenciado nas variáveis de ambiente.**

Rode o comando abaixo para executar os testes:

```bash
    npm run test
```

Rode o comando abaixo para iniciar a aplicação em modo de desenvolvimento:

```bash
    npm run dev
```

Todas as rotas deverão se comportar assim como está previsto na documentação abaixo:

## Rotas e rotinas - USERS

### Cadastro de usuário POST /users

Padrão de corpo

```json
{
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "12345678"
}
```

Padrão de resposta (STATUS: 201)

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}
```
#### Possíveis erros:

STATUS (409) - E-mail já cadastrado

```json
{ "message": "This email is already registered" }
```

STATUS (400) quando o corpo não é compatível com o padrão

### Login de usuário POST /users/login

Padrão de corpo

```json
{
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "12345678"
}
```

Padrão de resposta (200)

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxMjcwMjk2LCJleHAiOjE3MDEzMTM0OTZ9.Ebru139GF02sx9EFR0PouLrErYyYIcFJgLa6vIfsktA",
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "johndoe@email.com"
	}
}⁠
```

#### Possíveis erros:

STATUS (404) - Usuário não existente

```json
{ "messsage": "User not exists" }
```

STATUS (401) - E-mail e senha não correspondem

```json
{ "messsage": "Email and password doesn't match" }
```

STATUS (409) quando o corpo não é compatível com o padrão

### Recuperação de usuário /users/profile (Precisa de autorização)

#### Autorização:
```json
{
   "headers": {
        "authorization" : "Bearer token"
    }
}
```

Padrão de resposta (200)

```json
{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}
```

## Rotas e rotinas - TASKS - (Precisa de autorização)

### Criação de tarefa POST /tasks

Padrão de corpo

```json
{
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "categoryId?": 1,
}
```

Padrão de resposta  (STATUS: 201)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "categoryId": 1,
    "userId":1
}    
```

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Leitura de tarefas GET /tasks

Padrão de resposta  (STATUS: 200)

```json
[
    {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "Lorem ipsum",
        "finished": false,
        "categoryId": 1,
        "userId": 1,
        "category": {
            "id": 1,
            "name": "Estudo",
            "userId": 1
        }
    }  
]  
```

URL Search Params

| Parâmetro | Exemplo de uso | Descrição |
| ------ | ------ | ------ |
| category | /tasks?category=estudo | Forneça o "id" da categoria para trazer somente tarefas da categoria determinada |

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (403) - Categoria não pertence ao usuário

```json
{ "message": "This user is not the category owner" }
```

### Leitura de individual GET /tasks/:1

Padrão de resposta  (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "categoryId": 1,
	"userId": 1,
    "category": {
        "id": 1,
        "name": "Estudo",
        "userId": 1
    }
}   
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

STATUS (403) - Tarefa não pertence ao usuário

```json
{ "message": "This user is not the task owner" }
```

### Atualizar tarefa PATCH /tasks/:id

Padrão de corpo 

```json
{
    "title?": "Lorem ipsum update",
    "content?": "Lorem ipsum update",
    "finished?": true,
    "categoryId?": 1,
}
```

Padrão de resposta (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum update",
    "content": "Lorem ipsum update",
    "finished": true,
    "categoryId": 1,
    "userId": 1
}    
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```
STATUS (403) - Tarefa não pertence ao usuário

```json
{ "message": "This user is not the task owner" }
```

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Excluir tarefa DELETE /tasks/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

STATUS (403) - Tarefa não pertence ao usuário

```json
{ "message": "This user is not the task owner" }
```

## Rotas e rotinas - CATEGORIES- (Precisa de autorização)

### Criação de categoria POST /categories

Padrão de corpo

```json
{
    "name": "Example",
}
```

Padrão de resposta (STATUS 201)

```json
{
    "id": 1,
    "name": "Example",
    "userId": 1
}
```

#### Possíveis erros:

401 UNAUTHORIZED

```json 
{
	"message": "invalid signature"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Exclusão de categoria DELETE /categories/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (403) - Categoria não pertence ao usuário

```json
{ "message": "This user is not the category owner" }
```