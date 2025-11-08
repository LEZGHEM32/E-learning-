<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# E-learning Platform / منصة التعلم الإلكتروني

This repository contains an E-learning platform with PostgreSQL database, Prisma ORM, and admin tools.

هذا المستودع يحتوي على منصة تعلم إلكتروني مع قاعدة بيانات PostgreSQL وأدوات إدارية.

## Features / المميزات

- **Database**: PostgreSQL with Prisma ORM
- **Admin Panel**: AdminJS for database management
- **Docker Support**: Local development with Docker Compose
- **Seed Data**: Sample data for quick start

---

## Local Development Setup / إعداد التطوير المحلي

### Prerequisites / المتطلبات الأساسية

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

### Installation Steps / خطوات التثبيت

#### 1. Install Dependencies / تثبيت الاعتمادات

```bash
npm install
```

**Note**: See `package-additions.md` for required dependencies to add to `package.json`.

#### 2. Setup Environment / إعداد البيئة

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` if you need to change database credentials.

#### 3. Start PostgreSQL Database / تشغيل قاعدة البيانات

Start PostgreSQL and Adminer using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on `localhost:5432`
- Adminer (DB admin UI) on `http://localhost:8080`

#### 4. Generate Prisma Client / توليد عميل Prisma

```bash
npx prisma generate
```

#### 5. Run Database Migrations / تشغيل الهجرات

```bash
npx prisma migrate dev --name init
```

#### 6. Seed Database / ملء قاعدة البيانات

Populate the database with sample data:

```bash
npx ts-node prisma/seed.ts
```

This creates:
- Admin user: `admin@elearn.local` / password: `password123`
- Sample category: "Programming"
- Sample course: "Intro to TypeScript"

#### 7. Explore Database / استكشاف قاعدة البيانات

**Option A: Prisma Studio**
```bash
npx prisma studio
```
Opens at `http://localhost:5555`

**Option B: Adminer**

Visit `http://localhost:8080` and login with:
- System: PostgreSQL
- Server: db
- Username: postgres
- Password: postgres
- Database: elearning

#### 8. Start Admin Panel / تشغيل لوحة الإدارة

```bash
npm run admin:start
```

Access at `http://localhost:3001/admin`

Login with:
- Email: `admin@elearn.local`
- Password: `password123`

#### 9. Run Frontend App / تشغيل التطبيق

```bash
npm run dev
```

---

## Database Schema / مخطط قاعدة البيانات

The database includes the following models:

- **User**: Students, instructors, and admins
- **Course**: Learning courses
- **Lesson**: Individual lessons within courses
- **Enrollment**: User course enrollments
- **Progress**: Lesson completion tracking
- **Comment**: Course comments
- **Category**: Course categories

---

## Production Deployment Tips / نصائح النشر للإنتاج

### Database / قاعدة البيانات

1. **Use Managed Database**: Deploy PostgreSQL on managed services like:
   - AWS RDS
   - Google Cloud SQL
   - Azure Database for PostgreSQL
   - Supabase
   - Railway
   - Render

2. **Connection Pooling**: Use PgBouncer or Prisma Data Proxy for connection pooling

3. **Backups**: Enable automated backups and point-in-time recovery

4. **Security**: 
   - Use strong passwords
   - Enable SSL/TLS connections
   - Restrict network access with firewall rules

### Migrations / الهجرات

For production, use:

```bash
npx prisma migrate deploy
```

This applies migrations without prompting (safe for CI/CD).

### Environment Variables / متغيرات البيئة

Set `DATABASE_URL` in production to your managed database connection string:

```
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
```

### Admin Panel Security / أمان لوحة الإدارة

- Replace hardcoded authentication in `src/admin/index.ts`
- Use secure session secrets
- Implement proper user authentication
- Consider IP whitelisting for admin access

---

## Scripts Reference / مرجع السكربتات

See `package-additions.md` for complete list of scripts to add:

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database
- `npm run admin:start` - Start admin panel
- `npm run db:setup` - Complete database setup (Docker + migrations + seed)

---

## Contributing / المساهمة

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

MIT License
