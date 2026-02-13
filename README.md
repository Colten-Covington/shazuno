# Shazuno 🎵

A Shazam-like web application for searching and identifying songs from Suno.com. This application allows users to search through a Suno artist's song library by providing lyrics in text or voice, using an intelligent word-overlap matching algorithm.

## Features

- 🎤 **Voice Recognition**: Record or speak song lyrics using your microphone with real-time Web Speech API transcription
- 📝 **Text Search**: Manually enter or paste song lyrics to search
- 👤 **Live Suno API Integration**: Fetch songs directly from any Suno.com artist's profile
- 🎯 **Smart Word-Overlap Matching**: Advanced similarity algorithm that matches query words against song metadata
- 🎨 **Modern UI**: Beautiful glassmorphism gradient design with smooth animations
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- ⌨️ **Keyboard Shortcuts**: Use Ctrl/Cmd+Enter to quickly submit your search
- 🔗 **Progressive Loading**: Results update in real-time as songs are fetched from the API

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- pnpm package manager (preferred) or npm
- Modern web browser (Chrome or Edge recommended for voice recognition)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Colten-Covington/shazuno.git
cd shazuno
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
pnpm build
pnpm start
```

## Usage

1. **Enter a Suno Username**: Type the username of any Suno.com artist whose songs you want to search
   - The app will automatically fetch their songs from the Suno API
   - Songs continue loading in the background as you search

2. **Choose Search Method**:
   - **Text Search**: Type or paste song lyrics into the text area, then click the search button or press Ctrl/Cmd+Enter
   - **Voice Search**: Click the microphone button and speak the lyrics (requires Chrome, Edge, or Safari)

3. **View Results**: Matching songs appear instantly with:
   - Song title and match percentage
   - Lyrics preview with highlighted query words
   - Song artwork
   - Tag information from song metadata
   - Click "View Lyrics" to see the full song description/lyrics in a modal

## How It Works

1. **Client-Side API Integration**: Songs are fetched directly from the Suno API in the browser (no backend processing)
2. **Progressive Loading**: The app fetches up to 10 pages of songs, stopping after 5 consecutive empty pages
3. **Deduplication**: Duplicate songs are automatically removed based on song ID
4. **Real-Time Search**: Results update instantly as you type and as new pages of songs load
5. **Similarity Matching**: Uses a word-overlap algorithm that:
   - Scores 1.0 for exact substring matches
   - Scores 0.9 if all query words appear in the lyrics (in any order)
   - Scores proportionally for partial matches
6. **Smart Snippets**: Shows the most relevant 40-word excerpt from song lyrics with highlighted matches

## Future Enhancements

- Shazam-style audio fingerprinting (analyze actual audio rather than speech transcription)
- User authentication for private searches
- Search history and saved favorites
- Advanced filtering (by date, tags, genre metadata)
- Fuzzy matching and semantic search capabilities
- Result export/sharing functionality
- Performance optimizations and caching strategies
- Dark/light theme toggle

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Voice Recognition**: Web Speech API (browser-native)
- **API**: Direct Suno.com API integration (client-side)
- **State Management**: React Hooks (useState, useEffect)

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Architecture Documentation](docs/ARCHITECTURE.md)** - System design, data flow, and architectural decisions
- **[Technology Stack](docs/TECH_STACK.md)** - Detailed information about all technologies, frameworks, and libraries used
- **[Code Structure](docs/CODE_STRUCTURE.md)** - Complete breakdown of the codebase organization and file purposes
- **[Development Guide](docs/DEVELOPMENT.md)** - Setup instructions, coding standards, and best practices
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project
- **[Security Documentation](SECURITY.md)** - Security practices and vulnerability remediation
- **[Implementation Summary](IMPLEMENTATION.md)** - Feature overview and testing results

### For Developers & AI Agents

- **[GitHub Copilot Instructions](.github/copilot-instructions.md)** - Guidelines for GitHub Copilot and other AI coding assistants
- **[VS Code Settings](.vscode/settings.json)** - Recommended workspace settings
- **[Code Snippets](.vscode/shazuno.code-snippets)** - Common code patterns and templates

## Browser Compatibility

- **Voice Recognition**: Chrome, Edge, and Safari (most reliable)
- **Text Search**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Best Experience**: Chrome or Edge recommended for voice input

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

Key resources for contributors:
1. Read the [Architecture Documentation](docs/ARCHITECTURE.md) to understand the system
2. Follow the [Development Guide](docs/DEVELOPMENT.md) for setup and standards
3. Check the [Technology Stack](docs/TECH_STACK.md) for framework details
4. Review [GitHub Copilot Instructions](.github/copilot-instructions.md) for coding patterns

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Shazam's song recognition technology
- Built for the Suno.com music generation platform
