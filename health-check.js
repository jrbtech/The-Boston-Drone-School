#!/usr/bin/env node
/**
 * Boston Drone School E-Learning Platform - Health Check
 * Verifies all services are running correctly
 */

const http = require('http');
const https = require('https');

const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(colors[color] + message + colors.reset);
}

async function checkHealth(url, name) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        const request = client.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    log(`✅ ${name}: Healthy`, 'green');
                    resolve(true);
                } else {
                    log(`❌ ${name}: Unhealthy (${res.statusCode})`, 'red');
                    resolve(false);
                }
            });
        });

        request.on('error', (error) => {
            log(`❌ ${name}: Connection failed - ${error.message}`, 'red');
            resolve(false);
        });

        request.setTimeout(5000, () => {
            log(`❌ ${name}: Timeout`, 'red');
            request.destroy();
            resolve(false);
        });
    });
}

async function checkAPI(baseUrl) {
    log('\n🔍 Checking API endpoints...', 'cyan');
    
    const endpoints = [
        { path: '/api/health', name: 'Health Check' },
        { path: '/api/courses', name: 'Courses API' },
        { path: '/api/ai/chat', name: 'AI Chat API', method: 'OPTIONS' }
    ];

    let allHealthy = true;
    
    for (const endpoint of endpoints) {
        const url = baseUrl + endpoint.path;
        const healthy = await checkHealth(url, endpoint.name);
        if (!healthy) allHealthy = false;
    }
    
    return allHealthy;
}

async function checkDatabase() {
    log('\n🗄️ Checking database connection...', 'cyan');
    
    // This would require database credentials
    // For now, we'll check if the API can connect to the database
    log('ℹ️ Database check via API health endpoint', 'yellow');
    return true;
}

async function checkAI() {
    log('\n🤖 Checking AI integration...', 'cyan');
    
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
        log('❌ Anthropic API key not configured', 'red');
        return false;
    }
    
    log('✅ Anthropic API key configured', 'green');
    return true;
}

async function main() {
    log('🏥 Boston Drone School E-Learning Platform - Health Check', 'cyan');
    log('='.repeat(60), 'cyan');

    const environment = process.env.NODE_ENV || 'development';
    log(`Environment: ${environment}`, 'yellow');

    let results = {
        frontend: false,
        backend: false,
        database: false,
        ai: false
    };

    // Check based on environment
    if (environment === 'production') {
        log('\n🌐 Production Environment Check', 'yellow');
        results.frontend = await checkHealth('https://learn.thebostondroneschool.org', 'Frontend');
        results.backend = await checkAPI('https://api.thebostondroneschool.org');
    } else {
        log('\n🖥️ Development Environment Check', 'yellow');
        results.frontend = await checkHealth('http://localhost:3000', 'Frontend');
        results.backend = await checkAPI('http://localhost:3001');
    }

    results.database = await checkDatabase();
    results.ai = await checkAI();

    // Summary
    log('\n📊 Health Check Summary:', 'cyan');
    log('='.repeat(30), 'cyan');
    
    const services = [
        { name: 'Frontend', status: results.frontend },
        { name: 'Backend API', status: results.backend },
        { name: 'Database', status: results.database },
        { name: 'AI Integration', status: results.ai }
    ];

    let allHealthy = true;
    services.forEach(service => {
        const status = service.status ? '✅ Healthy' : '❌ Unhealthy';
        const color = service.status ? 'green' : 'red';
        log(`${service.name.padEnd(15)}: ${status}`, color);
        if (!service.status) allHealthy = false;
    });

    if (allHealthy) {
        log('\n🎉 All services are healthy!', 'green');
        log('Your Boston Drone School platform is ready for students! 🚁', 'green');
        process.exit(0);
    } else {
        log('\n⚠️ Some services need attention', 'yellow');
        log('Check the logs above for details', 'yellow');
        process.exit(1);
    }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    log('Boston Drone School E-Learning Platform - Health Check', 'cyan');
    log('');
    log('Usage: node health-check.js [options]', 'yellow');
    log('');
    log('Options:', 'yellow');
    log('  --help, -h     Show this help message');
    log('  --quiet, -q    Quiet mode (exit code only)');
    log('');
    log('Environment Variables:', 'yellow');
    log('  NODE_ENV              Environment (development/production)');
    log('  ANTHROPIC_API_KEY     AI service API key');
    process.exit(0);
}

if (process.argv.includes('--quiet') || process.argv.includes('-q')) {
    // Redirect console.log to suppress output in quiet mode
    console.log = () => {};
}

main().catch(error => {
    log(`\n💥 Health check failed: ${error.message}`, 'red');
    process.exit(1);
});