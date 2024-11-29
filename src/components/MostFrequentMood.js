import { getColor } from "@/utils/helpers";

export default function MostFrequentMood({ stats }) {
  const getTopMood = (stats) => {
    if (!stats || !stats.length) return null;
    return stats.reduce((prev, current) =>
      prev.count > current.count ? prev : current
    );
  };

  return (
    <div>
      <h4 className="fw-light">
        Most people
        <br />
        today are feeling
      </h4>
      {stats && stats.length > 0 && (
        <h2
          className="fw-bold"
          style={{ color: getColor(getTopMood(stats).type) }}
        >
          {getTopMood(stats).mood}
        </h2>
      )}
    </div>
  );
}
