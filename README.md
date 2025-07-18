# 📝 Task Manager

Aplicação de gerenciamento de tarefas com **FastAPI** no backend e **Next.js (React)** no frontend.

Permite criar, listar, filtrar, editar e excluir tarefas de forma simples e rápida via interface web.

---

## Requisitos
- Docker
- Docker Compose
- (Opcional) Make

## Como iniciar o projeto

**Atenção:** Se você estiver usando Windows ou baixou o repositório como um arquivo .zip, certifique-se de executar:

```
chmod +x backend/entrypoint.sh backend/wait-for-it.sh
```

### 1. Copiar arquivos de ambiente:

```bash
cp backend/.env-example backend/.env
cp backend/.env-example.test backend/.env.test
cp frontend/.env-example.local frontend/.env.local
```

### 2. Subir o ambiente com Docker Compose:
```bash
docker-compose up -d
```
- A API estará disponível em: http://localhost:8000
- A documentação Swagger estará em: http://localhost:8000/docs
- A interface web estará disponível em: http://localhost:3000

## Comandos úteis com Makefile

O projeto conta com um `Makefile` para facilitar tarefas comuns via Docker.

---

### Frontend

| Comando                | Descrição                                 |
|------------------------|-------------------------------------------|
| `make frontend-test`   | Executa os testes unitários do frontend   |
| `make frontend-lint`   | Executa o lint com eslint no frontend     |

---

### Backend

| Comando                | Descrição                                      |
|------------------------|-----------------------------------------------|
| `make backend-format`  | Formata o código com black e organiza imports |
| `make backend-lint`    | Executa o lint com flake8                     |
| `make backend-test`    | Executa os testes com pytest no ambiente de teste |

---

### Combinados

| Comando               | Descrição                                             |
|-----------------------|--------------------------------------------------------|
| `make check-backend`  | Executa format, lint e testes no backend               |
| `make check-frontend` | Executa lint e testes no frontend                      |
| `make check-all`      | Executa todas as verificações em backend e frontend    |


## Decisões Arquiteturais (ADR)

As decisões técnicas que guiam a arquitetura do projeto estão documentadas em:

```bash
docs/adr/001-decisoes-arquiteturais.md
```

**Esse documento cobre:**
- Tecnologias escolhidas e justificativas
- Estrutura e organização das pastas
- Estratégias de separação de responsabilidades
- Planos de escalabilidade
- Simulação de divisão de tarefas em equipe

