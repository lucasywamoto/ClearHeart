export default function Spinner({ color }) {
  return (
    <div
      className={`spinner-border ${
        color === "light" ? "text-light" : "text-secondary"
      }`}
      role="status"
    ></div>
  );
}
