---
name: Production Deployment (Manual)
description: Manually builds and deploys the project to Cloudflare Pages Production environment, ensuring functions and secrets are handled correctly.
version: 1.0.0
tags: [deployment, cloudflare, wrangler, production, manual]
---

# Production Deployment (Manual Workflow)

This skill encapsulates the verified workflow for deploying the **UIXskills** project to Cloudflare Pages. It bypasses potential Git integration delays by pushing local build artifacts directly.

## Prerequisites

1.  **Wrangler Authenticated**: Ensure you are logged in.
    ```bash
    npx wrangler whoami
    ```
2.  **Environment Variables**: Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in the Cloudflare Pages dashboard (Settings -> Environment variables).

## Deployment Steps

### 1. Build Project
Compile the React application and assets.

```bash
npm run build
```

**Verification**: Ensure the `dist` directory is created and contains `index.html`.

### 2. Check Secrets (Optional but Recommended)
If you encounter 500 errors regarding "Missing Supabase configuration", verify or re-upload secrets.

```bash
# Verify existence
npx wrangler pages secret list --project-name uixskills

# If missing, upload (interactive or piped):
# echo "value" | npx wrangler pages secret put VITE_SUPABASE_URL --project-name uixskills
```

### 3. Deploy to Production
Use `wrangler` to upload the `dist` directory. **Crucially**, we must specify `--branch UIXskills` because the Cloudflare project is configured with `UIXskills` as the production branch (not `main`).

```bash
npx wrangler pages deploy dist --project-name uixskills --branch UIXskills
```

## Troubleshooting

-   **API returns HTML**: Deployment is not finished or cache is stale. Wait 2 minutes.
-   **API returns 500**: Check Cloudflare logs or Secrets.
