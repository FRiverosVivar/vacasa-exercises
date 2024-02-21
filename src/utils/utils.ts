export type VowelsConsonantsCount = {
  vowels: number;
  consonants: number;
};
export function countVowelsAndConsonants(s: string): VowelsConsonantsCount {
  const letters = s.match(/[a-zA-Z]/g) || [];
  const vowelsCount = (s.match(/[aeiouAEIOU]/g) || []).length;
  const consonantsCount = letters.length - vowelsCount;
  return { vowels: vowelsCount, consonants: consonantsCount };
}
