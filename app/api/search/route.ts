import { NextRequest, NextResponse } from 'next/server';

// Mock database of Suno songs for demonstration
// In production, this would connect to Suno's API or a database
const mockSunoSongs: Record<string, Array<{
  id: string;
  title: string;
  lyrics: string;
  username: string;
  audioUrl?: string;
  imageUrl?: string;
}>> = {
  'demo-user': [
    {
      id: 'song-001',
      title: 'Summer Dreams',
      username: 'demo-user',
      lyrics: `Walking down the beach at sunset
The waves are calling out to me
Summer dreams are made of moments
That we hold in memory
Golden rays upon the water
Dancing lights across the sea
This is where I want to be
In my summer dreams`,
      imageUrl: 'https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=Summer+Dreams',
    },
    {
      id: 'song-002',
      title: 'City Lights',
      username: 'demo-user',
      lyrics: `Neon signs are glowing bright
In the darkness of the night
City lights will guide my way
Through the streets where I will stay
Buildings reaching to the sky
Watch the world go rushing by
This is home where I belong
In the city all night long`,
      imageUrl: 'https://via.placeholder.com/200x200/EC4899/FFFFFF?text=City+Lights',
    },
    {
      id: 'song-003',
      title: 'Mountain High',
      username: 'demo-user',
      lyrics: `Climbing up the mountain trail
Through the mist and morning veil
Higher than I've been before
Reaching for something more
Standing at the summit peak
Finding what I came to seek
The view is breathtaking and clear
From the mountain high up here`,
      imageUrl: 'https://via.placeholder.com/200x200/10B981/FFFFFF?text=Mountain+High',
    },
  ],
  'test-artist': [
    {
      id: 'song-004',
      title: 'Rainy Day Blues',
      username: 'test-artist',
      lyrics: `Rain is falling on my window
Gray clouds cover up the sky
Sitting here with memories
Wondering where the time did fly
Missing all the sunny days
When everything felt right
Now I'm stuck with rainy day blues
Through the endless night`,
      imageUrl: 'https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=Rainy+Day',
    },
  ],
};

// Calculate similarity between two strings using a simple algorithm
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  // Exact match
  if (s1 === s2) return 1.0;

  // Contains match
  if (s1.includes(s2) || s2.includes(s1)) {
    return 0.8;
  }

  // Word-based matching
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);

  let matchingWords = 0;
  for (const word of words2) {
    if (word.length > 3 && s1.includes(word)) {
      matchingWords++;
    }
  }

  const wordMatchRatio = words2.length > 0 ? matchingWords / words2.length : 0;

  // Levenshtein distance for smaller strings
  if (s1.length < 100 && s2.length < 100) {
    const distance = levenshteinDistance(s1, s2);
    const maxLen = Math.max(s1.length, s2.length);
    const charMatchRatio = 1 - distance / maxLen;
    return Math.max(wordMatchRatio, charMatchRatio * 0.7);
  }

  return wordMatchRatio;
}

// Simple Levenshtein distance implementation
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, username } = body;

    if (!query || !username) {
      return NextResponse.json(
        { error: 'Missing query or username' },
        { status: 400 }
      );
    }

    // Get songs for the specified user
    const userSongs = mockSunoSongs[username.toLowerCase()] || [];

    if (userSongs.length === 0) {
      return NextResponse.json({
        results: [],
        message: `No songs found for user "${username}". Try "demo-user" or "test-artist" for demo.`,
      });
    }

    // Calculate similarity scores for each song
    const scoredSongs = userSongs.map((song) => ({
      ...song,
      matchScore: calculateSimilarity(song.lyrics, query),
    }));

    // Filter and sort by match score
    const results = scoredSongs
      .filter((song) => song.matchScore > 0.2) // Only include songs with >20% match
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10); // Return top 10 matches

    return NextResponse.json({
      results,
      totalMatches: results.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
