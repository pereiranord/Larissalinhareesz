# 🤍 Site da Larissa Linhares

Site profissional MVP da Larissa Linhares — maquiadora cacheada de São Paulo.

Construído com **Next.js 14 + Airtable + Vercel**. Mobile-first, SEO otimizado, paleta marrom/bege.

---

## 📦 O que esse site tem (MVP)

- 🏠 **Home** — perfil, bio, botões dinâmicos (lê da tabela "Botões Home"), looks em destaque, marcas parceiras
- 👤 **Sobre** — storytelling, momentos marcantes, depoimentos, marcas
- 👗 **Looks** — galeria + página individual de cada look com produtos e links de afiliado
- ⭐ **Favoritos** — produtos agrupados por categoria, com selos e links de afiliado
- 📰 **Diário** — lista de posts + página individual (newsletter como blog)
- 📩 **Contato** — formulário que grava direto na tabela "Leads Contato" do Airtable

**Ainda NÃO tem (fase 2):** login Google, curtidas, wishlist, newsletter por email, mídia kit privado. Tudo já planejado.

---

## 🚀 Como colocar no ar (passo a passo)

### 1. Subir no GitHub

1. Cria um repositório novo no [github.com](https://github.com) (pode ser privado)
2. Faz upload de TODOS os arquivos desta pasta (menos `node_modules`, que nem existe ainda)
   - Pelo navegador: botão **"Add file" → "Upload files"** → arrasta tudo
3. Confirma o commit

### 2. Gerar o token do Airtable

1. Vai em [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. **Create new token**
3. Nome: `Site Larissa`
4. **Scopes** (permissões): adiciona
   - `data.records:read`
   - `data.records:write` (necessário pro formulário de contato gravar)
   - `schema.bases:read`
5. **Access**: seleciona a base `@larissalinhareesz`
6. **Create token** → copia e guarda num lugar seguro (NÃO compartilha com ninguém)

### 3. Conectar na Vercel

1. Entra em [vercel.com](https://vercel.com) (a conta que a Lari já tem)
2. **Add New → Project**
3. Importa o repositório do GitHub que você criou
4. **NÃO clica em Deploy ainda** — primeiro vai nas variáveis (próximo passo)

### 4. Configurar as variáveis de ambiente

Na tela de import (ou depois em **Settings → Environment Variables**), adiciona estas variáveis. Marca **Production, Preview and Development** em todas:

| Nome | Valor |
|---|---|
| `AIRTABLE_TOKEN` | o token que você gerou no passo 2 |
| `AIRTABLE_BASE_ID` | `appgJ2cCzb2TPwUPI` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://avnnvjjigdozrcbegqat.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sua chave publishable do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | sua chave secreta do Supabase |
| `NEXT_PUBLIC_SITE_URL` | `https://larissalinhareesz.vercel.app` |

> As variáveis do Supabase não são usadas ainda no MVP, mas já deixa configuradas pra fase 2 não precisar mexer de novo.

### 5. Deploy

1. Clica em **Deploy**
2. Espera ~2 minutos
3. A Vercel te dá um link tipo `site-larissa-xxx.vercel.app`
4. Pronto, tá no ar! 🎉

### 6. (Opcional) Domínio personalizado

Quando quiser usar `larissalinhareesz.vercel.app` "limpo" ou um `.com.br`:
- Vercel → Settings → Domains → adiciona o domínio

---

## ✏️ Como a Larissa atualiza o conteúdo

**Tudo pelo Airtable** (no MVP). A Lari/você abre a base `@larissalinhareesz` e:

- **Perfil** → muda foto, bio, links sociais (1 registro só)
- **Botões Home** → adiciona/edita/reordena os links da home (campo "Ordem" + "Ativo")
- **Looks** → adiciona look novo, anexa fotos, liga aos produtos
- **Produtos** → cadastra produto, coloca links de afiliado, marca "Ativo"
- **Diário** → escreve post novo (Status = "✅ Publicado" pra aparecer)
- **Marcas** → adiciona logos parceiros ("Mostrar no Site" = ✓)
- **Depoimentos / Eventos** → adiciona quando tiver

⚡ O site atualiza sozinho em até **60 segundos** (cache). Pra desativar qualquer coisa, é só desmarcar o checkbox **"Ativo"** — some do site na hora seguinte.

---

## 🛠️ Rodar localmente (opcional, pra testar antes)

Precisa de Node.js 18+ instalado.

```bash
# 1. instala dependências
npm install

# 2. cria o arquivo de ambiente local
cp .env.example .env.local
# edita o .env.local e preenche os valores reais

# 3. roda
npm run dev
```

Abre `http://localhost:3000`.

> O `.env.local` está protegido pelo `.gitignore` — nunca sobe pro GitHub.

---

## 🔒 Segurança

- ❌ **Nunca** suba `.env` ou `.env.local` pro GitHub (já está bloqueado no `.gitignore`)
- ❌ **Nunca** compartilhe o token do Airtable ou a chave secreta do Supabase
- ✅ As chaves ficam só na Vercel (cofre seguro), nunca no código

---

## 📁 Estrutura do projeto

```
site-larissa/
├── app/
│   ├── page.tsx              # Home
│   ├── layout.tsx            # Layout + SEO
│   ├── globals.css           # Estilos
│   ├── sobre/page.tsx
│   ├── looks/page.tsx
│   ├── looks/[slug]/page.tsx # Look individual
│   ├── favoritos/page.tsx
│   ├── diario/page.tsx
│   ├── diario/[slug]/page.tsx
│   ├── contato/page.tsx
│   └── api/
│       ├── contato/route.ts  # Recebe formulário
│       └── track/route.ts    # Stub (fase 2)
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   └── Placeholder.tsx
├── lib/
│   └── airtable.ts           # ⭐ Toda a integração
├── package.json
├── next.config.js
├── tailwind.config.js
└── .env.example
```

---

## 🔜 Próximos passos (fase 2)

1. **Supabase**: criar tabelas `usuarios`, `curtidas`, `wishlist`, `assinantes`
2. **Login Google** + email/senha
3. **Sistema de curtir/salvar** looks e produtos (exige login)
4. **Newsletter por email** (Resend, grátis até 3.000/mês)
5. **Mídia kit privado** com aprovação manual e link único por marca
6. **Painel admin próprio** (substituindo o Airtable como interface)

---

Feito com 🤍 pra Lari.
