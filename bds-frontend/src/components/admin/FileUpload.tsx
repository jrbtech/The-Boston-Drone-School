// File Upload Component for Admin Panel
'use client'

import { useState } from 'react'

interface FileUploadProps {
  courseId?: string
  type: 'course-material' | 'faa-material'
  onUploadComplete?: (result: any) => void
}

export default function FileUpload({ courseId, type, onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, '')) // Remove extension
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      setMessage('Please select a file')
      return
    }

    setUploading(true)
    setProgress(0)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('description', description)
      
      if (type === 'faa-material') {
        formData.append('category', category)
      }

      const endpoint = type === 'course-material' 
        ? `/api/upload/course-material/${courseId}`
        : '/api/upload/faa-material'

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setMessage('File uploaded successfully!')
        setFile(null)
        setTitle('')
        setDescription('')
        setProgress(100)
        
        // Reset form
        const fileInput = document.getElementById('file-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''

        onUploadComplete?.(result)
      } else {
        setMessage(`Upload failed: ${result.error}`)
      }
    } catch (error) {
      setMessage(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">
        {type === 'course-material' ? 'Upload Course Material' : 'Upload FAA Material'}
      </h3>

      <form onSubmit={handleUpload} className="space-y-4">
        {/* File Selection */}
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Select File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.mp4,.webm,.ogg,.jpg,.jpeg,.png,.gif,.ppt,.pptx,.doc,.docx"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category for FAA materials */}
        {type === 'faa-material' && (
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="study-guide">Study Guide</option>
              <option value="weather">Weather</option>
              <option value="regulations">Regulations</option>
              <option value="safety">Safety</option>
              <option value="operations">Operations</option>
            </select>
          </div>
        )}

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Message */}
        {message && (
          <div className={`p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full py-2 px-4 rounded-md font-semibold ${
            !file || uploading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
    </div>
  )
}