import { useState, useEffect } from 'react'

const cache: Record<string, boolean> = {}

/**
 * Returns true only after confirming the URL returns a non-HTML response.
 * Prevents useGLTF from crashing when a file is missing (server returns 404 HTML page).
 */
export function useModelExists(url: string): boolean | null {
  const [exists, setExists] = useState<boolean | null>(
    cache[url] !== undefined ? cache[url] : null
  )

  useEffect(() => {
    if (cache[url] !== undefined) {
      setExists(cache[url])
      return
    }
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        // If content-type is HTML it's a 404 page, not a real GLB
        const ct = res.headers.get('content-type') ?? ''
        const ok = res.ok && !ct.includes('text/html')
        cache[url] = ok
        setExists(ok)
      })
      .catch(() => {
        cache[url] = false
        setExists(false)
      })
  }, [url])

  return exists // null = still checking, true = exists, false = missing
}
