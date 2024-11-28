export function getColor(type) {
  switch (type) {
    case "Positive":
      return "#00CCDD";
    case "Neutral":
      return "#4F75FF";
    case "Negative":
      return "#6439FF";
    default:
      return "#000000";
  }
}
