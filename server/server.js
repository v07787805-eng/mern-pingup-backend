import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/inngest', serve({ client: inngest, functions }));

// Export the app for Vercel serverless
export default app;
