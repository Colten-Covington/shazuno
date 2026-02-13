# Creating the Buzz Stack Repository

This guide will help you create a new GitHub repository called "buzz-stack" from the transformed code.

## Option 1: Create New Repo via GitHub CLI (Recommended)

If you have GitHub CLI installed:

```bash
# Navigate to a new directory
cd /tmp
mkdir buzz-stack
cd buzz-stack

# Initialize new git repo
git init

# Add the shazuno repo as a remote
git remote add source https://github.com/Colten-Covington/shazuno.git

# Fetch the branch
git fetch source copilot/remove-project-specific-logic

# Checkout the branch
git checkout -b main source/copilot/remove-project-specific-logic

# Remove the source remote
git remote remove source

# Create new GitHub repository (requires gh CLI)
gh repo create buzz-stack --public --source=. --description="Modern Next.js 15 boilerplate with React 18, TypeScript, and Tailwind CSS"

# Push to the new repository
git push -u origin main
```

## Option 2: Create New Repo via GitHub Web Interface

### Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. Set repository name: `buzz-stack`
3. Add description: "Modern Next.js 15 boilerplate with React 18, TypeScript, and Tailwind CSS"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Prepare Local Repository

```bash
# Navigate to a new directory
cd /tmp
mkdir buzz-stack
cd buzz-stack

# Initialize new git repo
git init -b main

# Add the shazuno repo as a remote temporarily
git remote add source https://github.com/Colten-Covington/shazuno.git

# Fetch the specific branch
git fetch source copilot/remove-project-specific-logic

# Checkout and merge the branch content
git checkout -b main
git pull source copilot/remove-project-specific-logic

# Remove the source remote
git remote remove source
```

### Step 3: Connect to New Repository

```bash
# Add your new buzz-stack repository as origin
git remote add origin https://github.com/YOUR_USERNAME/buzz-stack.git

# Push to the new repository
git push -u origin main
```

## Option 3: Import Repository on GitHub

1. Go to https://github.com/new/import
2. Enter: `https://github.com/Colten-Covington/shazuno.git`
3. Name it: `buzz-stack`
4. Click "Begin import"
5. After import completes, delete all branches except `copilot/remove-project-specific-logic`
6. Rename `copilot/remove-project-specific-logic` to `main`

```bash
# Clone your new repository
git clone https://github.com/YOUR_USERNAME/buzz-stack.git
cd buzz-stack

# Rename the branch to main
git checkout copilot/remove-project-specific-logic
git branch -m main
git push origin main
git push origin --delete copilot/remove-project-specific-logic
```

## Option 4: Clean Git History (Start Fresh)

If you want a completely clean history without the Shazuno commits:

```bash
# Navigate to a new directory
cd /tmp
mkdir buzz-stack
cd buzz-stack

# Initialize new git repo
git init -b main

# Add the shazuno repo as a remote temporarily
git remote add source https://github.com/Colten-Covington/shazuno.git

# Fetch the specific branch
git fetch source copilot/remove-project-specific-logic

# Checkout the files without history
git checkout source/copilot/remove-project-specific-logic -- .

# Remove source remote
git remote remove source

# Create initial commit
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
and creating a clean, reusable boilerplate."

# Add your new repository as origin
git remote add origin https://github.com/YOUR_USERNAME/buzz-stack.git

# Push to the new repository
git push -u origin main
```

## Post-Creation Steps

After creating the repository:

1. **Update GitHub repository settings:**
   - Add topics: `nextjs`, `react`, `typescript`, `tailwind`, `boilerplate`, `starter-template`
   - Set homepage URL (if you deploy it)
   - Enable issues and discussions
   - Add repository description

2. **Update repository URLs in the code:**
   ```bash
   cd buzz-stack
   
   # Update GitHubLink component
   # Edit components/GitHubLink.tsx and change default repoUrl
   
   # Update README.md
   # Replace "yourusername/your-repo" with your actual repository URL
   
   # Commit changes
   git add .
   git commit -m "Update repository URLs"
   git push
   ```

3. **Optional: Create a release:**
   ```bash
   git tag -a v0.1.0 -m "Initial release: Buzz Stack v0.1.0"
   git push origin v0.1.0
   ```

4. **Optional: Deploy to Vercel:**
   - Go to https://vercel.com/new
   - Import your buzz-stack repository
   - Deploy with default settings

## Verification

After setup, verify everything works:

```bash
cd buzz-stack
pnpm install
pnpm build
pnpm dev
```

Visit http://localhost:3000 to see the welcome page.

## Need Help?

If you encounter issues:
- Check that all files were copied correctly
- Ensure package.json has correct name ("buzz-stack")
- Verify all dependencies are installed
- Check build output for errors

---

**Created from:** https://github.com/Colten-Covington/shazuno/tree/copilot/remove-project-specific-logic
