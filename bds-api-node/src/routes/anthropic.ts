import { Router } from 'express';
import { 
  chatWithClaude, 
  analyzeDroneContent, 
  generateCourseContent,
  getPersonalizedRecommendations,
  generateAdaptiveLearningPath,
  provideStudentAssistance,
  generateQuizQuestions
} from '../anthropic-client';

const router = Router();

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await chatWithClaude(message);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

// Content analysis endpoint
router.post('/analyze', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const analysis = await analyzeDroneContent(content);
    res.json({ analysis });
  } catch (error) {
    console.error('Error in analyze endpoint:', error);
    res.status(500).json({ error: 'Failed to analyze content' });
  }
});

// Course content generation endpoint
router.post('/generate-course', async (req, res) => {
  try {
    const { topic, level } = req.body;
    
    if (!topic || !level) {
      return res.status(400).json({ error: 'Topic and level are required' });
    }

    if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
      return res.status(400).json({ error: 'Level must be beginner, intermediate, or advanced' });
    }

    const courseContent = await generateCourseContent(topic, level);
    res.json({ courseContent });
  } catch (error) {
    console.error('Error in generate-course endpoint:', error);
    res.status(500).json({ error: 'Failed to generate course content' });
  }
});

// Personalized recommendations endpoint
router.post('/recommendations', async (req, res) => {
  try {
    const { userProfile } = req.body;
    
    if (!userProfile || !userProfile.experience || !userProfile.interests) {
      return res.status(400).json({ error: 'User profile with experience and interests is required' });
    }

    const recommendations = await getPersonalizedRecommendations(userProfile);
    res.json({ recommendations });
  } catch (error) {
    console.error('Error in recommendations endpoint:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Adaptive learning path endpoint
router.post('/learning-path', async (req, res) => {
  try {
    const { studentProgress } = req.body;
    
    if (!studentProgress || !studentProgress.courseId) {
      return res.status(400).json({ error: 'Student progress data with course ID is required' });
    }

    const learningPath = await generateAdaptiveLearningPath(studentProgress);
    res.json({ learningPath });
  } catch (error) {
    console.error('Error in learning-path endpoint:', error);
    res.status(500).json({ error: 'Failed to generate learning path' });
  }
});

// Student assistance endpoint
router.post('/assistance', async (req, res) => {
  try {
    const { question, courseContext, studentLevel } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const assistance = await provideStudentAssistance(
      question, 
      courseContext || 'General drone education', 
      studentLevel || 'beginner'
    );
    res.json({ assistance });
  } catch (error) {
    console.error('Error in assistance endpoint:', error);
    res.status(500).json({ error: 'Failed to provide assistance' });
  }
});

// Quiz generation endpoint
router.post('/generate-quiz', async (req, res) => {
  try {
    const { lessonContent, difficulty, questionCount } = req.body;
    
    if (!lessonContent) {
      return res.status(400).json({ error: 'Lesson content is required' });
    }

    const quiz = await generateQuizQuestions(
      lessonContent, 
      difficulty || 'medium', 
      questionCount || 5
    );
    res.json({ quiz });
  } catch (error) {
    console.error('Error in generate-quiz endpoint:', error);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

export default router;