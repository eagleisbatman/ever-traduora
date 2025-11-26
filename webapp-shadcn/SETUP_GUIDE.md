# Traduora Shadcn UI - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd webapp-shadcn
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `webapp-shadcn` directory:

```bash
NEXT_PUBLIC_TRADUORA_API_URL=https://traduora.up.railway.app
NEXT_PUBLIC_TRADUORA_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_TRADUORA_CLIENT_SECRET=your_client_secret_here
```

**Getting Credentials:**
1. Log in to your Traduora instance at `https://traduora.up.railway.app`
2. Go to **Settings** → **API Tokens** (or **OAuth2 Clients**)
3. Create a new OAuth2 client with:
   - **Grant Type**: `client_credentials`
   - **Name**: "Shadcn UI Frontend"
4. Copy the **Client ID** and **Client Secret**
5. Add them to `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
webapp-shadcn/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (auth)/            # Authentication pages
│   │   └── (dashboard)/       # Dashboard pages
│   ├── components/            # React components
│   │   ├── ui/                # Shadcn UI components
│   │   └── layout/            # Layout components
│   ├── hooks/                 # React Query hooks
│   │   ├── use-projects.ts
│   │   ├── use-terms.ts
│   │   └── use-translations.ts
│   └── lib/                   # Utilities
│       ├── api-client.ts      # API client with OAuth2
│       ├── api.ts             # API functions
│       └── react-query.tsx    # React Query provider
```

## 🔧 API Integration

The app uses:
- **React Query** for data fetching and caching
- **OAuth2 Client Credentials** for authentication
- **TypeScript** for type safety

### Available Hooks

```typescript
// Projects
import { useProjects, useCreateProject } from '@/hooks/use-projects';

// Terms
import { useTerms, useCreateTerm } from '@/hooks/use-terms';

// Translations & Locales
import { useLocales, useTranslations, useUpdateTranslation } from '@/hooks/use-translations';
```

## 🐛 Troubleshooting

### API Authentication Fails
- Check that environment variables are set correctly
- Verify OAuth2 client credentials in Traduora
- Check browser console for error messages

### Projects Not Loading
- Verify `NEXT_PUBLIC_TRADUORA_API_URL` is correct
- Check network tab for API errors
- Ensure OAuth2 client has proper permissions

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors: `npm run lint`
- Clear `.next` folder and rebuild

## 📝 Next Steps

1. ✅ API integration layer complete
2. ✅ Projects page updated to use real API
3. ⏳ Update project detail page (in progress)
4. ⏳ Add error boundaries
5. ⏳ Add loading skeletons
6. ⏳ Add optimistic updates

## 🔗 Related Documentation

- [API Integration Summary](./API_INTEGRATION_SUMMARY.md)
- [Environment Setup](./ENV_SETUP.md)

