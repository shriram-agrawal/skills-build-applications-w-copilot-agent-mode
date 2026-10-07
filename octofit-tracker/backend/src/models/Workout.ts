import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: { type: String, enum: ['running', 'walking', 'strength'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);