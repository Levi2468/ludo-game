import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./Game.css";

import LudoBoard from "../components/LudoBoard";
import GameDice from "../components/GameDice";
import DiceVolume from "../components/DiceVolume";
import WinnerOverlay from "../components/WinnerOverlay";

import lobbyMusic from "../assets/audio/lobby-music.mp3";

import {
  createInitialPawns,
  rollDie,
  getLegalPawns,
  movePawn,
  checkCapture,
  hasWon,
} from "../game/gameLogic";

import {
  COLORS,
  COLOR_HEX,
} from "../game/boardConfig";

import {
  chooseComputerPawn,
} from "../game/computerAi";

function Game({
  gameSetup,
  onGoHome,
}) {
  /*
    Human players are the first N colors.

    1 → Green human
    2 → Green + Red human
    3 → Green + Red + Blue human
    4 → all human
  */

  const humanColors = useMemo(() => {
    return COLORS.slice(
      0,
      gameSetup.humans
    );
  }, [gameSetup.humans]);

  const computerColors = useMemo(() => {
    return COLORS.slice(
      gameSetup.humans
    );
  }, [gameSetup.humans]);

  const [pawns, setPawns] = useState(
    createInitialPawns()
  );

  const [currentPlayer, setCurrentPlayer] =
    useState("green");

  // ONE DIE
  const [dice, setDice] = useState(1);

  const [rolling, setRolling] =
    useState(false);

  const [winner, setWinner] =
    useState(null);

  const [selectablePawns, setSelectablePawns] =
    useState([]);

  const [volumeLevel, setVolumeLevel] =
    useState(6);

  const audioRef =
    useRef(null);

  /*
    Start music.
  */

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume =
        volumeLevel / 6;

      audioRef.current.muted =
        volumeLevel === 0;

      audioRef.current
        .play()
        .catch(() => {
          console.log(
            "Browser blocked automatic audio."
          );
        });
    }
  }, []);

  /*
    Computer turn.
  */

  useEffect(() => {
    if (
      winner ||
      rolling
    ) {
      return;
    }

    if (
      computerColors.includes(
        currentPlayer
      )
    ) {
      const timer =
        setTimeout(() => {
          performRoll();
        }, 1200);

      return () =>
        clearTimeout(timer);
    }
  }, [
    currentPlayer,
    winner,
    rolling,
    computerColors,
  ]);

  /*
    Volume.
  */

  const handleVolumeChange = (
    newLevel
  ) => {
    setVolumeLevel(newLevel);

    if (audioRef.current) {
      audioRef.current.volume =
        newLevel / 6;

      audioRef.current.muted =
        newLevel === 0;
    }
  };

  /*
    Get next player.
  */

  const getNextPlayer = (
    player
  ) => {
    const index =
      COLORS.indexOf(player);

    return COLORS[
      (index + 1) % COLORS.length
    ];
  };

  /*
    ONE-DIE ROLL.

    Animation lasts 5 seconds.
  */

  const performRoll = () => {
    if (
      rolling ||
      winner
    ) {
      return;
    }

    setRolling(true);

    setSelectablePawns([]);

    let elapsed = 0;

    const interval =
      setInterval(() => {

        setDice(rollDie());

        elapsed += 100;

        if (elapsed >= 2000) {

          clearInterval(interval);

          const finalDice =
            rollDie();

          setDice(finalDice);

          setRolling(false);

          handleDiceResult(
            finalDice
          );
        }

      }, 100);
  };

  /*
    Handle the ONE dice result.
  */

  const handleDiceResult = (
    diceValue
  ) => {

    const legalPawns =
      getLegalPawns(
        pawns[currentPlayer],
        diceValue
      );

    /*
      No legal move.
    */

    if (
      legalPawns.length === 0
    ) {

      setTimeout(() => {

        /*
          Rolling a 6 still gives
          another turn.
        */

        if (diceValue === 6) {
          return;
        }

        setCurrentPlayer(
          getNextPlayer(
            currentPlayer
          )
        );

      }, 700);

      return;
    }

    /*
      COMPUTER
    */

    if (
      computerColors.includes(
        currentPlayer
      )
    ) {

      setTimeout(() => {

        const chosenPawn =
          chooseComputerPawn(
            pawns[currentPlayer],
            diceValue
          );

        if (!chosenPawn) {
          return;
        }

        executePawnMove(
          chosenPawn.id,
          diceValue
        );

      }, 600);

      return;
    }

    /*
      HUMAN

      Show which pawns can move.
    */

    setSelectablePawns(
      legalPawns.map(
        (pawn) => pawn.id
      )
    );
  };

  /*
    Human clicks a pawn.
  */

  const handlePawnClick = (
    pawnId
  ) => {

    if (
      rolling ||
      winner
    ) {
      return;
    }

    if (
      !selectablePawns.includes(
        pawnId
      )
    ) {
      return;
    }

    executePawnMove(
      pawnId,
      dice
    );
  };

  /*
    Move pawn.
  */

  const executePawnMove = (
    pawnId,
    diceValue
  ) => {

    const movingPawn =
      pawns[currentPlayer].find(
        (pawn) =>
          pawn.id === pawnId
      );

    if (!movingPawn) {
      return;
    }

    const updatedPawn =
      movePawn(
        movingPawn,
        diceValue
      );

    const nextPawns = {
      ...pawns,

      [currentPlayer]:
        pawns[currentPlayer].map(
          (pawn) =>
            pawn.id === pawnId
              ? updatedPawn
              : pawn
        ),
    };

    /*
      Capture opponents.
    */

    const capturedIds =
      checkCapture(
        updatedPawn,
        nextPawns
      );

    if (
      capturedIds.length > 0
    ) {

      Object.keys(
        nextPawns
      ).forEach(
        (color) => {

          if (
            color === currentPlayer
          ) {
            return;
          }

          nextPawns[color] =
            nextPawns[color].map(
              (pawn) =>
                capturedIds.includes(
                  pawn.id
                )
                  ? {
                      ...pawn,
                      position: -1,
                      finished: false,
                    }
                  : pawn
            );
        }
      );
    }

    setPawns(nextPawns);

    setSelectablePawns([]);

    /*
      Check winner.
    */

    if (
      hasWon(
        nextPawns[currentPlayer]
      )
    ) {

      setTimeout(() => {
        setWinner(
          currentPlayer
        );
      }, 800);

      return;
    }

    /*
      SIX = EXTRA TURN
    */

    if (
      diceValue === 6
    ) {

      setTimeout(() => {

        setCurrentPlayer(
          currentPlayer
        );

      }, 800);

      return;
    }

    /*
      Normal next turn.
    */

    setTimeout(() => {

      setCurrentPlayer(
        getNextPlayer(
          currentPlayer
        )
      );

    }, 800);
  };

  const currentColor =
    COLOR_HEX[currentPlayer];

  const isComputer =
    computerColors.includes(
      currentPlayer
    );

  return (
    <main
      className="game-page"
      style={{
        "--current-player-color":
          currentColor,
      }}
    >

      <audio
        ref={audioRef}
        src={lobbyMusic}
        loop
      />

      <div className="game-atmosphere"></div>

      <header className="game-header">

        <div className="game-title">
          LUDO
        </div>

        <div className="turn-indicator">

          <span
            className={`turn-dot turn-${currentPlayer}`}
          ></span>

          <div>

            <small>
              CURRENT TURN
            </small>

            <strong>
              {currentPlayer.toUpperCase()}
            </strong>

          </div>

        </div>

      </header>

      <section className="game-content">

        <LudoBoard
          pawns={pawns}
          currentPlayer={currentPlayer}
          selectablePawns={
            selectablePawns
          }
          onPawnClick={
            handlePawnClick
          }
        />

      </section>

      <div className="player-type">

        {isComputer
          ? "COMPUTER"
          : "YOUR TURN"}

      </div>

      <DiceVolume
        level={volumeLevel}
        onChange={
          handleVolumeChange
        }
      />

      <GameDice
        dice={dice}
        rolling={rolling}
        disabled={
          isComputer ||
          winner !== null
        }
        onRoll={performRoll}
        isComputer={isComputer}
      />

      {winner && (
        <WinnerOverlay
          winner={winner}
          onGoHome={onGoHome}
        />
      )}

    </main>
  );
}

export default Game;
