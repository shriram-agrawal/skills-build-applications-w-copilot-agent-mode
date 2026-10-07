const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  const page = payload && !Array.isArray(payload) && payload.data && !Array.isArray(payload.data)
    ? payload.data
    : payload
  const items = Array.isArray(page)
    ? page
    : Array.isArray(page?.results)
      ? page.results
      : Array.isArray(page?.items)
        ? page.items
        : Array.isArray(page?.data)
          ? page.data
          : []
  const total = page?.count ?? page?.total ?? page?.totalCount

  return {
    items,
    count: Number.isFinite(Number(total)) ? Number(total) : items.length,
    next: page?.next ?? page?.nextPage ?? page?.links?.next ?? null,
    previous: page?.previous ?? page?.previousPage ?? page?.links?.previous ?? null,
  }
}

export async function parseCollectionResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return normalizeCollection(await response.json())
}

export function resolvePageUrl(pageUrl) {
  if (!pageUrl) return null
  const base = new URL(API_BASE_URL)
  const resolved = new URL(pageUrl, base)
  if (resolved.origin !== base.origin) {
    throw new Error('The API returned a pagination link outside its own origin.')
  }
  return resolved.toString()
}