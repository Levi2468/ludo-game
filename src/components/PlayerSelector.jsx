import "./PlayerSelector.css";

function PlayerSelector({ players, setPlayers }) {

  const playerColors = [
    "green",
    "red",
    "blue",
    "yellow",
  ];

  return (
    <div className="player-selector">

      {playerColors.map((color, index) => {

        const playerNumber = index + 1;

        const active =
          playerNumber <= players;

        return (
          <button
            key={color}
            className={`pawn-button ${
              active
                ? `active ${color}`
                : ""
            }`}
            onClick={() =>
              setPlayers(playerNumber)
            }
          >

            <span className="pawn">

              <span className="pawn-head"></span>

              <span className="pawn-body"></span>

            </span>

            <span className="player-number">
              {playerNumber}
            </span>

          </button>
        );

      })}

    </div>
  );
}

export default PlayerSelector;