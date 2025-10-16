# Deploy na Vercel - Instruções

## Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel da Vercel:

```
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
```

## Passo a Passo para Deploy

### 1. Via Vercel Dashboard (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub/GitLab/Bitbucket
4. Configure as variáveis de ambiente (veja acima)
5. Clique em "Deploy"

### 2. Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy do projeto
vercel

# Ou deploy direto para produção
vercel --prod
```

## Configurações Importantes

### Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Variáveis de Ambiente no Dashboard Vercel

1. Vá para Settings > Environment Variables
2. Adicione cada variável:
   - Nome: `VITE_SUPABASE_URL`
   - Valor: `https://0ec90b57d6e95fcbda19832f.supabase.co`
   - Environment: Production, Preview, Development

   - Nome: `VITE_SUPABASE_ANON_KEY`
   - Valor: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw`
   - Environment: Production, Preview, Development

## Verificação Pós-Deploy

Após o deploy, verifique:

1. ✅ A página inicial carrega corretamente
2. ✅ Todas as rotas funcionam (Home, Reading, Love Map, Guides, Profile)
3. ✅ Conexão com Supabase está funcionando
4. ✅ Menu de navegação inferior funciona
5. ✅ Não há erros no console do navegador

## Troubleshooting

### Página em branco após deploy
- Verifique se as variáveis de ambiente estão configuradas corretamente
- Verifique os logs de build na Vercel
- Certifique-se de que o build local funciona: `npm run build && npm run preview`

### Rotas não funcionam (404)
- Verifique se o arquivo `vercel.json` está na raiz do projeto
- As rewrites devem estar configuradas corretamente

### Erro de conexão com Supabase
- Verifique se as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão corretas
- Certifique-se de que o domínio da Vercel está autorizado no Supabase

## Domínio Customizado

Para adicionar um domínio customizado:

1. Vá para Settings > Domains
2. Adicione seu domínio
3. Configure os registros DNS conforme instruções da Vercel
4. Aguarde a propagação DNS (pode levar até 48h)

## Atualizações Automáticas

A Vercel fará deploy automático quando você:
- Fizer push para a branch principal (geralmente `main` ou `master`)
- Criar um Pull Request (deploy de preview)
- Fazer merge de PR (deploy para produção)

## Suporte

Se encontrar problemas:
- Verifique os logs de build na Vercel
- Consulte a documentação: https://vercel.com/docs
- Suporte da Vercel: https://vercel.com/support
