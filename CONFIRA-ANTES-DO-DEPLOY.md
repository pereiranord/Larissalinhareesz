# ✅ CONFIRA ANTES DE FAZER O DEPLOY

Abra seu repositório no GitHub e confira se a estrutura está
EXATAMENTE assim (tudo minúsculo, sem acento, sem espaço):

```
📁 (raiz do repositório)
│
├── 📄 package.json
├── 📄 next.config.js
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
├── 📄 postcss.config.js
├── 📄 .gitignore
├── 📄 .env.example
├── 📄 README.md
│
├── 📁 lib/                    ← CRÍTICO! Tem que existir
│   └── 📄 airtable.ts         ← O coração do site
│
├── 📁 components/
│   ├── 📄 Nav.tsx
│   ├── 📄 Footer.tsx
│   └── 📄 Placeholder.tsx
│
└── 📁 app/
    ├── 📄 page.tsx
    ├── 📄 layout.tsx
    ├── 📄 globals.css
    │
    ├── 📁 sobre/
    │   └── 📄 page.tsx
    │
    ├── 📁 looks/
    │   ├── 📄 page.tsx
    │   └── 📁 [slug]/         ← com colchetes, minúsculo
    │       └── 📄 page.tsx
    │
    ├── 📁 favoritos/          ← PLURAL! (não "favorito")
    │   └── 📄 page.tsx
    │
    ├── 📁 diario/             ← minúsculo, sem acento
    │   ├── 📄 page.tsx
    │   └── 📁 [slug]/
    │       └── 📄 page.tsx
    │
    ├── 📁 contato/
    │   └── 📄 page.tsx
    │
    └── 📁 api/
        ├── 📁 contato/
        │   └── 📄 route.ts
        └── 📁 track/
            └── 📄 route.ts
```

## ⚠️ ERROS QUE JÁ ACONTECERAM (não repita):

| ❌ ERRADO | ✅ CERTO |
|-----------|----------|
| `app/Diario/` | `app/diario/` |
| `app/Looks/` | `app/looks/` |
| `app/[Slug]/` | `app/[slug]/` |
| `app/favorito/` | `app/favoritos/` |
| `lib/` faltando | `lib/airtable.ts` presente |

## 🔍 CHECKLIST RÁPIDO (marque mentalmente):

- [ ] A pasta `lib` existe na RAIZ (não dentro de `app`)?
- [ ] Dentro de `lib` tem o arquivo `airtable.ts`?
- [ ] A pasta de produtos chama `favoritos` (com S)?
- [ ] Tudo está minúsculo?
- [ ] Nenhuma pasta tem acento (é `diario`, não `diário`)?
- [ ] O `tsconfig.json` está na raiz?
- [ ] O `package.json` mostra `"next": "14.2.33"` (não 14.2.5)?

Se TODOS os itens estiverem ✅, pode fazer o deploy na Vercel.

Se qualquer um estiver errado, o build vai falhar de novo.
Melhor conferir agora do que esperar o erro.
