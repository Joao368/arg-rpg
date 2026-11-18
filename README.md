# ARG

Aplicação web interativa no formato ARG (Alternate Reality Game).  
O jogador avança por etapas resolvendo enigmas — cada desafio concluído desbloqueia a próxima página.

Construído com React + Vite, 100% no navegador, publicável no GitHub Pages sem backend.

---

## Requisitos

- Node.js 18 ou superior  
- npm 9 ou superior

---

## Instalação

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install
```

---

## Desenvolvimento local

```bash
npm run dev
```

Abre em `http://localhost:5173`.

---

## Build de produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`.  
Para testar localmente antes de publicar:

```bash
npm run preview
```

---

## Publicação no GitHub Pages

### Configuração inicial (uma vez)

1. Acesse **Settings → Pages** no seu repositório.
2. Em **Source**, selecione **GitHub Actions**.
3. Faça push para a branch `main`.

O workflow em `.github/workflows/deploy.yml` cuida do build e deploy automaticamente.

> O `vite.config.js` usa `base: './'`, que funciona com qualquer nome de repositório.  
> Se você usar um domínio customizado, pode trocar para `base: '/'`.

---

## Gerar hashes para novas respostas

As respostas corretas **nunca** ficam em texto puro no código.  
Use o script auxiliar para gerar o hash SHA-256 de uma resposta:

```bash
npm run hash "resposta aqui"
# ou
node scripts/hash.mjs "resposta aqui"
```

Opções disponíveis:

| Flag                | Descrição                                      |
|---------------------|------------------------------------------------|
| `--case-sensitive`  | Preserva maiúsculas/minúsculas (padrão: ignora)|
| `--require-accents` | Exige acentuação (padrão: remove)              |

Exemplo de saída:

```
  Entrada original : inicio
  Normalizada      : inicio
  SHA-256          : abc123...

  Cole em challenges.js:
  expectedHash: 'abc123...',
```

Cole o hash no campo `expectedHash` do desafio correspondente em `src/data/challenges.js`.

---

## Adicionar uma nova etapa

### 1. Adicionar a página em `src/data/pages.js`

```js
{
  id: 'minha-etapa',
  title: 'Título da etapa',
  content: 'Texto narrativo aqui.\n\nPode ter múltiplos parágrafos.',
  challengeId: 'meu-desafio',
  // media: { type: 'image', src: '/assets/imagem.jpg', alt: 'Descrição' },
}
```

### 2. Adicionar o desafio em `src/data/challenges.js`

```js
'meu-desafio': {
  type: 'text',           // text | number | multiple-choice | code | custom
  placeholder: 'Sua resposta...',
  expectedHash: 'HASH_GERADO_PELO_SCRIPT',
  normOptions: {
    caseSensitive: false,
    trimSpaces: true,
    collapseSpaces: true,
    requireAccents: false,
  },
  hint: 'Dica opcional visível ao jogador.',
},
```

### 3. Para múltipla escolha

```js
'meu-desafio-mc': {
  type: 'multiple-choice',
  options: [
    { id: 'a', label: 'Primeira opção' },
    { id: 'b', label: 'Segunda opção' },
    { id: 'c', label: 'Terceira opção' },
  ],
  // A resposta correta é o(s) id(s) ordenados e unidos por vírgula.
  // Exemplo: selecionar "b" → hash de "b"
  // Exemplo: selecionar "a" e "c" → hash de "a,c"
  expectedHash: 'HASH_GERADO_PELO_SCRIPT',
},
```

---

## Adicionar um novo tipo de desafio

1. Crie `src/challenges/MeuDesafio.jsx` com as props `{ challenge, onSuccess }`.
2. Chame `onSuccess()` quando a resposta for validada.
3. Registre em `src/challenges/registry.js`:

```js
import MeuDesafio from './MeuDesafio.jsx'

export const REGISTRY = {
  // ...existentes
  'meu-tipo': MeuDesafio,
}
```

---

## Estrutura do projeto

```
arg/
├─ .github/workflows/deploy.yml   # CI/CD para GitHub Pages
├─ scripts/hash.mjs               # Gerador de hashes via CLI
├─ public/
│  ├─ assets/                     # Imagens, áudios, vídeos
│  └─ favicon.svg
├─ src/
│  ├─ challenges/                 # Componentes de desafio + registry
│  ├─ components/
│  │  ├─ Challenge/               # ChallengeRenderer
│  │  ├─ Layout/                  # Shell da aplicação
│  │  └─ Navigation/              # Sidebar / barra de etapas
│  ├─ data/
│  │  ├─ pages.js                 # Definição das etapas
│  │  └─ challenges.js            # Desafios e hashes
│  ├─ hooks/
│  │  └─ useProgress.js           # Estado de progresso
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ GamePage.jsx
│  │  └─ NotFound.jsx
│  ├─ services/
│  │  ├─ storage.js               # LocalStorage
│  │  └─ validation.js            # SHA-256 e normalização
│  ├─ styles/
│  │  ├─ global.css
│  │  └─ theme.css                # Tokens de design (cores, fontes)
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ vite.config.js
└─ package.json
```

---

## Limitações de segurança

Toda a validação roda no navegador do jogador. Isso significa:

- Hashes de respostas curtas ou previsíveis podem ser descobertos por força bruta.
- O LocalStorage pode ser editado manualmente pelo DevTools para pular etapas.
- O conteúdo de etapas futuras está no bundle e é tecnicamente acessível.

Essas limitações são aceitáveis para um ARG casual. Para um ARG competitivo com resultados verificáveis seria necessário um backend.

---

## Personalização visual

Edite `src/styles/theme.css` para mudar o visual sem tocar em lógica:

- **Cores**: modifique as variáveis `--bg`, `--accent`, `--text`, etc.
- **Fontes**: troque as `@import` em `global.css` e as variáveis `--font-*`.
- **Tema claro**: descomente o bloco `[data-theme="light"]` e adicione um botão de alternância.
