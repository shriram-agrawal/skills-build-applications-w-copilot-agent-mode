import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
    period: { type: String, required: true, default: 'all-time' },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, points: -1 });

export default model('Leaderboard', leaderboardSchema);