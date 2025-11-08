# Package Additions Required

This document lists the dependencies and scripts that need to be added to `package.json` to support the Prisma + PostgreSQL + AdminJS setup.

## Dependencies to Add

Run the following commands to install required dependencies:

```bash
npm install @prisma/client prisma bcrypt
npm install express adminjs @adminjs/express @adminjs/prisma
npm install --save-dev @types/express @types/bcrypt ts-node
```

Or add manually to `package.json`:

### dependencies
```json
{
  "@prisma/client": "^5.0.0",
  "prisma": "^5.0.0",
  "bcrypt": "^5.1.1",
  "express": "^4.18.2",
  "adminjs": "^7.0.0",
  "@adminjs/express": "^6.0.0",
  "@adminjs/prisma": "^5.0.0"
}
```

### devDependencies
```json
{
  "@types/express": "^4.17.17",
  "@types/bcrypt": "^5.0.0",
  "ts-node": "^10.9.1"
}
```

## Scripts to Add

Add the following scripts to the `"scripts"` section of `package.json`:

```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:seed": "ts-node prisma/seed.ts",
    "admin:start": "ts-node src/admin/index.ts",
    "db:setup": "docker-compose up -d && npm run prisma:generate && npm run prisma:migrate && npm run prisma:seed"
  }
}
```

## Notes

- **Security**: The seed and admin scripts use hardcoded credentials for development. Replace these with secure authentication in production.
- **Database URL**: Copy `.env.example` to `.env` and adjust the `DATABASE_URL` if needed.
- These additions are separate from the main PR to avoid conflicts with the existing `package.json` structure.
- The repository owner should review and merge these additions manually or provide the current `package.json` for a safe automated merge.
