import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

// Course interfaces
interface Course {
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

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  materials: string[];
  quiz?: Quiz;
}

interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

// Mock data for development
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'FAA Part 107 Certification Prep',
    description: 'Complete preparation for the FAA Remote Pilot Certificate exam covering regulations, airspace, weather, and safety protocols.',
    instructor: 'John Smith, Certified Flight Instructor',
    duration: '8 weeks',
    level: 'beginner',
    price: 299,
    category: 'Certification',
    thumbnailUrl: '/courses/part107.jpg',
    videoUrl: '/videos/part107-intro.mp4',
    materials: ['Study Guide PDF', 'Practice Exams', 'Regulation Handbook'],
    prerequisites: [],
    learningObjectives: [
      'Pass the FAA Part 107 exam',
      'Understand drone regulations',
      'Master airspace classifications',
      'Apply weather knowledge to flight operations'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Commercial Drone Photography',
    description: 'Master aerial photography techniques, equipment setup, and post-processing for commercial real estate and marketing applications.',
    instructor: 'Sarah Johnson, Professional Photographer',
    duration: '6 weeks',
    level: 'intermediate',
    price: 399,
    category: 'Photography',
    thumbnailUrl: '/courses/photography.jpg',
    videoUrl: '/videos/photography-intro.mp4',
    materials: ['Camera Settings Guide', 'Editing Software', 'Portfolio Templates'],
    prerequisites: ['Basic drone operation', 'FAA Part 107 certificate'],
    learningObjectives: [
      'Execute professional aerial photography shoots',
      'Master camera settings and composition',
      'Process and edit aerial imagery',
      'Build a commercial photography portfolio'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Advanced Mapping & Surveying',
    description: 'Learn photogrammetry, GIS integration, and precision mapping techniques for construction and land surveying applications.',
    instructor: 'Dr. Michael Chen, Surveying Engineer',
    duration: '10 weeks',
    level: 'advanced',
    price: 599,
    category: 'Surveying',
    thumbnailUrl: '/courses/mapping.jpg',
    videoUrl: '/videos/mapping-intro.mp4',
    materials: ['Mapping Software License', 'GIS Tools', 'Survey Equipment Guide'],
    prerequisites: ['Drone piloting experience', 'Basic GIS knowledge'],
    learningObjectives: [
      'Create accurate orthomosaic maps',
      'Perform volumetric calculations',
      'Integrate with GIS systems',
      'Deliver professional survey reports'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// GET /api/courses - Get all courses
router.get('/', (req: Request, res: Response) => {
  try {
    const { category, level, instructor } = req.query;
    let filteredCourses = mockCourses;

    // Apply filters
    if (category) {
      filteredCourses = filteredCourses.filter(course => 
        course.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    if (level) {
      filteredCourses = filteredCourses.filter(course => 
        course.level === level
      );
    }

    if (instructor) {
      filteredCourses = filteredCourses.filter(course => 
        course.instructor.toLowerCase().includes((instructor as string).toLowerCase())
      );
    }

    res.json({
      success: true,
      courses: filteredCourses,
      total: filteredCourses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET /api/courses/:id - Get single course
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = mockCourses.find(c => c.id === id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// POST /api/courses - Create new course (admin only)
router.post('/', (req: Request, res: Response) => {
  try {
    const courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    
    const newCourse: Course = {
      ...courseData,
      id: (mockCourses.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockCourses.push(newCourse);

    res.status(201).json({
      success: true,
      course: newCourse,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// PUT /api/courses/:id - Update course (admin only)
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const courseIndex = mockCourses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }

    mockCourses[courseIndex] = {
      ...mockCourses[courseIndex],
      ...req.body,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      course: mockCourses[courseIndex],
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// DELETE /api/courses/:id - Delete course (admin only)
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const courseIndex = mockCourses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const deletedCourse = mockCourses.splice(courseIndex, 1)[0];

    res.json({
      success: true,
      course: deletedCourse,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// GET /api/courses/:id/lessons - Get course lessons
router.get('/:id/lessons', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = mockCourses.find(c => c.id === id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Mock lessons data
    const mockLessons: Lesson[] = [
      {
        id: '1',
        courseId: id,
        title: 'Introduction to Drone Regulations',
        description: 'Overview of FAA Part 107 and regulatory framework',
        videoUrl: '/videos/lesson1.mp4',
        duration: 1800, // 30 minutes
        order: 1,
        materials: ['Regulation Summary PDF', 'Key Points Checklist']
      },
      {
        id: '2',
        courseId: id,
        title: 'Airspace Classifications',
        description: 'Understanding controlled and uncontrolled airspace',
        videoUrl: '/videos/lesson2.mp4',
        duration: 2400, // 40 minutes
        order: 2,
        materials: ['Airspace Chart', 'Practice Scenarios']
      }
    ];

    res.json({
      success: true,
      lessons: mockLessons,
      total: mockLessons.length
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// GET /api/courses/search - Search courses
router.get('/search/:query', (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const searchTerm = query.toLowerCase();

    const searchResults = mockCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm)
    );

    res.json({
      success: true,
      courses: searchResults,
      total: searchResults.length,
      query: searchTerm
    });
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: 'Failed to search courses' });
  }
});

export default router;