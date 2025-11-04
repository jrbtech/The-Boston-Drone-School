#!/usr/bin/env node

const { Anthropic } = require('@anthropic-ai/sdk');
const readline = require('readline');

// Initialize Anthropic client with your API key
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'your-api-key-here'
});

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚁 Boston Drone School - Claude AI Assistant');
console.log('===========================================');
console.log('Ready to help with drone training and education!');
console.log('Type "help" for commands or "exit" to quit\n');

async function chatWithClaude(message) {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: message
      }]
    });

    return response.content[0].text;
  } catch (error) {
    if (error.status === 401) {
      return '❌ Authentication error: Please check your API key';
    } else if (error.status === 429) {
      return '⏳ Rate limit exceeded. Please wait a moment and try again';
    } else {
      return `❌ Error: ${error.message}`;
    }
  }
}

function showHelp() {
  console.log('\n📚 Available Commands:');
  console.log('  help     - Show this help message');
  console.log('  clear    - Clear the screen');
  console.log('  exit     - Exit the CLI');
  console.log('  quit     - Exit the CLI');
  console.log('\n🎯 Example Prompts:');
  console.log('  "What are the basics of drone flight?"');
  console.log('  "Create a safety checklist for drone operations"');
  console.log('  "Explain FAA Part 107 regulations"');
  console.log('');
}

function promptUser() {
  rl.question('You: ', async (input) => {
    const userInput = input.trim();
    
    if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
      console.log('\n🚁 Thanks for using Boston Drone School AI Assistant!');
      console.log('Visit us at: https://thebostondroneschool.org');
      rl.close();
      return;
    }
    
    if (userInput.toLowerCase() === 'help') {
      showHelp();
      promptUser();
      return;
    }
    
    if (userInput.toLowerCase() === 'clear') {
      console.clear();
      console.log('🚁 Boston Drone School - Claude AI Assistant');
      console.log('===========================================');
      promptUser();
      return;
    }
    
    if (userInput === '') {
      promptUser();
      return;
    }
    
    console.log('\n🤖 Claude: ');
    const response = await chatWithClaude(userInput);
    console.log(response);
    console.log('');
    
    promptUser();
  });
}

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n🚁 Thanks for using Boston Drone School AI Assistant!');
  process.exit(0);
});

// Start the CLI
promptUser();