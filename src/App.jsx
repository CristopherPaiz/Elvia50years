import { useState, useRef, useEffect } from "react";
import CountdownTimer from "./components/CountdownTimer";
import FondoAnimado from "./components/FondoAnimado";
import LugarFecha from "./components/LugarFecha";
import Pagina1 from "./components/Pagina1";
import Personas from "./components/Personas";
import ScrollDown from "./components/ScrollDown";
import VerticalSlider from "./components/VerticalSlider";
import SONG from "./assets/birthday.mp3";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Verificar si el audio se reproduce automáticamente
  useEffect(() => {
    const checkAutoPlay = () => {
      if (audioRef.current && !audioRef.current.paused) {
        setIsPlaying(true); // Si el audio está reproduciéndose, mantenemos "On"
      } else {
        setIsPlaying(false); // Si no se reproduce, ponemos "Off"
      }
    };

    checkAutoPlay();

    // Escuchar el evento de autoplay fallido y poner en "Off"
    const handleAutoplayError = () => {
      setIsPlaying(false); // Si el autoplay falla, se marca como "Off"
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("play", checkAutoPlay);
      audioElement.addEventListener("error", handleAutoplayError);
    }

    // Cleanup event listeners
    return () => {
      if (audioElement) {
        audioElement.removeEventListener("play", checkAutoPlay);
        audioElement.removeEventListener("error", handleAutoplayError);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Audio element with autoplay and loop */}
      <audio ref={audioRef} src={SONG} autoPlay loop style={{ display: "none" }} />

      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
        {/* Button to toggle play/pause */}
        <button
          onClick={togglePlayPause}
          style={{
            padding: "10px 20px",
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Texto "On / Off" con subrayado dependiendo del estado */}
          <span>Audio: </span>
          <span style={{ textDecoration: isPlaying ? "underline" : "none" }}>On</span>
          <span style={{ marginLeft: "8px", textDecoration: !isPlaying ? "underline" : "none" }}>Off</span>
        </button>
      </div>

      <FondoAnimado />
      <VerticalSlider>
        <Pagina1 />
        <Personas />
        <LugarFecha />
        <CountdownTimer />
      </VerticalSlider>
      <ScrollDown dur={10000} />
    </>
  );
};

export default App;
