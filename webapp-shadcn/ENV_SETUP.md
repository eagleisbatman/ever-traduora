# Environment Setup

Create a `.env.local` file in the `webapp-shadcn` directory with the following variables:

```bash
NEXT_PUBLIC_TRADUORA_API_URL=https://traduora.up.railway.app
NEXT_PUBLIC_TRADUORA_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_TRADUORA_CLIENT_SECRET=your_client_secret_here
```

## Getting Credentials

1. Log in to your Traduora instance
2. Go to Settings → API Tokens
3. Create a new OAuth2 client with:
   - Grant type: `client_credentials`
   - Copy the Client ID and Client Secret
4. Add them to `.env.local`

## Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

