import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // This is the default and can be omitted
});

// Example function to chat with Claude
export async function chatWithClaude(message: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0,
      system: 'You are a helpful assistant for the Boston Drone School.',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    });

    // Extract text from the response
    const textContent = response.content.find(content => content.type === 'text');
    return textContent?.text || 'No response received';
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    throw error;
  }
}

// Example function to analyze drone-related content
export async function analyzeDroneContent(content: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0,
      system: `You are an expert drone instructor and safety analyst. 
                Analyze the provided content for drone-related information, 
                safety concerns, best practices, and educational value.`,
      messages: [
        {
          role: 'user',
          content: `Please analyze this drone-related content: ${content}`
        }
      ]
    });

    const textContent = response.content.find(content => content.type === 'text');
    return textContent?.text || 'No analysis available';
  } catch (error) {
    console.error('Error analyzing content:', error);
    throw error;
  }
}

// Example function for course content generation
export async function generateCourseContent(topic: string, level: 'beginner' | 'intermediate' | 'advanced'): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 3000,
      temperature: 0.3,
      system: `You are an expert drone instructor creating educational content for the Boston Drone School. 
                Generate comprehensive, accurate, and engaging course material.`,
      messages: [
        {
          role: 'user',
          content: `Create ${level} level course content about: ${topic}. 
                   Include learning objectives, key concepts, safety considerations, 
                   and practical exercises.`
        }
      ]
    });

    const textContent = response.content.find(content => content.type === 'text');
    return textContent?.text || 'No content generated';
  } catch (error) {
    console.error('Error generating course content:', error);
    throw error;
  }
}

// Personalized course recommendations
export async function getPersonalizedRecommendations(
  userProfile: {
    experience: string;
    interests: string[];
    completedCourses: string[];
    careerGoals: string;
  }
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0.3,
      system: `You are an expert learning advisor for the Boston Drone School. 
                Analyze user profiles and recommend personalized learning paths.`,
      messages: [
        {
          role: 'user',
          content: `Based on this user profile, recommend personalized courses and learning paths:
                   Experience: ${userProfile.experience}
                   Interests: ${userProfile.interests.join(', ')}
                   Completed Courses: ${userProfile.completedCourses.join(', ')}
                   Career Goals: ${userProfile.careerGoals}
                   
                   Provide specific course recommendations with reasoning.`
        }
      ]
    });

    const textContent = response.content.find(content => content.type === 'text');
    return textContent?.text || 'No recommendations available';
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}

// Adaptive learning path suggestions
export async function generateAdaptiveLearningPath(
  studentProgress: {
    courseId: string;
    completedLessons: string[];
    strugglingAreas: string[];
    strengths: string[];
    timeSpent: number;
  }
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0.3,
      system: `You are an AI learning coach for the Boston Drone School. 
                Analyze student progress and suggest adaptive learning strategies.`,
      messages: [
        {
          role: 'user',
          content: `Analyze this student's progress and suggest adaptive learning strategies:
                   Course ID: ${studentProgress.courseId}
                   Completed Lessons: ${studentProgress.completedLessons.join(', ')}
                   Struggling Areas: ${studentProgress.strugglingAreas.join(', ')}
                   Strengths: ${studentProgress.strengths.join(', ')}
                   Time Spent: ${studentProgress.timeSpent} minutes
                   
                   Provide personalized study recommendations and next steps.`
        }
      ]
    });

    const textContent = response.content.find(content => content.type === 'text');
    return textContent?.text || 'No learning path generated';
  } catch (error) {
    console.error('Error generating learning path:', error);
    throw error;
  }
}

// AI-powered Q&A assistance
export async function provideStudentAssistance(
  question: string,
  courseContext: string,
  studentLevel: string
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      temperature: 0.2,
      system: `You are a knowledgeable teaching assistant for the Boston Drone School. 
                Provide clear, educational answers that help students learn effectively.
                Always consider safety, FAA regulations, and best practices in your responses.`,
      messages: [
        {
          role: 'user',
          content: `Student Question: ${question}
                   Course Context: ${courseContext}
                   Student Level: ${studentLevel}
                   
                   Provide a helpful, educational response that guides the student's learning.`
        }
      ]
    });

    const textContent = response.content.find(content => content.type === 'text');
    return textContent?.text || 'Unable to provide assistance at this time';
  } catch (error) {
    console.error('Error providing student assistance:', error);
    throw error;
  }
}

// Generate quiz questions
export async function generateQuizQuestions(
  lessonContent: string,
  difficulty: 'easy' | 'medium' | 'hard',
  questionCount: number = 5
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0.4,
      system: `You are an expert quiz creator for the Boston Drone School. 
                Generate high-quality quiz questions that test comprehension and application.`,
      messages: [
        {
          role: 'user',
          content: `Create ${questionCount} ${difficulty} quiz questions based on this lesson content:
                   
                   ${lessonContent}
                   
                   Format as JSON with question, options (for multiple choice), correct answer, and explanation.`
        }
      ]
    });

    const textContent = response.content.find(content => content.type === 'text');
    return textContent?.text || 'No quiz questions generated';
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw error;
  }
}