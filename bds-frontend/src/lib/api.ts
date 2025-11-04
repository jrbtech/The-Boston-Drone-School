// API client for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  category: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  materials: string[];
  prerequisites: string[];
  learningObjectives: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  completionDate?: Date;
  progress: number;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  certificateUrl?: string;
  lastAccessedAt: Date;
}

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
  async register(email: string, password: string, name: string) {
    return this.fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
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
    return this.fetch(`/api/courses?${params}`);
  }

  async getCourse(id: string) {
    return this.fetch(`/api/courses/${id}`);
  }

  async searchCourses(query: string) {
    return this.fetch(`/api/courses/search/${query}`);
  }

  async getCourseLessons(courseId: string) {
    return this.fetch(`/api/courses/${courseId}/lessons`);
  }

  // Enrollment
  async enrollCourse(userId: string, courseId: string) {
    return this.fetch('/api/enrollment/enroll', {
      method: 'POST',
      body: JSON.stringify({ userId, courseId }),
    });
  }

  async getUserEnrollments(userId: string, status?: string) {
    const params = status ? `?status=${status}` : '';
    return this.fetch(`/api/enrollment/user/${userId}${params}`);
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

  // AI Features
  async chatWithAI(message: string) {
    return this.fetch('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getCourseRecommendations(userProfile: any) {
    return this.fetch('/api/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify({ userProfile }),
    });
  }

  async generateQuiz(lessonContent: string, difficulty: string, questionCount: number) {
    return this.fetch('/api/ai/generate-quiz', {
      method: 'POST',
      body: JSON.stringify({ lessonContent, difficulty, questionCount }),
    });
  }

  async getStudentAssistance(question: string, courseContext: string, studentLevel: string) {
    return this.fetch('/api/ai/assistance', {
      method: 'POST',
      body: JSON.stringify({ question, courseContext, studentLevel }),
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
