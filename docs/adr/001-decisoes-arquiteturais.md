# 001 - Decisões Arquiteturais do Projeto Task Manager

## 1. Decisões Técnicas

### Tecnologias e Frameworks Escolhidos

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/)
  - Alta performance (ASGI), suporte nativo ao OpenAPI, Python moderno (async/await).
- **Frontend**: [Next.js + React](https://nextjs.org/)
  - Suporte a SSR e SSG, ideal para aplicações modernas com boa DX.
- **Banco de Dados**: PostgreSQL
  - Estável, robusto, suporte a tipos avançados (como enums).
- **ORM**: SQLAlchemy (async) com Alembic
  - Integração madura com o ecossistema Python e controle de migrations.
- **Testes**:
  - Backend: `pytest`, `httpx`, `pytest-asyncio`
  - Frontend: `jest`, `react-testing-library`
- **Containerização**: Docker + Docker Compose
  - Isolamento de ambientes, facilita setup e deploy.

### Estratégias de Separação de Responsabilidades

*Backend*
- **api/**: define os endpoints da aplicação e injeta as dependências.
- **schemas/**: abstração de entrada/saída da API.
- **models/**: classes de banco (ORM).
- **services/**: regras de negócio puras, isoladas da camada HTTP.
- **core/**: configurações e integração com banco de dados.
- **tests/**: casos de teste de API, banco e regras de negócio.

*Frontend*
- **components/**: componentes de interface reutilizáveis e desacoplados da lógica de negócio, como cards, filtros, formulários, botões etc.
- **hooks/**: hooks customizados que encapsulam lógica de estado, chamadas à API, efeitos e composição de funcionalidades (ex: useTasks).
- **pages/**: ponto de entrada das rotas da aplicação via Next.js. Cada arquivo representa uma rota, organizando o fluxo de telas do sistema.
- **services/**: camada de abstração responsável pela comunicação com a API. Centraliza chamadas HTTP, utilizando bibliotecas como axios ou fetch.
- **types/**: definições TypeScript globais como interfaces (Task, TaskStatus, etc.), garantindo consistência e segurança de tipos na aplicação.
- **__tests__/**: testes unitários e de integração de hooks, serviços e componentes. Segue convenção de coesão por módulo e cobertura mínima de funcionalidades críticas.


## 2. Evolução e Escalabilidade

### Propostas de Evolução

- **Autenticação de usuários** (JWT).
- **Controle de permissões**: quem pode editar ou excluir tarefas.
- **Upload de anexos** a tarefas.
- **Página de login e dashboard** com indicadores.
- **Paginação de tarefas**, ordenação por status/data.
- **Internacionalização (i18n)** do frontend.
- **Dockerfile** de produção para o backend e frontend.


### Sugestões Técnicas
- **Gunicorn + Uvicorn Worker** para deploy do backend.
- **CI/CD** com GitHub Actions para testes e build.
- **Linting & Prettier + Black** com hooks de commit (Husky).
- **Monitoramento e logs estruturados** (ex: Sentry, Prometheus/Grafana).


## 3. Simulação de Distribuição de Tarefas em Equipe

- **Dev 1 (Backend)**:
  - Setup do FastAPI
  - Migrations com Alembic
  - Models, schemas, rotas e services
  - Testes com `pytest`

- **Dev 2 (Frontend)**:
  - Setup do Next.js com TypeScript
  - Criação de componentes
  - Integração com API (axios/fetch)
  - Estilização com TailwindCSS

- **Dev 3 (Qualidade / Suporte)**:
  - Configuração Docker e docker-compose
  - Testes unitários e2e (Cypress/Jest)
  - Escrita de documentação técnica (README, ADRs)
  - Linter, hooks e CI/CD


### Boas Práticas de Trabalho em Equipe

- **Branch naming**: `feature/backend-create-task`, `bugfix/frontend-status-filter`
- **Commits com Conventional Commits**
- **Pull Requests com reviewers obrigatórios**
- **Linters obrigatórios (CI/CD falha sem passar)**
- **Squash commits e merge com histórico limpo**
- **Reuniões de daily/async updates**