/**
 * Catch-all error handler.
 * Keeps stack traces out of the response body so we never leak internals.
 */
export function errorHandler(err, req, res, _next) {
  // eslint-disable-next-line no-console
  console.error(`[error] ${req.method} ${req.originalUrl}:`, err?.message || err)

  const status = err.status || 500
  const message =
    status >= 500
      ? 'Something went wrong on our end. Please try again.'
      : err.message || 'Request failed.'

  res.status(status).json({ error: message })
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` })
}
