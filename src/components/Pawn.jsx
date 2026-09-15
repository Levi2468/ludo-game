import "./Pawn.css";

function Pawn({
  color,
  active = false,
  clickable = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`
        game-pawn
        pawn-${color}
        ${active ? "pawn-active" : ""}
        ${clickable ? "pawn-clickable" : ""}
      `}
      onClick={onClick}
      disabled={!clickable}
      aria-label={`${color} pawn`}
    >
      <span className="game-pawn-head"></span>

      <span className="game-pawn-body"></span>
    </button>
  );
}

export default Pawn;