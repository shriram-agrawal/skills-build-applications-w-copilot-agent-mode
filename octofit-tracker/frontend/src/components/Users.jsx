import { ShieldCheck } from 'lucide-react'
import { API_BASE_URL, parseCollectionResponse } from '../api.js'
import { formatLabel } from './formatters.js'
import ResourcePage from './ResourcePage.jsx'

async function fetchUsers(url, signal) {
  const response = await fetch(url || `${API_BASE_URL}/api/users/`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  return parseCollectionResponse(response)
}

const columns = [
  { label: 'Athlete', render: (user) => <span className="primary-cell">{user.name || user.username || 'Unnamed athlete'}</span> },
  { label: 'Email', render: (user) => <span className="muted-cell">{user.email || 'Not provided'}</span> },
  { label: 'Grade', render: (user) => user.grade ? formatLabel(user.grade) : 'Not specified' },
  { label: 'Joined', render: (user) => user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—' },
]

export default function Users() {
  return <ResourcePage title="Athletes" description="Students taking part in the OctoFit program." endpoint="/api/users/" columns={columns} fetchPage={fetchUsers} icon={ShieldCheck} />
}