/**
 * Pluralize a word based on a count
 * Handle plural other than 's'
 * @param count - word count
 * @param word - word to pluralize
 * @param plural - plural of word when it's not 's'
 */
export function pluralize(count: number, word: string, plural?: string) {
  if (count === 1) {
    return word
  }

  return plural ? plural : word + 's'
}
