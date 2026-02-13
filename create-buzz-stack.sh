#!/bin/bash

# Buzz Stack Repository Creation Script
# This script helps create a new buzz-stack repository from the Shazuno transformation

set -e  # Exit on error

echo "🚀 Buzz Stack Repository Setup Script"
echo "======================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if directory argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <target-directory> [github-username]"
    echo ""
    echo "Example:"
    echo "  $0 /tmp/buzz-stack"
    echo "  $0 ~/projects/buzz-stack Colten-Covington"
    exit 1
fi

TARGET_DIR="$1"
GITHUB_USERNAME="${2:-YOUR_USERNAME}"

echo "Target directory: $TARGET_DIR"
echo "GitHub username: $GITHUB_USERNAME"
echo ""

# Check if target directory exists
if [ -d "$TARGET_DIR" ]; then
    print_error "Directory $TARGET_DIR already exists!"
    read -p "Do you want to remove it and continue? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$TARGET_DIR"
        print_success "Removed existing directory"
    else
        print_error "Aborted"
        exit 1
    fi
fi

# Create target directory
print_info "Creating directory..."
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"
print_success "Created directory: $TARGET_DIR"

# Initialize git repository
print_info "Initializing git repository..."
git init -b main
print_success "Initialized git repository"

# Add source remote
print_info "Adding source repository..."
git remote add source https://github.com/Colten-Covington/shazuno.git
print_success "Added source remote"

# Fetch the branch
print_info "Fetching branch copilot/remove-project-specific-logic..."
git fetch source copilot/remove-project-specific-logic
print_success "Fetched branch"

# Checkout the files
print_info "Checking out files..."
git checkout source/copilot/remove-project-specific-logic -- .
print_success "Checked out files"

# Remove source remote
git remote remove source
print_success "Removed source remote"

# Update GitHubLink component with new repo URL
print_info "Updating repository URLs..."
if [ -f "components/GitHubLink.tsx" ]; then
    sed -i "s|https://github.com/yourusername/your-repo|https://github.com/$GITHUB_USERNAME/buzz-stack|g" components/GitHubLink.tsx
    print_success "Updated GitHubLink component"
fi

# Update README with new repo URL
if [ -f "README.md" ]; then
    sed -i "s|yourusername/buzz-stack|$GITHUB_USERNAME/buzz-stack|g" README.md
    sed -i "s|yourusername/your-repo|$GITHUB_USERNAME/buzz-stack|g" README.md
    print_success "Updated README.md"
fi

# Update BOOTSTRAP.md
if [ -f "BOOTSTRAP.md" ]; then
    sed -i "s|yourusername/buzz-stack|$GITHUB_USERNAME/buzz-stack|g" BOOTSTRAP.md
    print_success "Updated BOOTSTRAP.md"
fi

# Create initial commit
print_info "Creating initial commit..."
git add .
git commit -m "Initial commit: Buzz Stack v0.1.0

Modern Next.js 15 boilerplate with React 18, TypeScript, and Tailwind CSS.

Features:
- Next.js 15 with App Router
- React 18 with concurrent features
- TypeScript strict mode
- Tailwind CSS 3.4
- WCAG 2.2 AA accessibility
- Production-ready architecture

Transformed from Shazuno project by removing all project-specific logic
and creating a clean, reusable boilerplate.

Source: https://github.com/Colten-Covington/shazuno/tree/copilot/remove-project-specific-logic"

print_success "Created initial commit"

echo ""
echo "======================================"
print_success "Buzz Stack repository prepared!"
echo "======================================"
echo ""
echo "📍 Location: $TARGET_DIR"
echo ""
echo "Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo "   Name: buzz-stack"
echo "   Description: Modern Next.js 15 boilerplate with React 18, TypeScript, and Tailwind CSS"
echo ""
echo "2. Connect and push:"
echo "   cd $TARGET_DIR"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/buzz-stack.git"
echo "   git push -u origin main"
echo ""
echo "3. Verify the setup:"
echo "   pnpm install"
echo "   pnpm build"
echo "   pnpm dev"
echo ""
echo "Or use GitHub CLI:"
echo "   cd $TARGET_DIR"
echo "   gh repo create buzz-stack --public --source=. --push"
echo ""
print_success "Done! 🎉"
