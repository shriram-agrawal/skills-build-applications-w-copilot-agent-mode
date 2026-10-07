import { Dumbbell } from 'lucide-react'
import { API_BASE_URL, parseCollectionResponse } from '../api.js'
import { formatLabel, formatNumber } from './formatters.js'
import ResourcePage from './ResourcePage.jsx'

async function fetchWorkouts(url, signal) {
  const response = await fetch(url || `${API_BASE_URL}/api/workouts/`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  return parseCollectionResponse(response)
}

const columns = [
  { label: 'Workout', render: (workout) => <span className="primary-cell">{workout.name || 'Unnamed workout'}</span> },
  { label: 'Focus', render: (workout) => formatLabel(workout.activityType) },
  { label: 'Duration', render: (workout) => `${formatNumber(workout.durationMinutes)} min` },
  { label: 'Level', render: (workout) => <span className="type-label">{formatLabel(workout.difficulty)}</span> },
  { label: 'Details', render: (workout) => <span className="workout-description">{workout.description || 'No description provided'}</span> },
]

export default function Workouts() {
  return <ResourcePage title="Workouts" description="Suggested sessions for building strength and stamina." endpoint="/api/workouts/" columns={columns} fetchPage={fetchWorkouts} icon={Dumbbell} />
}