'use client'

export default function ApiTestPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'NOT SET'

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>API Configuration Test</h1>
      <p><strong>NEXT_PUBLIC_API_URL:</strong> {apiUrl}</p>
      <p><strong>Expected:</strong> https://bds-backend-5ao0.onrender.com</p>

      <hr style={{ margin: '2rem 0' }} />

      <button
        onClick={async () => {
          try {
            const response = await fetch(`${apiUrl}/api/courses`)
            const data = await response.json()
            console.log('API Response:', data)
            alert(`Success! Got ${data.courses?.length || 0} courses`)
          } catch (error) {
            console.error('API Error:', error)
            alert(`Error: ${error}`)
          }
        }}
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          cursor: 'pointer',
          background: 'black',
          color: 'white',
          border: 'none'
        }}
      >
        Test API Connection
      </button>
    </div>
  )
}
