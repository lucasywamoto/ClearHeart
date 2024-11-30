export function getColor(type) {
  switch (type) {
    case "Positive":
    case "positive":
      return "#00CCDD";
    case "Neutral":
    case "neutral":
      return "#4F75FF";
    case "Negative":
    case "negative":
      return "#6439FF";
    default:
      return "#000000";
  }
}
