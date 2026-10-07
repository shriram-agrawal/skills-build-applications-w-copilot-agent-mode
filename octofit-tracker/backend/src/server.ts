import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

export const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ name: 1 }));
});
app.post('/api/users/', async (request, response) => {
  response.status(201).json(await User.create(request.body));
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name').sort({ name: 1 }));
});
app.post('/api/teams/', async (request, response) => {
  response.status(201).json(await Team.create(request.body));
});

app.get('/api/activities/', async (request, response) => {
  const activities = await Activity.find(request.query.user ? { user: request.query.user } : {})
    .populate('user', 'name')
    .sort({ completedAt: -1 });
  response.json(activities);
});
app.post('/api/activities/', async (request, response) => {
  response.status(201).json(await Activity.create(request.body));
});

app.get('/api/leaderboard/', async (request, response) => {
  const filter = request.query.period ? { period: request.query.period } : {};
  const entries = await Leaderboard.find(filter)
    .populate('user', 'name')
    .populate('team', 'name')
    .sort({ points: -1 });
  response.json(entries);
});

app.get('/api/workouts/', async (request, response) => {
  const filter = request.query.activityType ? { activityType: request.query.activityType } : {};
  response.json(await Workout.find(filter).sort({ name: 1 }));
});
app.post('/api/workouts/', async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof mongoose.Error.ValidationError) {
    response.status(400).json({ error: error.message });
    return;
  }
  if (error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: 'Invalid resource identifier' });
    return;
  }
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

export async function startServer() {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
  });
}