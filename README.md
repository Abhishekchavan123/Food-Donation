## API Setup

Create a `.env` file with:

```
PORT=4000
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```

Run the API:

```
npm run dev
```

Endpoints:
- POST `/api/auth/register` { email, password }
- POST `/api/auth/login` { email, password }




