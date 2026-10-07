import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, RefreshCw } from 'lucide-react'
import { resolvePageUrl } from '../api.js'

export default function ResourcePage({ title, description, endpoint, columns, fetchPage, icon: Icon }) {
  const [pageUrl, setPageUrl] = useState(null)
  const [reload, setReload] = useState(0)
  const [page, setPage] = useState({ items: [], count: 0, next: null, previous: null })
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchPage(pageUrl, controller.signal)
      .then((result) => {
        setPage(result)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (controller.signal.aborted) return
        setError(requestError.message || 'Unable to load this collection.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [fetchPage, pageUrl, reload])

  function moveTo(url) {
    try {
      setStatus('loading')
      setError('')
      setPageUrl(resolvePageUrl(url))
    } catch (requestError) {
      setError(requestError.message)
      setStatus('error')
    }
  }

  function retry() {
    setStatus('loading')
    setError('')
    setReload((value) => value + 1)
  }

  return (
    <section className="resource-page" aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <div className="eyebrow">OCTOFIT / PROGRAM DATA</div>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="heading-mark" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></div>
      </div>

      <div className="collection-toolbar">
        <div className="collection-name"><span className="collection-indicator" />{endpoint}</div>
        <div className="collection-total">{status === 'ready' ? `${page.count.toLocaleString()} records` : 'Loading records'}</div>
      </div>

      <div className="data-panel">
        {status === 'error' && (
          <div className="request-message request-error" role="alert">
            <div><strong>Could not load {title.toLowerCase()}.</strong><span>{error}</span></div>
            <button className="retry-button" type="button" onClick={retry}>
              <RefreshCw size={15} aria-hidden="true" /> Retry
            </button>
          </div>
        )}
        {status === 'loading' && <div className="request-message" role="status">Loading {title.toLowerCase()}…</div>}
        {status === 'ready' && page.items.length === 0 && (
          <div className="empty-state"><span className="empty-mark"><Icon size={23} aria-hidden="true" /></span><strong>No {title.toLowerCase()} yet</strong><span>New entries will appear here when they are added.</span></div>
        )}
        {status === 'ready' && page.items.length > 0 && (
          <div className="table-wrap">
            <table className="resource-table">
              <thead>
                <tr>{columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {page.items.map((record, index) => (
                  <tr key={record._id || record.id || `${endpoint}-${index}`}>
                    {columns.map((column) => <td key={column.label}>{column.render(record, index)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {status === 'ready' && (page.previous || page.next) && (
          <div className="pagination-bar">
            <span>{page.count.toLocaleString()} total records</span>
            <div className="pagination-actions">
              <button type="button" className="page-button" disabled={!page.previous} onClick={() => moveTo(page.previous)} aria-label="Previous page">
                <ArrowUp size={15} aria-hidden="true" /> Previous
              </button>
              <button type="button" className="page-button" disabled={!page.next} onClick={() => moveTo(page.next)} aria-label="Next page">
                Next <ArrowDown size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="resource-footnote"><span className="footnote-mark" />{endpoint} <span>·</span> Live program data</div>
    </section>
  )
}