# Spiritual AI Website www.spiritualai.store
 
## Project Setup.
 
1. **Install nvm** (Node Version Manager) if you don't have it:
   ```bash 
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   # Then restart your terminal or run `source ~/.bashrc`   
   ```
2. **Install the required Node version** (reads the `.nvmrc` file):
   ```bashvb
   cd /home/parzival/spritualai.org 
   nvm install   # installs 20.9.0 as specified in .nvmrc  
   nvm use       # switches to 20.9.0 for this session
   ```
   *Tip:* Add `nvm use` to your shell's `cd` hook so the correct version is automatically selected when you `cd` into the project.
3. **Install dependencies and start theevelopment server**:
   ```bash
   npm install
   npm run dev
   ```
   The `preinstall` script in `package.json` will abort if an older Node version is used, providing a clear error message.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.,

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More!

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
