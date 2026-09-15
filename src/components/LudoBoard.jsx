import {
  BASE_POSITIONS,
  MAIN_PATH,
  SAFE_CELLS,
  HOME_PATHS,
} from "../game/boardConfig";

import Pawn from "./Pawn";

import "./LudoBoard.css";

function LudoBoard({
  pawns,
  currentPlayer,
  selectablePawns,
  onPawnClick,
}) {

  const getPawnsAtPosition = (
    row,
    col
  ) => {

    const result = [];

    Object.keys(pawns).forEach(
      (color) => {

        pawns[color].forEach(
          (pawn) => {

            if (
              pawn.position < 0 ||
              pawn.position > 57
            ) {
              return;
            }

            let position = null;

            if (
              pawn.position <= 51
            ) {

              const start =
                {
                  green: 0,
                  red: 13,
                  blue: 26,
                  yellow: 39,
                }[color];

              const absolute =
                (
                  start +
                  pawn.position
                ) % 52;

              position =
                MAIN_PATH[absolute];

            } else {

              const laneIndex =
                pawn.position - 52;

              const lane =
                HOME_PATHS[color];

              position =
                lane[
                  Math.min(
                    laneIndex,
                    lane.length - 1
                  )
                ];
            }

            if (
              position &&
              position[0] === row &&
              position[1] === col
            ) {
              result.push(pawn);
            }

          }
        );

      }
    );

    return result;
  };

  const getBasePawns = (
    row,
    col
  ) => {

    const result = [];

    Object.keys(
      BASE_POSITIONS
    ).forEach(
      (color) => {

        BASE_POSITIONS[color].forEach(
          (position, index) => {

            if (
              position[0] === row &&
              position[1] === col
            ) {

              const pawn =
                pawns[color].find(
                  (p) =>
                    p.index === index &&
                    p.position === -1
                );

              if (pawn) {
                result.push(pawn);
              }
            }

          }
        );

      }
    );

    return result;
  };

  const getPathIndex = (
    row,
    col
  ) => {

    return MAIN_PATH.findIndex(
      ([r, c]) =>
        r === row &&
        c === col
    );
  };

  const getHomeColor = (
    row,
    col
  ) => {

    const pathIndex =
      getPathIndex(row, col);

    if (pathIndex === -1) {
      return "";
    }

    if (pathIndex === 0) {
      return "start-green";
    }

    if (pathIndex === 13) {
      return "start-red";
    }

    if (pathIndex === 26) {
      return "start-blue";
    }

    if (pathIndex === 39) {
      return "start-yellow";
    }

    return "";
  };

  return (
    <div className="board-wrapper">

      <div className="ludo-board">

        {Array.from(
          { length: 225 },
          (_, index) => {

            const row =
              Math.floor(index / 15);

            const col =
              index % 15;

            const pathIndex =
              getPathIndex(row, col);

            const homeColor =
              getHomeColor(row, col);

            const basePawns =
              getBasePawns(row, col);

            const boardPawns =
              getPawnsAtPosition(
                row,
                col
              );

            const isSafe =
              SAFE_CELLS.includes(
                pathIndex
              );

            let cellClass =
              "board-cell";

            if (
              row < 6 &&
              col < 6
            ) {
              cellClass +=
                " home-area home-green";
            }

            if (
              row < 6 &&
              col > 8
            ) {
              cellClass +=
                " home-area home-red";
            }

            if (
              row > 8 &&
              col > 8
            ) {
              cellClass +=
                " home-area home-blue";
            }

            if (
              row > 8 &&
              col < 6
            ) {
              cellClass +=
                " home-area home-yellow";
            }

            if (pathIndex !== -1) {
              cellClass +=
                " path-cell";
            }

            if (homeColor) {
              cellClass +=
                ` ${homeColor}`;
            }

            if (isSafe) {
              cellClass +=
                " safe-cell";
            }

            if (
              row >= 6 &&
              row <= 8 &&
              col >= 6 &&
              col <= 8
            ) {
              cellClass +=
                " center-area";
            }

            return (
              <div
                key={index}
                className={cellClass}
              >

                {pathIndex !== -1 &&
                  isSafe && (
                    <span className="safe-star">
                      ★
                    </span>
                  )}

                {basePawns.map(
                  (pawn) => (
                    <Pawn
                      key={pawn.id}
                      color={pawn.color}
                      active={
                        pawn.color ===
                        currentPlayer
                      }
                      clickable={
                        selectablePawns.includes(
                          pawn.id
                        )
                      }
                      onClick={() =>
                        onPawnClick(
                          pawn.id
                        )
                      }
                    />
                  )
                )}

                {boardPawns.map(
                  (pawn) => (
                    <Pawn
                      key={pawn.id}
                      color={pawn.color}
                      active={
                        pawn.color ===
                        currentPlayer
                      }
                      clickable={
                        selectablePawns.includes(
                          pawn.id
                        )
                      }
                      onClick={() =>
                        onPawnClick(
                          pawn.id
                        )
                      }
                    />
                  )
                )}

                {row === 7 &&
                  col === 7 && (
                    <div className="center-crown">
                      ★
                    </div>
                  )}

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

export default LudoBoard;