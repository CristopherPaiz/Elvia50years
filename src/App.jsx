import { useRef, useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import FondoAnimado from "./components/FondoAnimado";
import LugarFecha from "./components/LugarFecha";
import Pagina1 from "./components/Pagina1";
import Personas from "./components/Personas";
import ScrollDown from "./components/ScrollDown";
import VerticalSlider from "./components/VerticalSlider";
import SONG from "./assets/birthday.mp3";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const audioRef = useRef(null);
  const touchStartY = useRef(null);
  const hasInteractedRef = useRef(false);

  const tryPlayAudio = async () => {
    if (!hasInteractedRef.current && audioRef.current) {
      hasInteractedRef.current = true;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Error al reproducir el audio:", error);
      } finally {
        setShowOverlay(false);
      }
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;

    const currentY = e.touches[0].clientY;
    const diff = Math.abs(currentY - touchStartY.current);

    // Si el usuario ha deslizado más de 10px, consideramos que es un deslizamiento intencional
    if (diff > 10) {
      tryPlayAudio();
    }
  };

  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log("Error al toggle audio:", error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
          pointerEvents: showOverlay ? "auto" : "none",
          touchAction: "pan-y", // Permite el deslizamiento vertical
        }}
      />

      <audio ref={audioRef} src={SONG} loop preload="auto" style={{ display: "none" }} />

      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10000 }}>
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
      <ScrollDown dur={20000} />
    </>
  );
};

export default App;
