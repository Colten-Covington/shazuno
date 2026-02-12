# Shazuno 🎵

A Shazam-like web application for identifying and searching songs from Suno.com. This application allows users to search for songs by a specific Suno user using either voice recognition (speech-to-text) or text input for lyrics.

## Features

- 🎤 **Voice Recognition**: Record song lyrics using your microphone with real-time speech-to-text
- 📝 **Text Search**: Manually enter or paste song lyrics to search
- 👤 **User-Specific Search**: Search songs by specific Suno.com usernames
- 🎯 **Smart Matching**: Advanced lyrics matching algorithm to find the best matches
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Modern web browser (Chrome or Edge recommended for voice recognition)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Colten-Covington/shazuno.git
cd shazuno
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Enter a Suno Username**: Type the username of the Suno.com artist whose songs you want to search
   - Try "demo-user" or "test-artist" for demo purposes

2. **Choose Search Method**:
   - **Text Search**: Type or paste song lyrics into the text box
   - **Microphone**: Click the microphone button and sing or speak the lyrics

3. **View Results**: Matching songs will appear with:
   - Song title and match percentage
   - Lyrics preview
   - Song artwork (if available)

## Demo Users

The application includes demo data for testing:

- **demo-user**: Contains 3 songs (Summer Dreams, City Lights, Mountain High)
- **test-artist**: Contains 1 song (Rainy Day Blues)

### Example Searches

Try searching for these lyrics with username "demo-user":
- "walking down the beach at sunset"
- "city lights will guide my way"
- "climbing up the mountain trail"

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Voice Recognition**: Web Speech API
- **Deployment**: Vercel-ready

## How It Works

1. **Speech Recognition**: Uses the browser's Web Speech API to convert spoken words to text
2. **Text Matching**: Implements a custom similarity algorithm combining:
   - Word-based matching
   - Levenshtein distance calculation
   - Substring detection
3. **API Route**: Next.js API route handles search requests and returns ranked results

## Future Enhancements

- Integration with real Suno.com API
- Audio fingerprinting for actual audio recognition (Shazam-style)
- More advanced matching algorithms (fuzzy matching, semantic search)
- User authentication
- Song history and favorites
- Share results functionality

## Browser Compatibility

- **Voice Recognition**: Requires Chrome, Edge, or Safari
- **Text Search**: Works in all modern browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Shazam's song recognition technology
- Built for the Suno.com music generation platform
