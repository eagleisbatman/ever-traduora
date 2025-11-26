# Railway Configuration Guide - Traduora Webapp

## ✅ Your Services on Railway

You have **3 separate services**:
1. **Traduora API** - `https://traduora.up.railway.app` (Backend API)
2. **Nông Trí Backend** - `https://nong-tri.up.railway.app` (Your app backend)
3. **Traduora Webapp** - Deployed from repo (Frontend UI)

## 🔧 Configure Railway Environment Variables

Since the webapp is already deployed, you need to set environment variables in Railway:

### Step 1: Go to Railway Dashboard

1. Open your Railway project
2. Find the **Traduora Webapp** service (the one deployed from `webapp-shadcn`)
3. Click on it → Go to **"Variables"** tab

### Step 2: Add Required Variables

Add these environment variables:

```bash
NEXT_PUBLIC_TRADUORA_API_URL=https://traduora.up.railway.app
NEXT_PUBLIC_TRADUORA_CLIENT_ID=568f4e58-5f09-4da4-a74d-a65c983a7791
NEXT_PUBLIC_TRADUORA_CLIENT_SECRET=hwQw5gcCs94avVvWbu49plx63d0xMFrM
NODE_ENV=production
```

### Step 3: Verify Root Directory

Make sure Railway is building from the correct directory:

1. Go to **Settings** → **Build**
2. **Root Directory** should be: `webapp-shadcn`
3. If not set, add it

### Step 4: Redeploy

After adding environment variables:
1. Railway will automatically redeploy
2. Or manually trigger: **Deployments** → **Redeploy**

## 🌐 Get Your Webapp URL

1. Go to **Settings** → **Domains**
2. Copy your Railway domain (e.g., `traduora-webapp-production.up.railway.app`)
3. Visit the URL to test

## ✅ Verify It's Working

After deployment, test:

1. **Visit your webapp URL**
2. **Check browser console** for any errors
3. **Projects page** should load from Traduora API
4. **Network tab** should show API calls to `traduora.up.railway.app`

## 🐛 Troubleshooting

### API Calls Fail (CORS errors)
- Traduora API might need CORS configuration
- Check Traduora API logs for CORS errors
- Verify `NEXT_PUBLIC_TRADUORA_API_URL` is correct

### Environment Variables Not Working
- Make sure variables start with `NEXT_PUBLIC_` (required for Next.js)
- Redeploy after adding variables
- Check Railway logs for errors

### Build Fails
- Check Railway build logs
- Verify `package.json` exists in `webapp-shadcn/`
- Ensure Node.js version is compatible

## 📋 Quick Checklist

- [ ] Environment variables set in Railway
- [ ] Root directory set to `webapp-shadcn`
- [ ] Service redeployed after adding variables
- [ ] Webapp URL accessible
- [ ] Projects page loads
- [ ] API calls work (check network tab)

## 🔗 Service URLs Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Traduora API | `https://traduora.up.railway.app` | Backend API |
| Nông Trí Backend | `https://nong-tri.up.railway.app` | Your app backend |
| Traduora Webapp | `https://your-webapp.up.railway.app` | Frontend UI |

## 💡 Next Steps

1. ✅ Set environment variables
2. ✅ Verify deployment
3. ⏳ Test projects page
4. ⏳ Update project detail page (if needed)
5. ⏳ Add custom domain (optional)

