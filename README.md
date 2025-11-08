<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# E-Learning Platform / منصة التعلم الإلكتروني

This repository contains an E-Learning platform with PostgreSQL database, Prisma ORM, and admin tools.

يحتوي هذا المستودع على منصة تعليم إلكتروني مع قاعدة بيانات PostgreSQL و Prisma ORM وأدوات الإدارة.

---

## Quick Start / البدء السريع

### English Instructions

**Prerequisites:** Node.js 18+, Docker (for local database)

#### 1. Merge Dependencies

The database dependencies are defined in `package-additions.json`. To merge them into `package.json`:

```bash
node merge-package-json.js
npm install
```

**Note:** Review `package-additions.json` before merging to ensure compatibility with your existing dependencies.

#### 2. Start Local Database

```bash
docker-compose up -d
```

This starts PostgreSQL on `localhost:5432` with:
- Database: `elearning`
- User: `postgres`
- Password: `postgres`

#### 3. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

The default DATABASE_URL is: `postgresql://postgres:postgres@localhost:5432/elearning?schema=public`

#### 4. Initialize Database

Generate Prisma client:
```bash
npx prisma generate
```

Run database migrations:
```bash
npx prisma migrate dev --name init
```

Seed the database with sample data:
```bash
npx ts-node prisma/seed.ts
```

This creates:
- Admin user: `admin@elearn.local` / `password123`
- Sample course: "Intro to TypeScript" with 2 lessons
- Category: "Programming"

#### 5. Explore Database

Open Prisma Studio (database GUI):
```bash
npx prisma studio
```

Visit: `http://localhost:5555`

#### 6. Run Admin Panel

Start the admin API server:
```bash
npm run admin:start
```

The admin panel runs on `http://localhost:3001` with endpoints:
- GET `/api/users` - List all users
- GET `/api/courses` - List all courses with instructors and lessons
- GET `/api/stats` - Get platform statistics

#### 7. Run the App

```bash
npm run dev
```

---

### التعليمات بالعربية

**المتطلبات:** Node.js 18+، Docker (لقاعدة البيانات المحلية)

#### 1. دمج التبعيات

تم تعريف تبعيات قاعدة البيانات في `package-additions.json`. لدمجها في `package.json`:

```bash
node merge-package-json.js
npm install
```

**ملاحظة:** راجع `package-additions.json` قبل الدمج للتأكد من التوافق مع التبعيات الموجودة.

#### 2. تشغيل قاعدة البيانات المحلية

```bash
docker-compose up -d
```

يبدأ هذا PostgreSQL على `localhost:5432` مع:
- قاعدة البيانات: `elearning`
- المستخدم: `postgres`
- كلمة المرور: `postgres`

#### 3. تكوين البيئة

انسخ `.env.example` إلى `.env`:

```bash
cp .env.example .env
```

DATABASE_URL الافتراضي هو: `postgresql://postgres:postgres@localhost:5432/elearning?schema=public`

#### 4. تهيئة قاعدة البيانات

توليد عميل Prisma:
```bash
npx prisma generate
```

تشغيل ترحيل قاعدة البيانات:
```bash
npx prisma migrate dev --name init
```

ملء قاعدة البيانات ببيانات تجريبية:
```bash
npx ts-node prisma/seed.ts
```

ينشئ هذا:
- مستخدم المسؤول: `admin@elearn.local` / `password123`
- دورة تجريبية: "مقدمة في TypeScript" مع درسين
- فئة: "البرمجة"

#### 5. استكشاف قاعدة البيانات

افتح Prisma Studio (واجهة قاعدة البيانات):
```bash
npx prisma studio
```

زيارة: `http://localhost:5555`

#### 6. تشغيل لوحة الإدارة

ابدأ خادم واجهة برمجة التطبيقات للإدارة:
```bash
npm run admin:start
```

تعمل لوحة الإدارة على `http://localhost:3001` مع نقاط النهاية:
- GET `/api/users` - قائمة جميع المستخدمين
- GET `/api/courses` - قائمة جميع الدورات مع المدرسين والدروس
- GET `/api/stats` - احصل على إحصائيات المنصة

#### 7. تشغيل التطبيق

```bash
npm run dev
```

---

## Production Deployment / النشر الإنتاجي

### English

For production environments:

1. **Use a Managed Database**: Use services like AWS RDS, Google Cloud SQL, or Azure Database for PostgreSQL
2. **Set DATABASE_URL**: Configure your production DATABASE_URL in environment variables
3. **Run Migrations**: Use `npx prisma migrate deploy` (not `migrate dev`) to apply migrations
4. **Connection Pooling**: Consider using Prisma Data Proxy or PgBouncer for connection pooling
5. **Backups**: Set up automated database backups
6. **Monitoring**: Monitor database performance and query logs
7. **Security**: 
   - Never commit `.env` files
   - Use strong passwords
   - Restrict database access by IP
   - Enable SSL connections

### العربية

بالنسبة لبيئات الإنتاج:

1. **استخدام قاعدة بيانات مدارة**: استخدم خدمات مثل AWS RDS أو Google Cloud SQL أو Azure Database for PostgreSQL
2. **تعيين DATABASE_URL**: قم بتكوين DATABASE_URL الإنتاجي في متغيرات البيئة
3. **تشغيل الترحيلات**: استخدم `npx prisma migrate deploy` (وليس `migrate dev`) لتطبيق الترحيلات
4. **تجميع الاتصالات**: فكر في استخدام Prisma Data Proxy أو PgBouncer لتجميع الاتصالات
5. **النسخ الاحتياطية**: قم بإعداد نسخ احتياطية تلقائية لقاعدة البيانات
6. **المراقبة**: راقب أداء قاعدة البيانات وسجلات الاستعلام
7. **الأمان**:
   - لا ترتكب ملفات `.env` أبدًا
   - استخدم كلمات مرور قوية
   - قيد الوصول إلى قاعدة البيانات حسب IP
   - تمكين اتصالات SSL

---

## Database Schema / مخطط قاعدة البيانات

The schema includes:
- **Users** (students, instructors, admins)
- **Courses** with categories
- **Lessons** within courses
- **Enrollments** tracking student course registrations
- **Progress** tracking lesson completion
- **Comments** for course discussions

See `prisma/schema.prisma` for full details.

---

## Available Scripts / البرامج النصية المتاحة

```bash
npm run dev              # Run development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio
npm run admin:start      # Start admin panel server
```

---

## View in AI Studio

https://ai.studio/apps/drive/1cQhKB2oETPUNDDMdzIih5GD18wv4pCxH
