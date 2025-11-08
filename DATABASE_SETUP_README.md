# E-Learning Platform - Backend Setup Guide

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## نظرة عامة | Overview

هذا المشروع يحتوي على إعدادات قاعدة بيانات PostgreSQL مع Prisma وأدوات الإدارة للتطوير المحلي.

This project includes PostgreSQL database setup with Prisma and admin tools for local development.

---

## متطلبات التثبيت | Prerequisites

- **Node.js** (v16 أو أحدث)
- **Docker** و **Docker Compose** (للتطوير المحلي)
- **PostgreSQL** (اختياري - يمكن استخدام Docker بدلاً منه)

---

## التثبيت والإعداد | Installation & Setup

### 1. تثبيت المكتبات المطلوبة | Install Required Dependencies

**⚠️ ملاحظة مهمة للمالك | Important Note for Owner:**

الرجاء إضافة المكتبات التالية إلى `package.json` الخاص بك:

Please add the following dependencies to your `package.json`:

```json
{
  "dependencies": {
    "@prisma/client": "^5.7.1",
    "prisma": "^5.7.1",
    "bcrypt": "^5.1.1",
    "express": "^4.18.2",
    "adminjs": "^7.5.0",
    "@adminjs/express": "^6.1.0",
    "@adminjs/prisma": "^5.0.0",
    "express-formidable": "^1.2.0",
    "express-session": "^1.17.3",
    "tslib": "^2.6.2"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.17.10",
    "ts-node": "^10.9.2"
  }
}
```

ثم قم بتشغيل:
```bash
npm install
```

---

### 2. السكربتات المطلوبة | Required Scripts

**⚠️ ملاحظة للمالك | Note for Owner:**

الرجاء إضافة السكربتات التالية إلى قسم `"scripts"` في `package.json`:

Please add the following scripts to the `"scripts"` section in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "db:generate": "npx prisma generate",
    "db:migrate": "npx prisma migrate dev",
    "db:migrate:prod": "npx prisma migrate deploy",
    "db:seed": "npx ts-node prisma/seed.ts",
    "db:studio": "npx prisma studio",
    "db:reset": "npx prisma migrate reset",
    "admin:start": "npx ts-node src/admin/index.ts"
  }
}
```

---

## التشغيل المحلي | Local Development

### الخطوة 1: تشغيل قاعدة البيانات | Step 1: Start Database

استخدم Docker Compose لتشغيل PostgreSQL و Adminer:

Use Docker Compose to start PostgreSQL and Adminer:

```bash
docker-compose up -d
```

هذا سيقوم بتشغيل:
- **PostgreSQL** على المنفذ `5432`
- **Adminer** (أداة إدارة قواعد البيانات) على المنفذ `8080`

This will start:
- **PostgreSQL** on port `5432`
- **Adminer** (database management tool) on port `8080`

---

### الخطوة 2: إعداد ملف البيئة | Step 2: Environment Setup

انسخ ملف `.env.example` إلى `.env`:

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

تأكد من أن `DATABASE_URL` صحيح في ملف `.env`:

Ensure `DATABASE_URL` is correct in `.env`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/elearning?schema=public"
```

---

### الخطوة 3: إنشاء Prisma Client | Step 3: Generate Prisma Client

```bash
npm run db:generate
# أو | or
npx prisma generate
```

---

### الخطوة 4: تشغيل Migrations | Step 4: Run Migrations

```bash
npm run db:migrate
# أو | or
npx prisma migrate dev --name init
```

---

### الخطوة 5: تعبئة قاعدة البيانات بالبيانات الأولية | Step 5: Seed Database

```bash
npm run db:seed
# أو | or
npx ts-node prisma/seed.ts
```

هذا سيقوم بإنشاء:
- مستخدم Admin: `admin@elearn.local` / `password123`
- تصنيف: Programming
- دورة تعليمية: Intro to TypeScript مع درسين

This will create:
- Admin user: `admin@elearn.local` / `password123`
- Category: Programming
- Course: Intro to TypeScript with 2 lessons

---

### الخطوة 6: فتح Prisma Studio | Step 6: Open Prisma Studio

لعرض وتعديل البيانات بصرياً:

To view and edit data visually:

```bash
npm run db:studio
# أو | or
npx prisma studio
```

سيتم فتح Prisma Studio على `http://localhost:5555`

Prisma Studio will open at `http://localhost:5555`

---

### الخطوة 7: تشغيل لوحة الإدارة AdminJS | Step 7: Start AdminJS Panel

```bash
npm run admin:start
# أو | or
npx ts-node src/admin/index.ts
```

ادخل إلى لوحة الإدارة على: `http://localhost:3001/admin`

Access the admin panel at: `http://localhost:3001/admin`

بيانات الدخول:
- Email: `admin@elearn.local`
- Password: `password123`

