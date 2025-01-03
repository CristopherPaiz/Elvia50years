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

  const handleFirstInteraction = async (e) => {
    // Solo activamos el audio en el click/tap final, no en el scroll o deslizamiento
    if (e.type === "click") {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log("Error al reproducir el audio:", error);
      } finally {
        setShowOverlay(false);
      }
    }
  };

  const handleTouchStart = (e) => {
    // Permitir que el evento touchstart se propague
    e.stopPropagation();
  };

  const handleTouchMove = (e) => {
    // Permitir que el evento touchmove se propague
    e.stopPropagation();
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
      {/* Div invisible que permite deslizamiento */}
      {showOverlay && (
        <div
          onClick={handleFirstInteraction}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            touchAction: "auto", // Permite el comportamiento táctil normal
            pointerEvents: "auto", // Permite interacciones pero mantiene la transparencia
          }}
        />
      )}

      <audio ref={audioRef} src={SONG} loop preload="auto" style={{ display: "none" }} />

      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
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
