# 📝 Todo List - Gerenciador de Tarefas

Uma aplicação web moderna e responsiva para gerenciar tarefas diárias, desenvolvida com React, TypeScript e integrada com API externa para sincronização de dados.

## 🎯 Funcionalidades

- ✅ **Adicionar tarefas** — Crie novas tarefas com nome, descrição e imagem
- ✅ **Marcar como concluída** — Toggle de status de conclusão
- ✅ **Remover tarefas** — Delete tarefas da lista
- ✅ **Filtrar tarefas** — Visualize todas, apenas concluídas ou apenas pendentes
- ✅ **Sincronização em Tempo Real** — Integrada com API CRUDCrud
- ✅ **Indicador de Status** — Visual feedback (Sincronizando, Sincronizado, Offline)
- ✅ **Persistência Local** — Cache com localStorage para fallback offline
- ✅ **Design Responsivo** — Mobile First com Tailwind CSS

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 19.2** — Biblioteca JavaScript para UI interativa
- **TypeScript 6.0** — Tipagem estática para JavaScript
- **Vite 8.2** — Build tool rápido e moderno
- **Tailwind CSS 4.3** — Framework CSS utility-first

### Padrões & Hooks
- **Context API** — Gerenciamento de estado global
- **useState** — Gerenciamento de estado local
- **useEffect** — Efeitos colaterais (sincronização, inicialização)
- **useMemo** — Otimização de renderizações
- **Custom Hook (useLocalStorage)** — Encapsulamento de lógica de persistência

### Backend/API
- **CRUDCrud** — API RESTful para persistência de dados
  - Endpoint: `https://crudcrud.com/api/9b510162eec94968af46f332e4c6fca4/tarefas`

## 📋 Estrutura do Projeto

```
src/
├── components/
│   ├── TodoForm.tsx          # Formulário para adicionar tarefas
│   ├── TodoItem.tsx          # Card individual de tarefa
│   ├── TodoList.tsx          # Lista de tarefas (com filtros)
│   └── SyncIndicator.tsx     # Indicador visual de sincronização
├── context/
│   └── TodoContext.tsx       # Context global da aplicação
├── hooks/
│   └── useLocalStorage.ts    # Custom hook para localStorage
├── services/
│   └── api.ts                # Funções CRUD da API
├── types/
│   └── Todo.ts               # Interface de tipagem de tarefa
├── App.tsx                   # Componente raiz
├── main.tsx                  # Ponto de entrada
└── styles.css                # Estilos globais
```

## 🚀 Como Instalar e Rodar

### Pré-requisitos
- **Node.js** 18.0 ou superior
- **npm** ou **yarn**

### Instalação

```bash
# Acesse o diretório do projeto
cd todo-list

# Instale as dependências
npm install
```

### Rodar Localmente

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# A aplicação abrirá em: http://localhost:5173/
```

### Build para Produção

```bash
# Compile o TypeScript e crie o bundle otimizado
npm run build

# Visualize o build localmente (antes de publicar)
npm run preview
```

### Linting

```bash
# Execute verificações de qualidade de código
npm run lint
```

## 💡 Como Usar

### Adicionar Tarefa
1. Preencha os campos: **Nome**, **Imagem** (URL), **Descrição** (opcional)
2. Clique no botão **"Adicionar"**
3. A tarefa aparecerá na lista e será sincronizada com a API

### Marcar como Concluída
- Clique no **card da tarefa** para alternar seu status de conclusão
- O ícone e estilo mudarão para refletir o novo status

### Remover Tarefa
- Clique no botão **"Remover"** (ícone de lixeira) na tarefa
- A tarefa será deletada da lista e da API

### Filtrar Tarefas
- Clique nos botões no topo: **"Todas"**, **"Concluídas"** ou **"Pendentes"**
- A lista atualizará mostrando apenas as tarefas selecionadas

### Verificar Status de Sincronização
- Observe o **indicador no canto inferior direito**:
  - 🟢 **Sincronizado** — Dados em tempo real com a API
  - 🔵 **Sincronizando...** — Operação em andamento
  - 🔴 **Offline** — Sem conexão, usando cache local

## 📱 Design Responsivo

A aplicação foi desenvolvida com **Mobile First**:
- ✅ Funciona perfeitamente em celulares, tablets e desktops
- ✅ Telas adaptáveis com Tailwind CSS
- ✅ Componentes escaláveis

## 🏗 Arquitetura de Estado

### Context Global (TodoContext)
O estado da aplicação é centralizado em um Context que fornece:
- `tarefas` — Array de todas as tarefas
- `filtro` — Filtro ativo (todas, concluídas, pendentes)
- `tarefasFiltradas` — Tarefas já filtradas (memoizado)
- `syncStatus` — Status de sincronização com API
- Métodos de ação: `adicionarTarefa`, `concluirTarefa`, `excluirTarefa`, `alterarFiltro`

### Fluxo de Sincronização
1. **Inicialização** → Busca dados da API
2. **Sucesso** → Atualiza estado local e localStorage
3. **Erro** → Usa cache local (localStorage) e marca como "offline"
4. **Ação do Usuário** → Atualiza UI localmente → Sincroniza com API → Refresh dos dados

## 🎓 Aprendizados Principais

Este projeto demonstra:
- ✅ Uso avançado de **Context API** com TypeScript
- ✅ **Custom Hooks** para lógica reutilizável
- ✅ **Memoization** para otimização de performance
- ✅ Integração com **API RESTful** externa
- ✅ Fallback offline com **localStorage**
- ✅ Indicadores visuais de estado assíncrono
- ✅ **Tailwind CSS** com abordagem Mobile First

## 📝 Notas

- Os dados são sincronizados com a API CRUDCrud em tempo real
- O localStorage serve como cache e fallback quando offline
- Todas as operações (create, read, update, delete) são suportadas
- O indicador de sincronização oferece feedback visual ao usuário

## 📄 Licença

Este projeto é parte do módulo de React da EBAC.

---

**Desenvolvido com ❤️ usando React + TypeScript + Tailwind CSS**
