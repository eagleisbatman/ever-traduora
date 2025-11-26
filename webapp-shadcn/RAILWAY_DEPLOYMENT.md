# Railway Deployment Guide - Traduora Shadcn UI

## 🚀 Deploying to Railway

Since both Traduora API and Nông Trí backend are on Railway, you can deploy the webapp frontend there too!

### Step 1: Create Railway Service

1. Go to your Railway dashboard
2. Create a **New Project** (or add to existing project)
3. Select **"Deploy from GitHub repo"**
4. Choose your `ever-traduora` fork repository
5. Set **Root Directory** to: `webapp-shadcn`

### Step 2: Configure Build Settings

Railway should auto-detect Next.js, but verify:

1. Go to **Settings** → **Build**
2. **Root Directory**: `webapp-shadcn`
3. **Build Command**: `npm run build` (auto-detected)
4. **Start Command**: `npm start` (auto-detected)

### Step 3: Set Environment Variables

In Railway → **Variables** tab, add:

```bash
NEXT_PUBLIC_TRADUORA_API_URL=https://traduora.up.railway.app
NEXT_PUBLIC_TRADUORA_CLIENT_ID=568f4e58-5f09-4da4-a74d-a65c983a7791
NEXT_PUBLIC_TRADUORA_CLIENT_SECRET=hwQw5gcCs94avVvWbu49plx63d0xMFrM
NODE_ENV=production
PORT=3000
```

**Important**: Railway will set `PORT` automatically, but Next.js uses it from `process.env.PORT`.

### Step 4: Configure Next.js for Railway

Update `next.config.mjs` to handle Railway's PORT:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Railway deployment
};

export default nextConfig;
```

### Step 5: Generate Public Domain

1. Go to **Settings** → **Domains**
2. Click **"Generate Domain"**
3. Copy the generated URL (e.g., `traduora-ui-production.up.railway.app`)

### Step 6: Verify Deployment

After deployment, visit your Railway domain and verify:
- ✅ Projects page loads
- ✅ Can authenticate with Traduora API
- ✅ Projects list displays correctly

## 🔧 Railway Service Structure

Your Railway project should have:

```
Railway Project: "Traduora Platform"
├── Traduora API Service (backend)
│   ├── Domain: traduora.up.railway.app
│   └── Database: MySQL
├── Traduora Webapp Service (frontend)
│   ├── Domain: traduora-ui.up.railway.app
│   └── Root: webapp-shadcn/
└── (Optional) Nông Trí Backend
    └── Domain: nong-tri.up.railway.app
```

## 🌐 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_TRADUORA_API_URL` | Traduora API base URL | `https://traduora.up.railway.app` |
| `NEXT_PUBLIC_TRADUORA_CLIENT_ID` | OAuth2 Client ID | `568f4e58-...` |
| `NEXT_PUBLIC_TRADUORA_CLIENT_SECRET` | OAuth2 Client Secret | `hwQw5gcCs...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3000` (Railway sets automatically) |

## 🔒 Security Notes

- ✅ `NEXT_PUBLIC_*` variables are safe for client-side (Next.js convention)
- ✅ OAuth2 credentials are used server-side for API calls
- ✅ Never commit `.env.local` to git
- ✅ Store secrets in Railway environment variables

## 🐛 Troubleshooting

### Build Fails
- Check Railway build logs
- Verify `package.json` has all dependencies
- Ensure Node.js version is compatible (20.x)

### API Calls Fail
- Verify `NEXT_PUBLIC_TRADUORA_API_URL` is correct
- Check Traduora API is accessible from Railway
- Verify OAuth2 credentials are correct

### Port Issues
- Railway sets `PORT` automatically
- Next.js reads from `process.env.PORT`
- Default is `3000` if not set

## 📝 Next Steps After Deployment

1. ✅ Test projects page loads
2. ✅ Test project creation
3. ✅ Update project detail page to use API
4. ✅ Add custom domain (optional)
5. ✅ Set up monitoring/alerts

## 🔗 Related Services

- **Traduora API**: `https://traduora.up.railway.app`
- **Nông Trí Backend**: `https://nong-tri.up.railway.app`
- **Traduora UI**: `https://your-ui-domain.up.railway.app`

