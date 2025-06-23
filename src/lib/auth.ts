import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as schema from '@/db/schema';

const githubClientId = process.env.GITHUB_CLIENT_ID;
if (!githubClientId) {
  throw new Error('GITHUB_CLIENT_ID is not defined in environment variables');
}

const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
if (!githubClientSecret) {
  throw new Error(
    'GITHUB_CLIENT_SECRET is not defined in environment variables'
  );
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
if (!googleClientId) {
  throw new Error('GOOGLE_CLIENT_ID is not defined in environment variables');
}

const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!googleClientSecret) {
  throw new Error(
    'GOOGLE_CLIENT_SECRET is not defined in environment variables'
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    },
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
});
