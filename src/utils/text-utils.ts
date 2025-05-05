export function getLongestWords(text: string, count: number): string[] {
  const words = text
    .normalize('NFKC')
    .split(/[^\p{L}]+/gu)
    .filter((w) => w.length > 0);

  const uniqueWords = [...new Set(words)];

  return uniqueWords.sort((a, b) => b.length - a.length).slice(0, count);
}
