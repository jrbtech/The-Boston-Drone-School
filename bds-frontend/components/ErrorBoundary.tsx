'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-red-50 border border-red-200 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
              <p className="text-gray-700 mb-6">
                An unexpected error occurred. Please try refreshing the page.
              </p>

              {this.state.error && (
                <div className="bg-white border border-red-300 rounded p-4 mb-6 text-left">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Error Details:</p>
                  <p className="text-sm text-red-600 font-mono break-all">
                    {this.state.error.message}
                  </p>
                  {process.env.NODE_ENV === 'development' && this.state.error.stack && (
                    <pre className="mt-4 text-xs text-gray-600 overflow-auto max-h-40">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Refresh Page
                </button>
                <button
                  onClick={this.handleReset}
                  className="border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
