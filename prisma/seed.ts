import prisma from '../src/prismaClient';
import bcrypt from 'bcrypt';

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@elearn.local' },
    update: {},
    create: {
      email: 'admin@elearn.local',
      password: passwordHash,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  const cat = await prisma.category.upsert({
    where: { name: 'Programming' },
    update: {},
    create: { name: 'Programming' },
  });

  const course = await prisma.course.create({
    data: {
      title: 'Intro to TypeScript',
      description: 'Learn TypeScript basics.',
      published: true,
      instructorId: admin.id,
      categoryId: cat.id,
      lessons: {
        create: [
          { title: 'What is TypeScript?', content: '...' , order: 1},
          { title: 'Types &amp; Interfaces', content: '...', order: 2},
        ],
      },
    },
    include: { lessons: true },
  });

  console.log({ admin: admin.email, course: course.title });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
