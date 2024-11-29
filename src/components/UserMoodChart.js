import { getColor } from "@/utils/helpers";

export default function UserMoodChart({ getDayMood }) {
  const getDaySequence = () => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const today = new Date().getDay();
    const sequence = [];

    for (let i = 1; i <= 7; i++) {
      const index = (today + i) % 7;
      sequence.push(days[index]);
    }
    return sequence;
  };

  return (
    <div className="align-items-center">
      <h5 className="fw-light text-center">How You’ve Felt Recently</h5>
      <div className="d-flex justify-content-around gap-4">
        {getDaySequence().map((day, index) => {
          const mood = getDayMood(6 - index);
          return (
            <div
              key={index}
              className="d-flex flex-column justify-content-center align-items-center gap-2"
            >
              <h6 className="m-0 fw-bold">{day}</h6>
              <div
                style={{
                  height: "12px",
                  width: "12px",
                  borderRadius: "6px",
                  backgroundColor: mood ? getColor(mood.type) : "#e5e5e5",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
