import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';
import connectDB from './configs/db.js';

const app = express();
await connectDB()
// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/inngest', serve({ client: inngest, functions }));

// Export the app for Vercel serverless
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;
