export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text
  } else {
    const truncatedText = text.substring(0, maxLength)
    return `${truncatedText} ...`
  }
}
