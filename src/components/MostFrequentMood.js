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
      <h4 className="fw-light mb-0 text-center">
        Most people
        <br />
        are feeling
      </h4>
      {stats && stats.length > 0 && (
        <h2
          className="fw-bold mb-0 text-center"
          style={{ color: getColor(getTopMood(stats).type) }}
        >
          {getTopMood(stats).mood.toLowerCase()}
        </h2>
      )}
      <h4 className="fw-light text-center">today.</h4>
    </div>
  );
}
