# Odd Mango — Creative & Marketing Agency Hub

Bold neo-brutalist creative and marketing agency web application featuring 3D service stacks, cinematic film showcases, 12-grid branding archive, interactive production roadmap, and dynamic project scope estimator.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** with relative base asset resolution (`base: './'`)
- **Tailwind CSS v4**
- **Lucide React** icons
- **Web Audio API** micro-interactions & sound effects

## Deploying to GitHub Pages

This repository is pre-configured to deploy seamlessly to GitHub Pages via two methods:

### Option 1: Automatic GitHub Actions (Recommended)

1. Push this repository to GitHub on the `main` or `master` branch.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site whenever you push changes.

### Option 2: Manual CLI Deployment with `gh-pages`

You can also build and publish directly from your terminal:

```bash
npm run deploy
```

This runs `npm run build` and automatically commits and pushes the production `dist` directory to the `gh-pages` branch.
