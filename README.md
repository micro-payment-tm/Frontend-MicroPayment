# Mezo Passport App

Next.js integration with Mezo Passport wallet on Matsnet testnet.

## Prerequisites

- Node.js 18+
- npm or yarn

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

Get free Project ID at https://cloud.walletconnect.com/

## Required Fixes

### Fix 1: orangekit-smart-account exports

**Problem:**
```
Module not found: Can't resolve '@mezo-org/orangekit-smart-account/src/lib/utils/chains'
```

**Solution:**

Edit `node_modules/@mezo-org/orangekit-smart-account/package.json`:

Add `"exports"` field after `"main"`:

```json
{
  "name": "@mezo-org/orangekit-smart-account",
  "version": "1.0.0-beta.24",
  "main": "dist/src/index.js",
  "exports": {
    ".": "./dist/src/index.js",
    "./src/lib/utils/chains": "./dist/src/lib/utils/chains.js"
  },
  ...
}
```

> **Important:** Run `npm install` again will reset this fix. Re-apply if needed.

### Fix 2: next.config.ts

**File:** `next.config.ts`

```typescript
const nextConfig = {
  turbopack: {},
};

module.exports = nextConfig;
```

## Running

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Known Issues

1. **ReactCurrentDispatcher error** - Using wagmi + RainbowKit standard instead of @mezo-org/passport due to bundled React conflict with Next.js 16.

2. **Module resolution** - May need to re-apply Fix #1 after `npm install`.

## Tech Stack

- Next.js 16
- wagmi + RainbowKit
- Mezo Testnet (chain ID: 31611)
