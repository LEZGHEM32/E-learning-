# Pull Request: Add Postgres + Prisma DB + admin tools

## Title
Add Postgres + Prisma DB + admin tools

## Description

This PR adds PostgreSQL database configuration with Prisma ORM, admin tools, and Docker support for local development to the E-learning platform.

### ملخص التغييرات (Summary in Arabic)

تضيف هذه المساهمة إعدادات قاعدة بيانات PostgreSQL مع Prisma ORM وأدوات إدارية ودعم Docker للتطوير المحلي.

---

## Files Added

### 1. Database Schema (`prisma/schema.prisma`)
- Complete E-learning database schema with 7 models:
  - **User**: Students, instructors, and admins with role-based access
  - **Course**: Learning courses with instructor assignment
  - **Lesson**: Individual lessons within courses
  - **Enrollment**: User course enrollments tracking
  - **Progress**: Lesson completion tracking
  - **Comment**: Course comments and feedback
  - **Category**: Course categorization

### 2. Environment Configuration (`.env.example`)
- PostgreSQL connection string template
- Safe to commit (no actual credentials)

### 3. Prisma Client (`src/prismaClient.ts`)
- Initialized Prisma client with query logging
- Singleton pattern for efficient database connections

### 4. Database Seed (`prisma/seed.ts`)
- Sample data generator with:
  - Admin user: `admin@elearn.local`
  - Programming category
  - Sample TypeScript course with 2 lessons

### 5. Docker Compose (`docker-compose.yml`)
- PostgreSQL 15 container
- Adminer database management UI
- Persistent volume for data storage

### 6. Admin Panel (`src/admin/index.ts`)
- AdminJS-powered admin interface
- Basic authentication (⚠️ development only)
- Database CRUD operations UI

### 7. Documentation (`README.md`)
- **Bilingual**: English and Arabic instructions
- Complete local setup guide
- Production deployment tips
- Database management guidelines

### 8. Package Dependencies (`package-additions.md`)
- Required npm packages list
- Suggested npm scripts
- Installation instructions

### 9. Git Configuration (`.gitignore`)
- Excludes environment files (`.env`)
- Excludes migration files (except `.gitkeep`)

---

## Local Setup Instructions / تعليمات التشغيل المحلي

### Quick Start

```bash
# 1. Install dependencies (see package-additions.md for required packages)
npm install

# 2. Setup environment
cp .env.example .env

# 3. Start PostgreSQL with Docker
docker-compose up -d

# 4. Generate Prisma Client
npx prisma generate

# 5. Run database migrations
npx prisma migrate dev --name init

# 6. Seed database with sample data
npx ts-node prisma/seed.ts

# 7. Explore database (choose one):
npx prisma studio              # Prisma Studio at http://localhost:5555
# OR
# Adminer at http://localhost:8080 (already running from docker-compose)

# 8. Start admin panel
npm run admin:start            # Available at http://localhost:3001/admin
```

### Scripts Summary

The following scripts should be added to `package.json` (see `package-additions.md`):

```json
{
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:migrate:deploy": "prisma migrate deploy",
  "prisma:studio": "prisma studio",
  "prisma:seed": "ts-node prisma/seed.ts",
  "admin:start": "ts-node src/admin/index.ts",
  "db:setup": "docker-compose up -d && npm run prisma:generate && npm run prisma:migrate && npm run prisma:seed"
}
```

---

## Database Access

### Prisma Studio
```bash
npx prisma studio
```
- URL: http://localhost:5555
- Modern UI for browsing and editing data

### Adminer
- URL: http://localhost:8080
- Credentials:
  - System: PostgreSQL
  - Server: `db`
  - Username: `postgres`
  - Password: `postgres`
  - Database: `elearning`

### Admin Panel
```bash
npm run admin:start
```
- URL: http://localhost:3001/admin
- Login: `admin@elearn.local` / `password123`

---

## Production Deployment Tips / نصائح النشر للإنتاج

### Database Setup

1. **Use Managed PostgreSQL Service**:
   - AWS RDS
   - Google Cloud SQL
   - Azure Database for PostgreSQL
   - Supabase
   - Railway
   - Render

2. **Update DATABASE_URL**:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
   ```

3. **Enable Connection Pooling**:
   - Use PgBouncer
   - Or Prisma Data Proxy

4. **Enable Backups**:
   - Automated daily backups
   - Point-in-time recovery
   - Test restore procedures

### Security Considerations

⚠️ **Important**: Current implementation uses development-only security:

1. **Admin Authentication**: Replace hardcoded credentials in `src/admin/index.ts`
2. **Session Secret**: Use strong, random `cookiePassword` in production
3. **Environment Variables**: Never commit `.env` files
4. **Database Access**: Use strong passwords and enable SSL
5. **Network Security**: Configure firewall rules and IP whitelisting

### Migrations

For production deployments, use:

```bash
npx prisma migrate deploy
```

This runs migrations without interactive prompts (CI/CD safe).

---

## Dependencies Required

⚠️ **Action Required**: The repository owner needs to review `package-additions.md` and either:
1. Manually add the dependencies and scripts to `package.json`
2. Provide the current `package.json` for automated safe merge
3. Run the installation commands listed in `package-additions.md`

### Core Dependencies
- `@prisma/client` - Prisma ORM client
- `prisma` - Prisma CLI
- `bcrypt` - Password hashing
- `express` - Web server
- `adminjs`, `@adminjs/express`, `@adminjs/prisma` - Admin panel

### Dev Dependencies
- `@types/express`, `@types/bcrypt` - TypeScript types
- `ts-node` - TypeScript execution

---

## Testing Checklist

Before merging, verify:

- [ ] `docker-compose up -d` starts PostgreSQL successfully
- [ ] `npx prisma generate` completes without errors
- [ ] `npx prisma migrate dev --name init` creates migrations
- [ ] `npx ts-node prisma/seed.ts` populates sample data
- [ ] `npx prisma studio` opens database browser
- [ ] Adminer accessible at http://localhost:8080
- [ ] Admin panel starts and authenticates correctly
- [ ] Database schema matches requirements
- [ ] All relations working correctly

---

## Notes

- **No secrets committed**: Only `.env.example` included
- **Minimal changes**: No modifications to existing frontend code
- **Separate documentation**: `package-additions.md` prevents package.json conflicts
- **Bilingual support**: README includes Arabic translations
- **Production ready**: Clear security warnings and deployment guidelines

---

## Questions or Issues?

For any questions about this implementation or required adjustments, please comment on this PR.

---

**Branch**: `feat/add-prisma-postgres`  
**Base**: `main`  
**Commits**: 2
1. `feat: add Postgres + Prisma schema, seed, admin panel and docker-compose for local DB`
2. `fix: correct Prisma schema relations for Course, Lesson, and Enrollment`
