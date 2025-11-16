import React from 'react'

interface FormattedContentProps {
  content: string
}

export default function FormattedContent({ content }: FormattedContentProps) {
  // Convert markdown-style formatting to HTML
  const formatContent = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let listItems: string[] = []
    let listType: 'ul' | 'ol' | null = null

    const flushList = () => {
      if (listItems.length > 0) {
        const ListTag = listType === 'ol' ? 'ol' : 'ul'
        elements.push(
          <ListTag key={`list-${elements.length}`} className={listType === 'ul' ? 'list-disc list-inside space-y-2 my-4' : 'list-decimal list-inside space-y-2 my-4'}>
            {listItems.map((item, i) => (
              <li key={i} className="text-gray-300" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
            ))}
          </ListTag>
        )
        listItems = []
        listType = null
      }
    }

    lines.forEach((line, index) => {
      // Check for bullet points
      if (line.trim().match(/^[•*-]\s+/)) {
        const item = line.trim().replace(/^[•*-]\s+/, '')
        if (listType !== 'ul') {
          flushList()
          listType = 'ul'
        }
        listItems.push(item)
      }
      // Check for numbered lists
      else if (line.trim().match(/^\d+\.\s+/)) {
        const item = line.trim().replace(/^\d+\.\s+/, '')
        if (listType !== 'ol') {
          flushList()
          listType = 'ol'
        }
        listItems.push(item)
      }
      // Regular paragraph
      else {
        flushList()

        if (line.trim() === '') {
          // Empty line - add spacing
          if (elements.length > 0) {
            elements.push(<div key={`space-${index}`} className="h-4" />)
          }
        } else {
          elements.push(
            <p
              key={index}
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
            />
          )
        }
      }
    })

    flushList()
    return elements
  }

  const formatInlineMarkdown = (text: string) => {
    return text
      // Bold: **text** or __text__
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/__(.+?)__/g, '<strong class="font-bold text-white">$1</strong>')
      // Italic: *text* or _text_ (but not at start of line, that's a bullet)
      .replace(/(?<!\s)\*([^*]+?)\*(?!\*)/g, '<em class="italic">$1</em>')
      .replace(/_([^_]+?)_/g, '<em class="italic">$1</em>')
      // Code: `code`
      .replace(/`(.+?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
  }

  return <div className="space-y-3">{formatContent(content)}</div>
}
