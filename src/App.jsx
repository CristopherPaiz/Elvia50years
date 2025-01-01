import { useEffect, useRef, useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import FondoAnimado from "./components/FondoAnimado";
import LugarFecha from "./components/LugarFecha";
import Pagina1 from "./components/Pagina1";
import Personas from "./components/Personas";
import ScrollDown from "./components/ScrollDown";
import VerticalSlider from "./components/VerticalSlider";
import SONG from "./assets/birthday.mp3";
import SILENCE from "./assets/silence.mp3"; // Archivo de audio silencioso

const App = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const realAudioRef = useRef(null);
  const silentAudioRef = useRef(null);

  useEffect(() => {
    const handleAutoplay = async () => {
      if (silentAudioRef.current) {
        try {
          // Reproducir el audio silencioso para habilitar autoplay
          await silentAudioRef.current.play();
          // Una vez habilitado, reproducir el audio real
          if (realAudioRef.current) {
            await realAudioRef.current.play();
            setIsPlaying(true);
          }
        } catch (error) {
          console.log("Error al reproducir el audio:", error);
          setIsPlaying(false); // Si falla, marcar como no reproduciendo
        }
      }
    };

    handleAutoplay();
  }, []);

  const togglePlayPause = () => {
    if (realAudioRef.current) {
      if (isPlaying) {
        realAudioRef.current.pause();
      } else {
        realAudioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Crear referencias para los audios en el DOM sin etiquetas explícitas */}
      <div ref={silentAudioRef} data-src={SILENCE} style={{ display: "none" }}></div>
      <div ref={realAudioRef} data-src={SONG} style={{ display: "none" }}></div>

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
