#!/bin/bash

# Enable strict error handling: exit on error, undefined variables, and pipe failures
set -euo pipefail

# InternSetu Local Development & Deployment Script

echo "🇮🇳 InternSetu - Government Internships Made Simple"
echo "================================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
echo "Checking dependencies..."

if ! command_exists node; then 
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

if ! command_exists pnpm; then 
    echo "❌ pnpm is not installed. Installing pnpm..."
    if ! npm install -g pnpm; then
        echo "❌ Failed to install pnpm globally. Please check your npm permissions or install manually."
        exit 1
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
if ! pnpm install; then
    echo "❌ Failed to install dependencies. Please check the error above and try again."
    exit 1
fi

# Environment setup
if [ ! -f .env ]; then
    echo "⚙️ Setting up environment..."
    cp .env.example .env
    echo "✅ Created .env file. Please add your API keys if needed."
fi

# Build check
echo "🔨 Building project..."
if pnpm build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check errors above."
    exit 1
fi

# Start development server
echo "🚀 Starting development server..."
echo "📱 InternSetu will be available at: http://localhost:3001"
echo ""
echo "Features to test:"
echo "✅ Government homepage with ministry categories"
echo "✅ Complete application flow with file upload"
echo "✅ Success page with animations"  
echo "✅ Internship exploration and filtering"
echo "✅ User dashboard and tracking"
echo "✅ Mobile-responsive design"
echo ""
echo "Press Ctrl+C to stop the server"

pnpm dev