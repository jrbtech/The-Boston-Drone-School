#!/usr/bin/env node

const { Command } = require('commander');
const Anthropic = require('@anthropic-ai/sdk');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const program = new Command();

// Initialize Anthropic client
let anthropic;
try {
  anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
} catch (error) {
  console.error('❌ Error: ANTHROPIC_API_KEY not set in environment variables');
  console.error('Please set your API key: export ANTHROPIC_API_KEY=your_key_here');
  process.exit(1);
}

program
  .name('bds-claude')
  .description('Boston Drone School Claude AI Assistant')
  .version('1.0.0');

// Interactive chat command
program
  .command('chat')
  .description('Start an interactive chat session with Claude')
  .option('-s, --system <message>', 'System message to set context')
  .action(async (options) => {
    console.log('🤖 Boston Drone School AI Assistant');
    console.log('Type "exit" to quit, "clear" to clear history\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const systemMessage = options.system || 
      'You are an AI assistant for the Boston Drone School. Help with drone education, safety, regulations, programming, and course development.';

    let conversationHistory = [];

    const chat = async () => {
      rl.question('You: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
          rl.close();
          return;
        }

        if (input.toLowerCase() === 'clear') {
          conversationHistory = [];
          console.log('🧹 Conversation history cleared\n');
          chat();
          return;
        }

        try {
          conversationHistory.push({ role: 'user', content: input });

          const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            system: systemMessage,
            messages: conversationHistory,
          });

          const assistantMessage = response.content[0].text;
          conversationHistory.push({ role: 'assistant', content: assistantMessage });

          console.log(`\n🤖 Claude: ${assistantMessage}\n`);
        } catch (error) {
          console.error('❌ Error:', error.message);
        }

        chat();
      });
    };

    chat();
  });

// Code analysis command
program
  .command('analyze <file>')
  .description('Analyze a code file with Claude')
  .option('-l, --language <lang>', 'Programming language (auto-detected if not specified)')
  .action(async (file, options) => {
    try {
      if (!fs.existsSync(file)) {
        console.error(`❌ File not found: ${file}`);
        return;
      }

      const code = fs.readFileSync(file, 'utf8');
      const ext = path.extname(file);
      const language = options.language || getLanguageFromExtension(ext);

      console.log(`🔍 Analyzing ${file}...`);

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        system: 'You are a senior software engineer reviewing code for the Boston Drone School project. Provide constructive feedback on code quality, security, performance, and drone-specific best practices.',
        messages: [{
          role: 'user',
          content: `Please analyze this ${language} code file (${file}):\n\n${code}`
        }]
      });

      console.log(`\n📊 Analysis Results:\n${response.content[0].text}\n`);
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  });

// Generate course content command
program
  .command('generate-course')
  .description('Generate drone course content')
  .requiredOption('-t, --topic <topic>', 'Course topic')
  .requiredOption('-l, --level <level>', 'Course level (beginner|intermediate|advanced)')
  .option('-o, --output <file>', 'Output file (optional)')
  .action(async (options) => {
    try {
      console.log(`📚 Generating ${options.level} course content for: ${options.topic}`);

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 3000,
        system: 'You are an expert drone instructor creating educational content for the Boston Drone School. Generate comprehensive, accurate, and engaging course material.',
        messages: [{
          role: 'user',
          content: `Create ${options.level} level course content about: ${options.topic}. Include learning objectives, key concepts, safety considerations, and practical exercises.`
        }]
      });

      const content = response.content[0].text;

      if (options.output) {
        fs.writeFileSync(options.output, content);
        console.log(`✅ Course content saved to: ${options.output}`);
      } else {
        console.log(`\n📖 Generated Course Content:\n${content}\n`);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  });

// Safety check command
program
  .command('safety-check <content>')
  .description('Check content for drone safety compliance')
  .action(async (content) => {
    try {
      console.log('🛡️  Performing safety compliance check...');

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        system: 'You are a drone safety expert and regulatory compliance specialist. Analyze content for FAA regulations, safety protocols, and best practices.',
        messages: [{
          role: 'user',
          content: `Please review this drone-related content for safety compliance and regulations: ${content}`
        }]
      });

      console.log(`\n🛡️  Safety Analysis:\n${response.content[0].text}\n`);
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  });

// Helper function to detect language from file extension
function getLanguageFromExtension(ext) {
  const languageMap = {
    '.js': 'JavaScript',
    '.ts': 'TypeScript',
    '.rs': 'Rust',
    '.py': 'Python',
    '.cpp': 'C++',
    '.c': 'C',
    '.java': 'Java',
    '.go': 'Go',
    '.php': 'PHP',
    '.rb': 'Ruby',
    '.cs': 'C#',
    '.swift': 'Swift',
    '.kt': 'Kotlin',
    '.dart': 'Dart',
  };
  return languageMap[ext] || 'Unknown';
}

program.parse();