import "./DiceVolume.css";

function DiceVolume({ level, onChange }) {

  const handleClick = () => {

    const nextLevel =
      level === 6
        ? 0
        : level + 1;

    onChange(nextLevel);
  };

  return (
    <div className="volume-control">

      <button
        className={`volume-dice dice-${level}`}
        onClick={handleClick}
        title="Click to change volume"
        aria-label={`Volume level ${level}`}
      >

        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
        <span className="dot dot-5"></span>
        <span className="dot dot-6"></span>
        <span className="dot dot-7"></span>

      </button>

    </div>
  );
}

export default DiceVolume;