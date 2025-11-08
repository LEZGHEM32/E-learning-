import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';
import prisma from '../prismaClient';

AdminJS.registerAdapter({ Database, Resource });

const startAdmin = async () => {
  const adminJs = new AdminJS({
    databases: [prisma],
    rootPath: '/admin',
    branding: {
      companyName: 'E‑learning Admin',
    },
  });

  const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      // مؤقت: استبدل بمصادقة آمنة في الإنتاج
      if (email === 'admin@elearn.local' && password === 'password123') {
        return { email };
      }
      return null;
    },
    cookiePassword: 'session-cookie-secret',
  });

  const app = express();
  app.use(adminJs.options.rootPath, router);
  const port = process.env.ADMIN_PORT || 3001;
  app.listen(port, () => {
    console.log(`AdminJS started on http://localhost:${port}${adminJs.options.rootPath}`);
  });
};

startAdmin().catch(console.error);
