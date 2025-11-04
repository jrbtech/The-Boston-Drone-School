import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

// Enrollment interfaces
interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  completionDate?: Date;
  progress: number; // 0-100
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  certificateUrl?: string;
  lastAccessedAt: Date;
}

interface UserProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  progress: number; // 0-100
  timeSpent: number; // seconds
  completed: boolean;
  lastAccessedAt: Date;
}

interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  studentName: string;
  courseName: string;
  completionDate: Date;
  certificateUrl: string;
  verificationCode: string;
}

// Mock data
const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    userId: 'user123',
    courseId: '1',
    enrollmentDate: new Date('2025-01-01'),
    progress: 75,
    status: 'active',
    lastAccessedAt: new Date()
  },
  {
    id: '2',
    userId: 'user123',
    courseId: '2',
    enrollmentDate: new Date('2025-01-15'),
    completionDate: new Date('2025-02-15'),
    progress: 100,
    status: 'completed',
    certificateUrl: '/certificates/cert_user123_course2.pdf',
    lastAccessedAt: new Date()
  }
];

const mockProgress: UserProgress[] = [
  {
    userId: 'user123',
    courseId: '1',
    lessonId: '1',
    progress: 100,
    timeSpent: 1800,
    completed: true,
    lastAccessedAt: new Date()
  },
  {
    userId: 'user123',
    courseId: '1',
    lessonId: '2',
    progress: 50,
    timeSpent: 900,
    completed: false,
    lastAccessedAt: new Date()
  }
];

// POST /api/enrollment/enroll - Enroll in a course
router.post('/enroll', (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'UserId and courseId are required' });
    }

    // Check if already enrolled
    const existingEnrollment = mockEnrollments.find(
      e => e.userId === userId && e.courseId === courseId
    );

    if (existingEnrollment) {
      return res.status(409).json({ error: 'Already enrolled in this course' });
    }

    const newEnrollment: Enrollment = {
      id: (mockEnrollments.length + 1).toString(),
      userId,
      courseId,
      enrollmentDate: new Date(),
      progress: 0,
      status: 'active',
      lastAccessedAt: new Date()
    };

    mockEnrollments.push(newEnrollment);

    res.status(201).json({
      success: true,
      enrollment: newEnrollment,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
});

// GET /api/enrollment/user/:userId - Get user's enrollments
router.get('/user/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;

    let userEnrollments = mockEnrollments.filter(e => e.userId === userId);

    if (status) {
      userEnrollments = userEnrollments.filter(e => e.status === status);
    }

    res.json({
      success: true,
      enrollments: userEnrollments,
      total: userEnrollments.length
    });
  } catch (error) {
    console.error('Error fetching user enrollments:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// GET /api/enrollment/:id - Get specific enrollment
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enrollment = mockEnrollments.find(e => e.id === id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({
      success: true,
      enrollment
    });
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment' });
  }
});

// PUT /api/enrollment/:id/progress - Update course progress
router.put('/:id/progress', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { lessonId, progress, timeSpent, completed } = req.body;

    const enrollment = mockEnrollments.find(e => e.id === id);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    // Update lesson progress
    const existingProgress = mockProgress.find(
      p => p.userId === enrollment.userId && 
          p.courseId === enrollment.courseId && 
          p.lessonId === lessonId
    );

    if (existingProgress) {
      existingProgress.progress = progress;
      existingProgress.timeSpent += timeSpent || 0;
      existingProgress.completed = completed;
      existingProgress.lastAccessedAt = new Date();
    } else {
      mockProgress.push({
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        lessonId,
        progress,
        timeSpent: timeSpent || 0,
        completed,
        lastAccessedAt: new Date()
      });
    }

    // Calculate overall course progress
    const courseProgress = mockProgress
      .filter(p => p.userId === enrollment.userId && p.courseId === enrollment.courseId)
      .reduce((acc, curr) => acc + curr.progress, 0) / 
      mockProgress.filter(p => p.courseId === enrollment.courseId).length;

    enrollment.progress = Math.round(courseProgress);
    enrollment.lastAccessedAt = new Date();

    // Check if course is completed
    if (enrollment.progress >= 100) {
      enrollment.status = 'completed';
      enrollment.completionDate = new Date();
    }

    res.json({
      success: true,
      enrollment,
      message: 'Progress updated successfully'
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// GET /api/enrollment/:id/progress - Get detailed progress
router.get('/:id/progress', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enrollment = mockEnrollments.find(e => e.id === id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    const lessonProgress = mockProgress.filter(
      p => p.userId === enrollment.userId && p.courseId === enrollment.courseId
    );

    res.json({
      success: true,
      enrollment,
      lessonProgress,
      totalTimeSpent: lessonProgress.reduce((acc, curr) => acc + curr.timeSpent, 0)
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// POST /api/enrollment/:id/certificate - Generate certificate
router.post('/:id/certificate', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enrollment = mockEnrollments.find(e => e.id === id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (enrollment.progress < 100) {
      return res.status(400).json({ error: 'Course must be completed to generate certificate' });
    }

    const verificationCode = `BDS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const certificate: Certificate = {
      id: (Date.now()).toString(),
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      studentName: 'Student Name', // This would come from user data
      courseName: 'Course Name', // This would come from course data
      completionDate: enrollment.completionDate || new Date(),
      certificateUrl: `/certificates/${verificationCode}.pdf`,
      verificationCode
    };

    enrollment.certificateUrl = certificate.certificateUrl;

    res.json({
      success: true,
      certificate,
      message: 'Certificate generated successfully'
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ error: 'Failed to generate certificate' });
  }
});

// DELETE /api/enrollment/:id - Cancel enrollment
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enrollmentIndex = mockEnrollments.findIndex(e => e.id === id);

    if (enrollmentIndex === -1) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    mockEnrollments[enrollmentIndex].status = 'cancelled';

    res.json({
      success: true,
      enrollment: mockEnrollments[enrollmentIndex],
      message: 'Enrollment cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling enrollment:', error);
    res.status(500).json({ error: 'Failed to cancel enrollment' });
  }
});

// GET /api/enrollment/analytics/overview - Get enrollment analytics
router.get('/analytics/overview', (req: Request, res: Response) => {
  try {
    const totalEnrollments = mockEnrollments.length;
    const activeEnrollments = mockEnrollments.filter(e => e.status === 'active').length;
    const completedEnrollments = mockEnrollments.filter(e => e.status === 'completed').length;
    const averageProgress = mockEnrollments.reduce((acc, curr) => acc + curr.progress, 0) / totalEnrollments;

    const analytics = {
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      completionRate: (completedEnrollments / totalEnrollments) * 100,
      averageProgress: Math.round(averageProgress),
      recentEnrollments: mockEnrollments
        .sort((a, b) => b.enrollmentDate.getTime() - a.enrollmentDate.getTime())
        .slice(0, 10)
    };

    res.json({
      success: true,
      analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;