<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# E-Learning Platform / منصة التعلم الإلكتروني

This is an E-Learning platform with PostgreSQL database and Prisma ORM.

View your app in AI Studio: https://ai.studio/apps/drive/1cQhKB2oETPUNDDMdzIih5GD18wv4pCxH

---

## 🚀 Quick Start (English)

### Prerequisites
- Node.js (v18 or higher)
- Docker & Docker Compose (for local database)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/LEZGHEM32/E-learning-.git
   cd E-learning-
   ```

2. **Merge package dependencies**
   
   ⚠️ **Important**: This PR includes `package-additions.json` with required dependencies. You need to merge them into your `package.json`:
   ```bash
   node merge-package-json.js
   npm install
   ```
   
   Or manually add the dependencies from `package-additions.json` to your `package.json` file.

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if needed (default values work for local development)

4. **Start PostgreSQL database**
   ```bash
   docker-compose up -d
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

6. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

7. **Seed the database with sample data**
   ```bash
   npx ts-node prisma/seed.ts
   ```

8. **Access Prisma Studio (Database GUI)**
   ```bash
   npx prisma studio
   ```
   Opens at http://localhost:5555

9. **Start the admin panel (optional)**
   ```bash
   npm run admin:start
   ```
   Admin API runs at http://localhost:3001

10. **Run the frontend application**
    ```bash
    npm run dev
    ```

### Sample Data
After seeding, you'll have:
- **Admin User**: `admin@elearn.local` / `password123`
- **Sample Course**: "Intro to TypeScript" with 2 lessons
- **Category**: Programming

---

## 🚀 البدء السريع (العربية)

### المتطلبات الأساسية
- Node.js (الإصدار 18 أو أحدث)
- Docker و Docker Compose (لقاعدة البيانات المحلية)
- Git

### إعداد بيئة التطوير المحلية

1. **استنساخ المستودع**
   ```bash
   git clone https://github.com/LEZGHEM32/E-learning-.git
   cd E-learning-
   ```

2. **دمج التبعيات المطلوبة**
   
   ⚠️ **مهم**: يحتوي هذا الطلب على `package-additions.json` مع التبعيات المطلوبة. تحتاج إلى دمجها في ملف `package.json`:
   ```bash
   node merge-package-json.js
   npm install
   ```
   
   أو أضف التبعيات يدوياً من `package-additions.json` إلى ملف `package.json`.

3. **إعداد متغيرات البيئة**
   ```bash
   cp .env.example .env
   ```
   عدّل `.env` إذا لزم الأمر (القيم الافتراضية تعمل للتطوير المحلي)

4. **تشغيل قاعدة بيانات PostgreSQL**
   ```bash
   docker-compose up -d
   ```

5. **إنشاء Prisma Client**
   ```bash
   npx prisma generate
   ```

6. **تشغيل الترحيلات على قاعدة البيانات**
   ```bash
   npx prisma migrate dev --name init
   ```

7. **ملء قاعدة البيانات ببيانات تجريبية**
   ```bash
   npx ts-node prisma/seed.ts
   ```

8. **الوصول إلى Prisma Studio (واجهة قاعدة البيانات)**
   ```bash
   npx prisma studio
   ```
   يفتح على http://localhost:5555

9. **تشغيل لوحة الإدارة (اختياري)**
   ```bash
   npm run admin:start
   ```
   API الإدارة يعمل على http://localhost:3001

10. **تشغيل تطبيق الواجهة الأمامية**
    ```bash
    npm run dev
    ```

### البيانات التجريبية
بعد التعبئة، سيكون لديك:
- **مستخدم إداري**: `admin@elearn.local` / `password123`
- **دورة تجريبية**: "Intro to TypeScript" مع درسين
- **فئة**: البرمجة

---

## 📦 Package Dependencies

The following dependencies need to be added to `package.json` (see `package-additions.json`):

### Production Dependencies
- `@prisma/client`: ^5.22.0 - Prisma ORM client
- `bcrypt`: ^5.1.1 - Password hashing
- `express`: ^4.21.2 - Admin API server

### Development Dependencies
- `@types/bcrypt`: ^5.0.2 - TypeScript types for bcrypt
- `@types/express`: ^5.0.0 - TypeScript types for Express
- `prisma`: ^5.22.0 - Prisma CLI
- `ts-node`: ^10.9.2 - TypeScript execution

### NPM Scripts to Add
```json
{
  "prisma:generate": "npx prisma generate",
  "prisma:migrate": "npx prisma migrate dev",
  "prisma:studio": "npx prisma studio",
  "prisma:seed": "npx ts-node prisma/seed.ts",
  "admin:start": "npx ts-node src/admin/index.ts"
}
```

---

## 🚀 Production Deployment Notes

### Database Setup
1. **Use a managed PostgreSQL service** such as:
   - AWS RDS
   - Google Cloud SQL
   - Azure Database for PostgreSQL
   - Supabase
   - Neon
   - Railway

2. **Set the DATABASE_URL environment variable** in your production environment to point to your managed database

3. **Run migrations in production**
   ```bash
   npx prisma migrate deploy
   ```
   ⚠️ **Important**: Use `prisma migrate deploy` (NOT `migrate dev`) in production

4. **Generate Prisma Client in production**
   ```bash
   npx prisma generate
   ```

### Database Best Practices

#### Backups
- Enable automated daily backups on your managed database service
- Keep at least 7-30 days of backup retention
- Test backup restoration regularly
- Consider point-in-time recovery (PITR) for critical data

#### Connection Pooling
- Use PgBouncer or similar connection pooler for high-traffic applications
- Configure appropriate pool sizes based on your application needs
- Example connection string with pooling:
  ```
  DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true&connection_limit=10"
  ```

#### Security
- Never commit `.env` files or secrets to version control
- Use strong passwords for database users
- Restrict database access to specific IP addresses/VPCs
- Enable SSL/TLS for database connections
- Rotate database credentials regularly

#### Performance
- Add appropriate indexes based on your query patterns
- Monitor slow queries and optimize them
- Use read replicas for read-heavy workloads
- Consider caching frequently accessed data

#### Monitoring
- Set up monitoring for database metrics (CPU, memory, connections, disk usage)
- Configure alerts for critical thresholds
- Monitor query performance and slow queries
- Track application errors related to database operations

---

## 📂 Project Structure

```
.
├── prisma/
│   ├── schema.prisma      # Database schema definition
│   └── seed.ts           # Database seeding script
├── src/
│   ├── admin/
│   │   └── index.ts      # Admin panel API
│   └── prismaClient.ts   # Prisma client singleton
├── docker-compose.yml     # Local PostgreSQL setup
├── .env.example          # Environment variables template
├── package-additions.json # Dependencies to add
└── merge-package-json.js # Helper script to merge dependencies
```

---

## 🛠️ Available Scripts

After merging dependencies from `package-additions.json`:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npx prisma generate` - Generate Prisma Client
- `npx prisma migrate dev` - Create and apply migrations (dev)
- `npx prisma migrate deploy` - Apply migrations (production)
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx ts-node prisma/seed.ts` - Seed database with sample data
- `npm run admin:start` - Start admin API server

---

## 📄 License

This project is part of the E-Learning platform initiative.
