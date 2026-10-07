import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';
import { connectDatabase } from '../config/database';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const users = await User.create([
      { name: 'Mona Octocat', email: 'mona@example.test', grade: '10' },
      { name: 'Pico Octocat', email: 'pico@example.test', grade: '11' },
    ]);
    const team = await Team.create({ name: 'Octocats', members: users.map((user) => user._id) });
    const activities = await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 25, distanceKm: 3.2, points: 32 },
      { user: users[1]._id, type: 'walking', durationMinutes: 30, distanceKm: 2.4, points: 24 },
    ]);
    await Leaderboard.create([
      { user: users[0]._id, team: team._id, points: 32 },
      { user: users[1]._id, team: team._id, points: 24 },
    ]);
    await Workout.create([
      {
        name: 'Easy Run',
        description: 'A steady outdoor run at a comfortable pace.',
        activityType: 'running',
        durationMinutes: 25,
        difficulty: 'beginner',
      },
      {
        name: 'Bodyweight Basics',
        description: 'A short strength session using bodyweight movements.',
        activityType: 'strength',
        durationMinutes: 20,
        difficulty: 'beginner',
      },
    ]);

    console.log(`Seeded ${users.length} users, ${activities.length} activities, and Octocats team data`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
