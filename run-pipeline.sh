#!/bin/bash

# Local CI/CD Pipeline Runner
# This script replicates the GitHub Actions workflow locally

set -e  # Exit on any error

echo "Starting Local CI/CD Pipeline"
echo "=================================="

# Function to print output
print_step() {
    echo "[OK] $1"
}

print_error() {
    echo "[ERROR] $1"
}

print_info() {
    echo "[INFO] $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 20.x"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js version 20.x or higher is required. Current version: $(node -v)"
    exit 1
fi

print_step "Node.js version: $(node -v)"

# Check if Docker is installed (for Docker build step)
DOCKER_AVAILABLE=false
if command -v docker &> /dev/null; then
    DOCKER_AVAILABLE=true
    print_step "Docker is available"
else
    print_info "Docker is not available. Docker build step will be skipped."
fi

echo ""
echo " Step 1: Installing dependencies"
echo "-----------------------------------"
if [ ! -d "node_modules" ]; then
    npm ci
    print_step "Dependencies installed"
else
    print_info "node_modules exists, skipping npm ci (use 'npm ci' manually to reinstall)"
fi

echo ""
echo " Step 2: Running unit tests"
echo "-----------------------------"
if npm run test:ci 2>/dev/null || npm run test -- --watch=false --browsers=ChromeHeadless; then
    print_step "All tests passed"
else
    print_error "Tests failed"
    exit 1
fi

echo ""
echo " Step 3: Building application"
echo "-------------------------------"
npm run build -- --configuration=production
if [ -d "dist/hr-mini-system" ]; then
    print_step "Application built successfully"
    print_info "Build output: dist/hr-mini-system"
else
    print_error "Build failed - dist directory not found"
    exit 1
fi

echo ""
echo "Step 4: Build artifacts ready"
echo "---------------------------------"
print_step "Build artifacts available at: dist/hr-mini-system"

# Docker build step (optional)
if [ "$DOCKER_AVAILABLE" = true ]; then
    echo ""
    echo " Step 5: Building Docker image"
    echo "--------------------------------"
    
    if [ ! -f "Dockerfile" ]; then
        print_error "Dockerfile not found"
        exit 1
    fi
    
    print_info "Building Docker image: hr-mini-system:latest"
    docker build -t hr-mini-system:latest .
    
    if [ $? -eq 0 ]; then
        print_step "Docker image built successfully"
        print_info "Image: hr-mini-system:latest"
        
        # Show image info
        echo ""
        print_info "Docker image details:"
        docker images hr-mini-system:latest --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
        
        echo ""
        print_info "To run the Docker container:"
        echo "  docker run -d -p 8080:80 hr-mini-system:latest"
        echo "  Then open: http://localhost:8080"
    else
        print_error "Docker build failed"
        exit 1
    fi
else
    echo ""
    print_info "Skipping Docker build (Docker not available)"
fi

echo ""
echo "=================================="
echo "Pipeline completed successfully!"
echo "=================================="

