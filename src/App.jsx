import { useState } from "react";

import "./App.css";

import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

function App() {
  const [page, setPage] = useState("lobby");

  const [gameSetup, setGameSetup] = useState({
    humans: 1,
    computers: 3,
  });

  const handleStartGame = (setup) => {
    setGameSetup(setup);
    setPage("game");
  };

  const handleGoHome = () => {
    setPage("lobby");
  };

  return (
    <>
      {page === "lobby" && (
        <Lobby onStartGame={handleStartGame} />
      )}

      {page === "game" && (
        <Game
          gameSetup={gameSetup}
          onGoHome={handleGoHome}
        />
      )}
    </>
  );
}

export default App;