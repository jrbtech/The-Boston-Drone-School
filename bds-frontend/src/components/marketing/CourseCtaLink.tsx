'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api, Course } from '@/lib/api'

type CourseCtaLinkProps = {
  courseTitle: string
  children: React.ReactNode
  className?: string
  fallbackHref?: string
}

export function CourseCtaLink({ courseTitle, children, className, fallbackHref = '/courses' }: CourseCtaLinkProps) {
  const [href, setHref] = useState<string>(fallbackHref)

  useEffect(() => {
    let isMounted = true

    const lookupCourse = async () => {
      try {
        const response = await api.getCourses()
        const match = (response.courses as Course[] | undefined)?.find(
          (course) => course.title.toLowerCase() === courseTitle.toLowerCase()
        )
        if (match && isMounted) {
          setHref(`/checkout/${match.id}`)
        }
      } catch (error) {
        console.warn(`Unable to resolve course link for ${courseTitle}:`, error)
      }
    }

    lookupCourse()

    return () => {
      isMounted = false
    }
  }, [courseTitle, fallbackHref])

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export default CourseCtaLink
