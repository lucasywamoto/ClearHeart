export default function SharedMood() {
  return (
    <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
      <h5 className="fw-light">Your are xxxxx today.</h5>
      <h3>You are not alone :)</h3>
      <h4 className="fw-light">
        X people are feeling
        <br />
        the same way you do.
      </h4>
    </div>
  );
}
