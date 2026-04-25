# Comprar

Aplicativo mobile de lista de compras desenvolvido com **React Native + Expo + TypeScript**.

O foco do projeto e oferecer um fluxo simples para gerenciar itens do dia a dia, com persistencia local usando `AsyncStorage`.

## Visao Geral

- Cadastro de novos itens
- Filtro por status (`pendentes` e `comprados`)
- Alteracao de status de cada item com um toque
- Remocao individual
- Limpeza completa da lista
- Persistencia local dos dados no dispositivo

## Stack Tecnica

- `expo` `~54`
- `react` `19.2.0`
- `react-native` `0.83.2`
- `typescript` `~5.9.2` (modo `strict`)
- `@react-native-async-storage/async-storage`
- `lucide-react-native`

## Arquitetura do Projeto

```txt
.
├── index.ts                         # Registro do app (entrypoint)
├── src
│   ├── app/Home                     # Tela principal
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── components                   # Componentes reutilizaveis de UI
│   │   ├── Button
│   │   ├── Filter
│   │   ├── Input
│   │   ├── Item
│   │   └── StatusIcon
│   ├── storage
│   │   └── itemsStorage.ts          # Camada de persistencia local
│   └── types
│       └── FilterStatus.ts
├── app.json
├── package.json
└── tsconfig.json
```

## Modelo de Dados

```ts
export enum FilterStatus {
  PENDING = "pending",
  DONE = "done",
}

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};
```

Chave de armazenamento local:

```txt
@comprar:items
```

## Como Executar

### Pre-requisitos

- Node.js LTS (recomendado: `20+`)
- npm
- Expo Go (para teste em dispositivo fisico) ou emulador Android/iOS

### Instalacao

```bash
npm install
```

### Rodando o projeto

```bash
npm run start
```

Com o Metro aberto, voce pode:

- pressionar `a` para Android
- pressionar `i` para iOS (macOS)
- pressionar `w` para Web
- ou ler o QR Code com o Expo Go

## Scripts Disponiveis

- `npm run start`: inicia o Expo
- `npm run android`: inicia com alvo Android
- `npm run ios`: inicia com alvo iOS
- `npm run web`: inicia versao web

## Fluxo de Persistencia

O modulo [`src/storage/itemsStorage.ts`](src/storage/itemsStorage.ts) centraliza a manipulacao de dados:

- `get`: le todos os itens
- `getByStatus`: filtra por status
- `add`: adiciona item
- `remove`: remove item por `id`
- `clear`: limpa todos os itens
- `toggleStatus`: alterna entre `pending` e `done`

## Melhorias Sugeridas

- Adicionar testes unitarios para `storage` e componentes
- Trocar geracao de `id` por UUID
- Incluir feedback visual de carregamento/erro por operacao
- Adicionar tema e suporte completo a acessibilidade

## Status do Projeto

Projeto funcional para uso local e estudos de React Native com Expo.
