import { BarChart3 } from 'lucide-react'
import { API_BASE_URL, parseCollectionResponse } from '../api.js'
import { displayName, formatLabel, formatNumber } from './formatters.js'
import ResourcePage from './ResourcePage.jsx'

async function fetchLeaderboard(url, signal) {
  const response = await fetch(url || `${API_BASE_URL}/api/leaderboard/`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  return parseCollectionResponse(response)
}

const columns = [
  { label: 'Rank', render: (_entry, index) => <span className="rank-number">{String(index + 1).padStart(2, '0')}</span> },
  { label: 'Athlete', render: (entry) => <span className="primary-cell">{displayName(entry.user)}</span> },
  { label: 'Team', render: (entry) => displayName(entry.team, 'Independent') },
  { label: 'Period', render: (entry) => <span className="type-label">{formatLabel(entry.period)}</span> },
  { label: 'Points', render: (entry) => <strong className="points-value">{formatNumber(entry.points)}</strong> },
]

export default function Leaderboard() {
  return <ResourcePage title="Leaderboard" description="A snapshot of effort, consistency, and team spirit." endpoint="/api/leaderboard/" columns={columns} fetchPage={fetchLeaderboard} icon={BarChart3} />
}