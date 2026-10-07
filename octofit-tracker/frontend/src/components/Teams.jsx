import { UsersRound } from 'lucide-react'
import { API_BASE_URL, parseCollectionResponse } from '../api.js'
import { formatNumber } from './formatters.js'
import ResourcePage from './ResourcePage.jsx'

async function fetchTeams(url, signal) {
  const response = await fetch(url || `${API_BASE_URL}/api/teams/`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  return parseCollectionResponse(response)
}

const columns = [
  { label: 'Team', render: (team) => <span className="primary-cell">{team.name || 'Unnamed team'}</span> },
  {
    label: 'Members',
    render: (team) => {
      const members = Array.isArray(team.members) ? team.members : []
      return <span>{formatNumber(members.length)} <span className="muted-cell">athletes</span></span>
    },
  },
  { label: 'Team points', render: (team) => <strong className="points-value">{formatNumber(team.points)}</strong> },
]

export default function Teams() {
  return <ResourcePage title="Teams" description="Crews building healthy habits together." endpoint="/api/teams/" columns={columns} fetchPage={fetchTeams} icon={UsersRound} />
}