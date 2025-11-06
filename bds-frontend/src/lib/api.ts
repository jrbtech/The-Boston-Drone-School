// API client for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  durationHours?: number
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  category: string
  thumbnailUrl?: string | null
  videoUrl?: string | null
  materials: string[]
  prerequisites: string[]
  learningObjectives: string[]
  createdAt: Date
  updatedAt: Date
  modules?: Lesson[]
}

export interface Lesson {
  id: string
  courseId?: string
  title: string
  description: string
  order: number
  duration: number
  videoUrl?: string | null
  materials: string[]
  contentType: string
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrollmentDate: Date
  completionDate?: Date
  progress: number
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  certificateUrl?: string
  lastAccessedAt?: Date
}

type RawCourse = {
  id: string | number
  title: string
  description?: string | null
  instructor?: string | null
  instructor_name?: string | null
  duration?: string | null
  durationHours?: number | null
  duration_hours?: number | null
  level?: string | null
  price?: number | null
  category?: string | null
  thumbnailUrl?: string | null
  thumbnail_url?: string | null
  videoUrl?: string | null
  video_url?: string | null
  materials?: string[] | null
  prerequisites?: string[] | null
  learningObjectives?: string[] | null
  learning_objectives?: string[] | null
  createdAt?: string | null
  created_at?: string | null
  updatedAt?: string | null
  updated_at?: string | null
  modules?: RawLesson[]
}

type RawLesson = {
  id: string | number
  courseId?: string | number
  course_id?: string | number
  title: string
  description?: string | null
  order?: number | null
  order_index?: number | null
  duration?: number | null
  duration_minutes?: number | null
  videoUrl?: string | null
  contentUrl?: string | null
  content_url?: string | null
  contentType?: string | null
  content_type?: string | null
  materials?: string[] | null
}

const courseContentOverrides: Record<string, Partial<Omit<Course, 'id' | 'title' | 'createdAt' | 'updatedAt' | 'level' | 'price' | 'category'>>> = {
  'FAA Part 107 Certification Prep': {
    learningObjectives: [
      'Interpret FAA Part 107 regulations with confidence during real-world missions.',
      'Evaluate controlled and uncontrolled airspace using LAANC and sectional charts.',
      'Build weather-informed go/no-go mission plans that protect crew and equipment.',
      'Document operational compliance in line with Boston Drone School standards.'
    ],
    prerequisites: [
      'Basic multirotor flight competency or simulator experience.',
      'Government-issued photo identification that meets FAA requirements.',
      'Ability to pass an FAA background check for remote pilots.'
    ],
    materials: [
      'Part 107 quick-reference handbook',
      'Airspace classification briefing deck',
      'Mission risk assessment checklist'
    ],
    videoUrl: null,
    thumbnailUrl: null
  },
  'Commercial Drone Photography': {
    learningObjectives: [
      'Design aerial shot lists tailored for real estate and creative briefs.',
      'Stabilize footage through optimized gimbal settings and flight paths.',
      'Deliver edited media packages using Boston Drone School export presets.'
    ],
    prerequisites: [
      'Comfortable with manual flight modes or tripod mode operations.',
      'Working knowledge of DSLR or mirrorless camera fundamentals.'
    ],
    materials: [
      'Shot composition storyboard templates',
      'RAW to delivery color grading LUTs',
      'Client-ready licensing agreement outline'
    ],
    videoUrl: null,
    thumbnailUrl: null
  },
  'Advanced Mapping & Surveying': {
    learningObjectives: [
      'Execute autonomous survey missions with photogrammetric overlap targets.',
      'Process ortho-mosaics and point clouds inside industry GIS platforms.',
      'Publish deliverables that satisfy municipal and construction standards.'
    ],
    prerequisites: [
      'Completion of FAA Part 107 Certification Prep or equivalent credential.',
      'Laptop capable of running GIS or photogrammetry software.',
      'Familiarity with coordinate systems and basic surveying vocabulary.'
    ],
    materials: [
      'Ground control point logging sheets',
      'Sample deliverable package with QA checklist',
      'Photogrammetry processing workflow chart'
    ],
    videoUrl: null,
    thumbnailUrl: null
  }
}

const fallbackObjectives = [
  'Apply Boston Drone School mission planning methodology to live deployments.',
  'Collaborate with instructors and cohort members inside the learning workspace.',
  'Track milestones from enrollment through certification with confidence.'
]

const normalizeStringArray = (value?: string[] | null): string[] => {
  if (!Array.isArray(value)) {
    return []
  }
  return value.filter((item) => typeof item === 'string' && item.trim().length > 0).map((item) => item.trim())
}

const coerceDate = (value?: string | null): Date => (value ? new Date(value) : new Date())

const formatDuration = (duration?: string | null, hours?: number | null): string => {
  if (duration && duration.trim().length > 0) {
    return duration
  }

  if (typeof hours === 'number' && !Number.isNaN(hours) && hours > 0) {
    if (hours < 1) {
      const minutes = Math.round(hours * 60)
      return `${minutes} minutes`
    }
    return `${hours} hour${hours === 1 ? '' : 's'}`
  }

  return 'Self-paced'
}

