import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <h1>Boston Drone School - Test</h1>
          {children}
        </div>
      </body>
    </html>
  )
}