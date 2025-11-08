import express from 'express';
import prisma from '../prismaClient';

const app = express();
app.use(express.json());

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: { instructor: { select: { name: true, email: true } }, lessons: true },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get stats
app.get('/api/stats', async (req, res) => {
  try {
    const [userCount, courseCount, enrollmentCount] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.enrollment.count(),
    ]);
    res.json({ users: userCount, courses: courseCount, enrollments: enrollmentCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

const PORT = process.env.ADMIN_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Admin panel running on http://localhost:${PORT}`);
});
