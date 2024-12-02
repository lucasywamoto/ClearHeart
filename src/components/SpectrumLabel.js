//component for the spectrum label at bottom of left panel
export default function SpectrumLabel() {
  return (
    <div id="spectrum-label">
      <hr />
      <div>
        <p className="mb-2">Positive</p>
        <p className="mb-2">Neutral</p>
        <p className="mb-2">Negative</p>
      </div>
      <div id="spectrum-bar"></div>
    </div>
  );
}
