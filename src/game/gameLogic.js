import {
  PLAYER_START,
  SAFE_CELLS,
} from "./boardConfig";

export const PAWNS_PER_PLAYER = 4;

export const createInitialPawns = () => {

  const colors = [
    "green",
    "red",
    "blue",
    "yellow",
  ];

  const result = {};

  colors.forEach((color) => {

    result[color] = Array.from(
      { length: PAWNS_PER_PLAYER },
      (_, index) => ({
        id: `${color}-${index}`,
        color,
        index,

        // -1 = base
        // 0..51 = main path
        // 52..57 = home lane
        // 58 = finished
        position: -1,

        finished: false,
      })
    );

  });

  return result;
};

export const rollDie = () => {
  return Math.floor(Math.random() * 6) + 1;
};

export const isSix = (value) => {
  return value === 6;
};

export const canMovePawn = (
  pawn,
  diceValue
) => {

  if (!pawn || pawn.finished) {
    return false;
  }

  if (pawn.position === -1) {
    return diceValue === 6;
  }

  return pawn.position + diceValue <= 57;
};

export const getNextPosition = (
  pawn,
  diceValue
) => {

  if (
    pawn.position === -1 &&
    diceValue === 6
  ) {
    return PLAYER_START[pawn.color];
  }

  if (pawn.position < 0) {
    return pawn.position;
  }

  return pawn.position + diceValue;
};

export const getAbsolutePathPosition = (
  color,
  relativePosition
) => {

  if (
    relativePosition < 0 ||
    relativePosition > 51
  ) {
    return null;
  }

  const start =
    PLAYER_START[color];

  return (
    start + relativePosition
  ) % 52;
};

export const isSafeCell = (
  absolutePosition
) => {
  return SAFE_CELLS.includes(
    absolutePosition
  );
};

export const checkCapture = (
  movingPawn,
  allPawns
) => {

  if (
    movingPawn.position < 0 ||
    movingPawn.position > 51
  ) {
    return [];
  }

  const absolutePosition =
    getAbsolutePathPosition(
      movingPawn.color,
      movingPawn.position
    );

  if (
    isSafeCell(absolutePosition)
  ) {
    return [];
  }

  const captured = [];

  Object.keys(allPawns).forEach(
    (color) => {

      if (color === movingPawn.color) {
        return;
      }

      allPawns[color].forEach(
        (pawn) => {

          if (
            pawn.position >= 0 &&
            pawn.position <= 51
          ) {

            const enemyAbsolute =
              getAbsolutePathPosition(
                pawn.color,
                pawn.position
              );

            if (
              enemyAbsolute ===
              absolutePosition
            ) {
              captured.push(pawn.id);
            }
          }

        }
      );

    }
  );

  return captured;
};

export const hasWon = (pawns) => {

  return pawns.every(
    (pawn) => pawn.finished
  );
};

export const getLegalPawns = (
  pawns,
  diceValue
) => {

  return pawns.filter(
    (pawn) =>
      canMovePawn(
        pawn,
        diceValue
      )
  );
};

export const movePawn = (
  pawn,
  diceValue
) => {

  const newPosition =
    getNextPosition(
      pawn,
      diceValue
    );

  return {
    ...pawn,

    position: newPosition,

    finished:
      newPosition === 57,
  };
};