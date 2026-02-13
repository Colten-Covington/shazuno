// Normalize strings for comparison: lowercase, remove newlines, remove formatting characters
function normalize(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple whitespace (including newlines) with single space
    .replace(/[^\w\s]/g, ''); // Remove all non-alphanumeric characters except spaces
}

// Calculate similarity based on query word overlap
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalize(str1);
  const s2 = normalize(str2);

  if (!s1 || !s2) {
    return 0;
  }

  const lyricsWords = new Set(s1.split(/\s+/).filter(Boolean));
  const queryWords = s2.split(/\s+/).filter(Boolean);

  if (queryWords.length === 0) {
    return 0;
  }

  if (s1.includes(s2)) {
    return 1.0;
  }

  let matchingWords = 0;
  for (const word of queryWords) {
    if (lyricsWords.has(word)) {
      matchingWords++;
    }
  }

  const ratio = matchingWords / queryWords.length;

  if (ratio === 1) {
    return 0.9;
  }

  return ratio;
}
