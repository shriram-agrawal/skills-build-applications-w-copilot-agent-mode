import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { Activity, BarChart3, Dumbbell, ShieldCheck, UsersRound } from 'lucide-react'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './OctoFit.css'

const navigation = [
  { to: '/activities', label: 'Activities', icon: Activity },
  { to: '/leaderboard', label: 'Leaderboard', icon: BarChart3 },
  { to: '/teams', label: 'Teams', icon: UsersRound },
  { to: '/users', label: 'Athletes', icon: ShieldCheck },
  { to: '/workouts', label: 'Workouts', icon: Dumbbell },
]

function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/activities" aria-label="OctoFit Tracker home">
          <img src="/octofitapp-small.png" alt="" />
          <span className="brand-name">OctoFit<span>TRACKER</span></span>
        </NavLink>
        <div className="nav-caption">YOUR PROGRAM</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-season">
          <span className="season-mark" aria-hidden="true">01</span>
          <span>Fall fitness season<small>MERGINGTON HIGH</small></span>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-context"><span className="live-dot" /> STUDENT FITNESS <span className="topbar-slash">/</span> OCTOFIT PROGRAM</div>
          <div className="coach-badge"><span className="coach-avatar">OC</span><span>Coach view</span></div>
        </header>
        <nav className="mobile-nav" aria-label="Main navigation">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} aria-label={label} title={label} className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}>
              <Icon size={19} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return <AppShell />
}