const normalizeCourse = (raw: RawCourse): Course => {
  const base: Course = {
    id: String(raw.id),
    title: raw.title,
    description: raw.description?.trim() || 'Detailed syllabus and mission-ready modules from Boston Drone School.',
    instructor: raw.instructor?.trim() || raw.instructor_name?.trim() || 'Boston Drone School Faculty',
    duration: formatDuration(raw.duration, raw.durationHours ?? raw.duration_hours ?? null),
    durationHours: raw.durationHours ?? raw.duration_hours ?? undefined,
    level: (raw.level ?? 'beginner') as Course['level'],
    price: raw.price ?? 0,
    category: raw.category ?? 'General',
    thumbnailUrl: raw.thumbnailUrl ?? raw.thumbnail_url ?? null,
    videoUrl: raw.videoUrl ?? raw.video_url ?? null,
    materials: normalizeStringArray(raw.materials),
    prerequisites: normalizeStringArray(raw.prerequisites),
    learningObjectives: normalizeStringArray(raw.learningObjectives ?? raw.learning_objectives),
    createdAt: coerceDate(raw.createdAt ?? raw.created_at ?? null),
    updatedAt: coerceDate(raw.updatedAt ?? raw.updated_at ?? null)
  }

  const overrides = courseContentOverrides[base.title]
  if (overrides) {
    base.learningObjectives = overrides.learningObjectives ?? (base.learningObjectives.length ? base.learningObjectives : fallbackObjectives)
    base.prerequisites = overrides.prerequisites ?? base.prerequisites
    base.materials = overrides.materials ?? base.materials
    base.videoUrl = overrides.videoUrl ?? base.videoUrl ?? null
    base.thumbnailUrl = overrides.thumbnailUrl ?? base.thumbnailUrl ?? null
  } else if (!base.learningObjectives.length) {
    base.learningObjectives = fallbackObjectives
  }

  return base
}

const normalizeLesson = (raw: RawLesson): Lesson => ({
  id: String(raw.id),
  courseId: raw.courseId ? String(raw.courseId) : raw.course_id ? String(raw.course_id) : undefined,
  title: raw.title,
  description: raw.description?.trim() || '',
  order: (raw.order ?? raw.order_index ?? 0) || 0,
  duration: raw.duration ?? raw.duration_minutes ?? 0,
  videoUrl: raw.videoUrl ?? raw.contentUrl ?? raw.content_url ?? null,
  materials: normalizeStringArray(raw.materials),
  contentType: raw.contentType ?? raw.content_type ?? 'video'
})

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch(endpoint: string, options?: RequestInit) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication
  async register(email: string, password: string, firstName: string, lastName: string) {
    const fullName = `${firstName} ${lastName}`.replace(/\s+/g, ' ').trim();

    return this.fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName, name: fullName }),
    });
  }

  async login(email: string, password: string) {
    return this.fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getCurrentUser() {
    return this.fetch('/api/auth/me');
  }

  // Courses
  async getCourses(filters?: { category?: string; level?: string }) {
    const params = new URLSearchParams(filters as any);
    const response = await this.fetch(`/api/courses?${params}`);
    const courses = Array.isArray(response?.courses) ? response.courses.map((course: RawCourse) => normalizeCourse(course)) : [];

    return {
      ...response,
      courses,
      total: courses.length,
    };
  }

  async getCourse(id: string) {
    const response = await this.fetch(`/api/courses/${id}`);
    const rawCourse = response?.course as RawCourse | undefined;
    const course = rawCourse ? normalizeCourse(rawCourse) : undefined;
    const modules = Array.isArray(rawCourse?.modules)
      ? rawCourse!.modules!.map((module: RawLesson) => normalizeLesson(module))
      : [];

    if (course) {
      (course as Course & { modules?: Lesson[] }).modules = modules;
    }

    return {
      ...response,
      course,
      modules,
    };
  }

  async searchCourses(query: string) {
    const response = await this.fetch(`/api/courses/search/${query}`);
    const courses = Array.isArray(response?.courses) ? response.courses.map((course: RawCourse) => normalizeCourse(course)) : [];

    return {
      ...response,
      courses,
      total: courses.length,
    };
  }

  async getCourseLessons(courseId: string) {
    const response = await this.fetch(`/api/courses/${courseId}/lessons`);
    const lessons = Array.isArray(response?.lessons) ? response.lessons.map((lesson: RawLesson) => normalizeLesson(lesson)) : [];

    return {
      ...response,
      lessons,
      total: lessons.length,
    };
  }

  // Enrollment
  async enrollCourse(courseId: string) {
    return this.fetch('/api/enrollment/enroll', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  async getUserEnrollments(status?: string) {
    const params = status ? `?status=${status}` : '';
    return this.fetch(`/api/enrollment/user${params}`);
  }

  async getEnrollment(id: string) {
    return this.fetch(`/api/enrollment/${id}`);
  }

  async updateProgress(enrollmentId: string, data: {
    lessonId: string;
    progress: number;
    timeSpent?: number;
    completed: boolean;
  }) {
    return this.fetch(`/api/enrollment/${enrollmentId}/progress`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getDetailedProgress(enrollmentId: string) {
    return this.fetch(`/api/enrollment/${enrollmentId}/progress`);
  }

  async generateCertificate(enrollmentId: string) {
    return this.fetch(`/api/enrollment/${enrollmentId}/certificate`, {
      method: 'POST',
    });
  }

  async cancelEnrollment(enrollmentId: string) {
    return this.fetch(`/api/enrollment/${enrollmentId}`, {
      method: 'DELETE',
    });
  }

  // Payments
  async createPaymentIntent(courseId: string) {
    return this.fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  async confirmEnrollment(courseId: string) {
    return this.fetch('/api/payments/confirm-enrollment', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  // Health check
  async healthCheck() {
    return this.fetch('/api/health');
  }
}

export const api = new ApiClient(API_BASE_URL);
