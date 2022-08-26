export default function capitalize(word: string): string {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
