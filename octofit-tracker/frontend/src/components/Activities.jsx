import { Activity } from 'lucide-react'
import { API_BASE_URL, parseCollectionResponse } from '../api.js'
import { displayName, formatDate, formatLabel, formatNumber } from './formatters.js'
import ResourcePage from './ResourcePage.jsx'

async function fetchActivities(url, signal) {
  const response = await fetch(url || `${API_BASE_URL}/api/activities/`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  return parseCollectionResponse(response)
}

const columns = [
  { label: 'Athlete', render: (activity) => <span className="primary-cell">{displayName(activity.user)}</span> },
  { label: 'Activity', render: (activity) => <span className={`type-label type-${activity.type}`}>{formatLabel(activity.type)}</span> },
  { label: 'Duration', render: (activity) => `${formatNumber(activity.durationMinutes)} min` },
  { label: 'Distance', render: (activity) => activity.distanceKm == null ? '—' : `${Number(activity.distanceKm).toFixed(1)} km` },
  { label: 'Points', render: (activity) => <strong className="points-value">{formatNumber(activity.points)}</strong> },
  { label: 'Completed', render: (activity) => <span className="muted-cell">{formatDate(activity.completedAt)}</span> },
]

export default function Activities() {
  return <ResourcePage title="Activities" description="Recent movement across the OctoFit program." endpoint="/api/activities/" columns={columns} fetchPage={fetchActivities} icon={Activity} />
}