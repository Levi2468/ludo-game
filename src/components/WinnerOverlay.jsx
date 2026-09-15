import "./WinnerOverlay.css";

function WinnerOverlay({
  winner,
  onGoHome,
}) {

  return (
    <div
      className={`winner-overlay winner-${winner}`}
    >

      <div className="winner-card">

        <div className="winner-pawn">

          <span className="winner-pawn-head"></span>

          <span className="winner-pawn-body"></span>

        </div>

        <div className="winner-label">
          WINNER
        </div>

        <h1>
          {winner.toUpperCase()}
        </h1>

        <p>
          PLAYER WINS!
        </p>

        <button
          className="home-button"
          onClick={onGoHome}
        >
          GO HOME
        </button>

      </div>

    </div>
  );
}

export default WinnerOverlay;