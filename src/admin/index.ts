import express from 'express';
import prisma from '../prismaClient';

const app = express();
app.use(express.json());

// Simple admin dashboard endpoints
app.get('/api/stats', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const courseCount = await prisma.course.count();
    const enrollmentCount = await prisma.enrollment.count();
    
    res.json({
      users: userCount,
      courses: courseCount,
      enrollments: enrollmentCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: { name: true, email: true },
        },
        category: true,
        _count: {
          select: { enrollments: true, lessons: true },
        },
      },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

const PORT = process.env.ADMIN_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Admin panel running on http://localhost:${PORT}`);
  console.log(`Stats: http://localhost:${PORT}/api/stats`);
  console.log(`Users: http://localhost:${PORT}/api/users`);
  console.log(`Courses: http://localhost:${PORT}/api/courses`);
});
