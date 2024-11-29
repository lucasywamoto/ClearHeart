import { getColor } from "@/utils/helpers";

export default function SharedMood({ stats, todayMood }) {
  console.log("stats", stats);

  if (!todayMood || todayMood.length === 0) {
    return (
      <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
        <h3>
          Share your feelings today to
          <br />
          synchronize with others.
        </h3>
      </div>
    );
  }

  const sameMoodStat = stats.find((stat) => stat.mood === todayMood[0]);
  const sameMoodCount = sameMoodStat ? sameMoodStat.count : 0;

  return (
    <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
      <h5 className="fw-light">You are {todayMood[0]?.toLowerCase()} today.</h5>
      <h3
        style={{
          color: getColor(todayMood[1]),
        }}
      >
        You are not alone :)
      </h3>
      <h4 className="fw-light">
        {sameMoodCount} people are feeling the same way you do.
      </h4>
    </div>
  );
}
