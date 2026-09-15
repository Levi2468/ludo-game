import "./GameDice.css";

function SingleDie({ value, rolling }) {
  const dots = [];

  if (value === 1) {
    dots.push(4);
  }

  if (value === 2) {
    dots.push(1, 7);
  }

  if (value === 3) {
    dots.push(1, 4, 7);
  }

  if (value === 4) {
    dots.push(1, 2, 6, 7);
  }

  if (value === 5) {
    dots.push(1, 2, 4, 6, 7);
  }

  if (value === 6) {
    dots.push(1, 2, 3, 5, 6, 7);
  }

  return (
    <div
      className={`game-die ${
        rolling ? "rolling-die" : ""
      }`}
    >
      {dots.map((dot) => (
        <span
          key={dot}
          className={`game-dot game-dot-${dot}`}
        />
      ))}
    </div>
  );
}

function GameDice({
  dice,
  rolling,
  disabled,
  onRoll,
  isComputer,
}) {
  return (
    <div className="game-dice-area">

      <div className="dice-title">
        {isComputer
          ? "COMPUTER ROLLING"
          : rolling
            ? "ROLLING..."
            : "YOUR TURN"}
      </div>

      <div className="game-dice-row">
        <SingleDie
          value={dice}
          rolling={rolling}
        />
      </div>

      <button
        className="roll-button"
        onClick={onRoll}
        disabled={
          disabled ||
          rolling ||
          isComputer
        }
      >
        {rolling
          ? "ROLLING..."
          : "ROLL DICE"}
      </button>

    </div>
  );
}

export default GameDice;