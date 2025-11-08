<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# E-Learning Platform

منصة تعليم إلكتروني مبنية على React و Vite مع قاعدة بيانات PostgreSQL و Prisma ORM.

## المتطلبات الأساسية

- Node.js (v18 أو أحدث)
- Docker و Docker Compose (لقاعدة البيانات المحلية)
- npm أو yarn

## إعداد المشروع محلياً

### 1. تثبيت الحزم

```bash
npm install
```

### 2. إعداد قاعدة البيانات

نسخ ملف البيئة النموذجي:
```bash
cp .env.example .env
```

تشغيل PostgreSQL باستخدام Docker:
```bash
npm run dev:db
# أو مباشرة:
docker-compose up -d
```

هذا سيشغل:
- PostgreSQL على المنفذ 5432
- Adminer (واجهة إدارة قاعدة البيانات) على http://localhost:8080

### 3. تهيئة Prisma

توليد Prisma Client:
```bash
npm run prisma:generate
# أو:
npx prisma generate
```

تشغيل الـ migrations:
```bash
npm run prisma:migrate
# أو:
npx prisma migrate dev --name init
```

### 4. ملء قاعدة البيانات ببيانات أولية

```bash
npm run seed
# أو:
npx ts-node --project tsconfig.node.json --transpile-only prisma/seed.ts
```

هذا سينشئ:
- مستخدم مسؤول: `admin@elearn.local` / `password123`
- تصنيف "Programming"
- دورة تجريبية مع درسين

### 5. تشغيل التطبيق

تشغيل واجهة React:
```bash
npm run dev
```

لعرض البيانات في Prisma Studio:
```bash
npm run prisma:studio
# أو:
npx prisma studio
```

لتشغيل لوحة الإدارة (AdminJS):
```bash
npm run admin:start
```
ثم افتح http://localhost:3001/admin وسجل دخول بـ:
- البريد: `admin@elearn.local`
- كلمة المرور: `password123`

## الأوامر المتاحة

| الأمر | الوصف |
|-------|-------|
| `npm run dev` | تشغيل تطبيق React في وضع التطوير |
| `npm run build` | بناء التطبيق للإنتاج |
| `npm run preview` | معاينة النسخة المبنية |
| `npm run dev:db` | تشغيل قاعدة البيانات المحلية (Docker) |
| `npm run prisma:generate` | توليد Prisma Client |
| `npm run prisma:migrate` | تشغيل migrations |
| `npm run prisma:studio` | فتح Prisma Studio |
| `npm run seed` | ملء قاعدة البيانات ببيانات أولية |
| `npm run admin:start` | تشغيل لوحة الإدارة AdminJS |

## نشر المشروع في الإنتاج

### قاعدة البيانات

1. **استخدام قاعدة بيانات مُدارة (Managed Database):**
   - استخدم خدمات مثل AWS RDS, Google Cloud SQL, أو Supabase
   - احصل على DATABASE_URL وضعها في متغيرات البيئة

2. **النسخ الاحتياطية (Backups):**
   - فعّل النسخ الاحتياطي التلقائي في خدمة قاعدة البيانات
   - احفظ نسخة احتياطية قبل كل migration

3. **Connection Pooling:**
   - استخدم PgBouncer أو خاصية connection pooling من مزود الخدمة
   - ضع حد أقصى للاتصالات في Prisma Client

4. **تشغيل Migrations في الإنتاج:**
   ```bash
   npx prisma migrate deploy
   ```
   لا تستخدم `migrate dev` في الإنتاج!

### الأمان

- غيّر كلمات المرور الافتراضية
- استخدم متغيرات بيئة آمنة (لا تضع أسرار في الكود)
- فعّل HTTPS
- استخدم مصادقة قوية لـ AdminJS

### الأداء

- استخدم CDN للملفات الثابتة
- فعّل Caching عند الحاجة
- راقب أداء الاستعلامات بـ Prisma logging

---

View your app in AI Studio: https://ai.studio/apps/drive/1cQhKB2oETPUNDDMdzIih5GD18wv4pCxH
