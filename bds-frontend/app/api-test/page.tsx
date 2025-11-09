'use client'

import { useState, useEffect } from 'react'

export default function ApiTestPage() {
  const [apiUrl, setApiUrl] = useState('')
  const [testResult, setTestResult] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Get API URL at runtime
    const url = process.env.NEXT_PUBLIC_API_URL || 'NOT SET'
    setApiUrl(url)
  }, [])

  const testApi = async () => {
    setLoading(true)
    setTestResult('Testing...')

    try {
      const url = apiUrl === 'NOT SET' ? 'https://bds-backend-5ao0.onrender.com' : apiUrl
      console.log('Fetching from:', `${url}/api/courses`)

      const response = await fetch(`${url}/api/courses`)
      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('API Response:', data)

      setTestResult(`✅ Success! Got ${data.courses?.length || 0} courses\n\nFirst course: ${data.courses?.[0]?.title || 'N/A'}`)
    } catch (error) {
      console.error('API Error:', error)
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>API Configuration Test</h1>

      <div style={{ background: '#f5f5f5', padding: '1rem', marginBottom: '2rem', borderRadius: '4px' }}>
        <p><strong>NEXT_PUBLIC_API_URL:</strong> {apiUrl}</p>
        <p><strong>Expected:</strong> https://bds-backend-5ao0.onrender.com</p>
        <p><strong>Status:</strong> {apiUrl === 'https://bds-backend-5ao0.onrender.com' ? '✅ Correct' : '⚠️ Check Config'}</p>
      </div>

      <button
        onClick={testApi}
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          background: loading ? '#666' : 'black',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '2rem'
        }}
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      {testResult && (
        <div style={{
          background: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
          padding: '1rem',
          borderRadius: '4px',
          whiteSpace: 'pre-wrap',
          border: testResult.includes('✅') ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
        }}>
          {testResult}
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e7f3ff', borderRadius: '4px' }}>
        <p><strong>Debug Info:</strong></p>
        <p>Window defined: {typeof window !== 'undefined' ? 'Yes' : 'No'}</p>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
      </div>
    </div>
  )
}
