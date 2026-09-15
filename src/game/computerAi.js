import {
  getLegalPawns,
} from "./gameLogic";

export const chooseComputerPawn = (
  pawns,
  diceValue
) => {
  const legalPawns = getLegalPawns(
    pawns,
    diceValue
  );

  if (legalPawns.length === 0) {
    return null;
  }

  /*
    Priority 1:
    Choose a pawn that can reach the finish.
  */
  const finishingPawn = legalPawns.find(
    (pawn) =>
      pawn.position + diceValue === 57
  );

  if (finishingPawn) {
    return finishingPawn;
  }

  /*
    Priority 2:
    Prefer pawns that are already
    on the board.
  */
  const activePawns = legalPawns.filter(
    (pawn) =>
      pawn.position >= 0
  );

  if (activePawns.length > 0) {
    return activePawns.reduce(
      (best, pawn) =>
        pawn.position > best.position
          ? pawn
          : best
    );
  }

  /*
    Priority 3:
    If no pawn is active,
    choose the first legal pawn.
  */
  return legalPawns[0];
};