Login credentials:
- Email: `admin@elearn.local`
- Password: `password123`

---

## الأدوات المتاحة | Available Tools

### 1. **Adminer** - أداة إدارة قواعد البيانات

الوصول: `http://localhost:8080`

- النظام: PostgreSQL
- الخادم: db
- المستخدم: postgres
- كلمة المرور: postgres
- قاعدة البيانات: elearning

Access: `http://localhost:8080`

- System: PostgreSQL
- Server: db
- Username: postgres
- Password: postgres
- Database: elearning

---

### 2. **Prisma Studio** - محرر قاعدة البيانات المرئي

الوصول: `http://localhost:5555`

```bash
npm run db:studio
```

Access: `http://localhost:5555`

---

### 3. **AdminJS** - لوحة الإدارة

الوصول: `http://localhost:3001/admin`

```bash
npm run admin:start
```

Access: `http://localhost:3001/admin`

---

## نموذج البيانات | Data Models

### User
- id, email, password, name, role (STUDENT/INSTRUCTOR/ADMIN)
- علاقات | Relations: courses, enrollments, comments, progresses

### Course
- id, title, description, published, instructor
- علاقات | Relations: lessons, category, enrollments, comments

### Lesson
- id, title, content, order
- علاقات | Relations: course, progresses

### Enrollment
- id, user, course, enrolledAt

### Progress
- id, user, lesson, completed, updatedAt

### Comment
- id, user, course, content, createdAt

### Category
- id, name
- علاقات | Relations: courses

---

## سكربتات مفيدة | Useful Commands

### إعادة تعيين قاعدة البيانات | Reset Database
```bash
npm run db:reset
# أو | or
npx prisma migrate reset
```
⚠️ **تحذير:** هذا سيحذف جميع البيانات!

⚠️ **Warning:** This will delete all data!

---

### إنشاء Migration جديد | Create New Migration
```bash
npx prisma migrate dev --name <migration_name>
```

---

### عرض Prisma Schema | View Prisma Schema
```bash
npx prisma format
```

---

## الإنتاج | Production Deployment

### نصائح للإنتاج | Production Tips

1. **استخدم قاعدة بيانات مُدارة | Use Managed Database**
   - مثل | Such as: AWS RDS, Google Cloud SQL, Azure Database, Supabase, Neon, PlanetScale

2. **قم بتشغيل Migrations في الإنتاج | Run Migrations in Production**
   ```bash
   npm run db:migrate:prod
   # أو | or
   npx prisma migrate deploy
   ```

3. **استخدم Connection Pooling**
   - استخدم PgBouncer أو حلول مماثلة
   - Use PgBouncer or similar solutions

4. **النسخ الاحتياطي المنتظم | Regular Backups**
   - قم بإعداد نسخ احتياطي تلقائي لقاعدة البيانات
   - Setup automated database backups

5. **متغيرات البيئة الآمنة | Secure Environment Variables**
   - لا تحفظ `DATABASE_URL` في الكود
   - استخدم خدمات إدارة الأسرار مثل AWS Secrets Manager
   - Never commit `DATABASE_URL` to code
   - Use secret management services like AWS Secrets Manager

6. **مراقبة الأداء | Performance Monitoring**
   - استخدم Prisma Studio في التطوير فقط، ليس في الإنتاج
   - راقب استعلامات قاعدة البيانات البطيئة
   - Use Prisma Studio in development only, not in production
   - Monitor slow database queries

7. **الأمان | Security**
   - غيّر بيانات الدخول الافتراضية
   - استخدم كلمات مرور قوية ومعقدة
   - فعّل SSL/TLS للاتصالات بقاعدة البيانات
   - Change default credentials
   - Use strong, complex passwords
   - Enable SSL/TLS for database connections

---

## استكشاف الأخطاء | Troubleshooting

### خطأ الاتصال بقاعدة البيانات | Database Connection Error

تأكد من أن Docker يعمل وأن PostgreSQL يعمل:

Ensure Docker is running and PostgreSQL is up:

```bash
docker-compose ps
docker-compose logs db
```

---

### خطأ في Prisma Client

أعد إنشاء Prisma Client:

Regenerate Prisma Client:

```bash
npm run db:generate
```

---

### خطأ في Migration

تحقق من حالة Migrations:

Check migration status:

```bash
npx prisma migrate status
```

---

## المساهمة | Contributing

نرحب بالمساهمات! الرجاء فتح Issue أو Pull Request.

Contributions are welcome! Please open an Issue or Pull Request.

---

## الترخيص | License

هذا المشروع مفتوح المصدر.

This project is open source.

---

## الدعم | Support

للأسئلة والدعم، الرجاء فتح Issue على GitHub.

For questions and support, please open an Issue on GitHub.
