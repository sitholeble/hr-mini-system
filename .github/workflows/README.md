# GitHub Actions CI/CD Pipeline

## Basic POC Setup

This repository uses a simple CI pipeline for testing and building the Angular application.

## Workflow

### CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**What it does:**
1. Checks out your code
2. Sets up Node.js 20.x
3. Installs dependencies
4. Runs unit tests
5. Builds the application for production
6. Uploads build artifacts (downloadable for 7 days)

## How to Use

1. **Push your code:**
   ```bash
   git push origin main
   ```

2. **View the workflow:**
   - Go to your GitHub repository
   - Click the "Actions" tab
   - See your workflow running in real-time

3. **Check results:**
   - Green checkmark = Success
   - Red = Failed (click to see details)

## Adding More Workflows Later

When you're ready to add deployment or staging workflows, you can:
- Add a `deploy.yml` workflow for production deployments
- Add a `staging.yml` workflow for staging environments
- See examples in the main repository documentation

## Troubleshooting

### Tests Fail
- Run tests locally: `npm run test:ci`
- Fix failing tests before pushing

### Build Fails
- Test build locally: `npm run build:prod`
- Check for TypeScript errors: `npx tsc --noEmit`

### Workflow Not Running
- Ensure `.github/workflows/ci.yml` is committed
- Check that you're pushing to the `main` branch
- Verify GitHub Actions is enabled in repository settings

