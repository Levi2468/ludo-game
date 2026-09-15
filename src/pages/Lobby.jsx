import { useRef, useState } from "react";

import "./Lobby.css";

import PlayerSelector from "../components/PlayerSelector";
import DiceVolume from "../components/DiceVolume";

import lobbyMusic from "../assets/audio/lobby-music.mp3";

function Lobby({ onStartGame }) {
  const [gameSetupOpen, setGameSetupOpen] = useState(false);

  // Number of HUMAN players
  const [players, setPlayers] = useState(1);

  // Start at maximum volume
  const [volumeLevel, setVolumeLevel] = useState(6);

  const audioRef = useRef(null);

  const handlePlay = () => {
    setGameSetupOpen(true);

    if (audioRef.current) {
      audioRef.current.volume = volumeLevel / 6;
      audioRef.current.muted = volumeLevel === 0;

      audioRef.current
        .play()
        .catch((error) => {
          console.log("Audio could not start:", error);
        });
    }
  };

  const handleVolumeChange = (newLevel) => {
    setVolumeLevel(newLevel);

    if (audioRef.current) {
      audioRef.current.volume = newLevel / 6;
      audioRef.current.muted = newLevel === 0;
    }
  };

  const handleLetsRoll = () => {
    const computers = 4 - players;

    onStartGame({
      humans: players,
      computers,
    });
  };

  return (
    <main className="lobby">

      <audio
        ref={audioRef}
        src={lobbyMusic}
        loop
      />

      <div
        className={`play-area ${
          gameSetupOpen ? "setup-open" : ""
        }`}
      >

        <button
          className="play-button"
          onClick={handlePlay}
        >
          PLAY
        </button>

        <div className="customization-panel">

          <h2>Choose Players</h2>

          <PlayerSelector
            players={players}
            setPlayers={setPlayers}
          />

          <p className="player-info">
            {players} Human
            {players !== 1 ? "s" : ""}
            {" + "}
            {4 - players} Computer
            {4 - players !== 1 ? "s" : ""}
          </p>

        </div>
      </div>

      {gameSetupOpen && (
        <>
          <DiceVolume
            level={volumeLevel}
            onChange={handleVolumeChange}
          />

          <button
            className="lets-roll-button"
            onClick={handleLetsRoll}
          >
            LET'S ROLL
            <span>➜</span>
          </button>
        </>
      )}

    </main>
  );
}

export default Lobby;