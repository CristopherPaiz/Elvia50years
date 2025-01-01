import { useEffect, useRef, useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import FondoAnimado from "./components/FondoAnimado";
import LugarFecha from "./components/LugarFecha";
import Pagina1 from "./components/Pagina1";
import Personas from "./components/Personas";
import ScrollDown from "./components/ScrollDown";
import VerticalSlider from "./components/VerticalSlider";
import SONG from "./assets/birthday.mp3";
import SILENCE from "./assets/silence.mp3"; // Archivo de silencio

const App = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const realAudioRef = useRef(null);

  useEffect(() => {
    // Autoplay usando iframe con audio silencioso
    const silentIframe = document.createElement("iframe");
    silentIframe.src = SILENCE;
    silentIframe.allow = "autoplay";
    silentIframe.style.display = "none";
    document.body.appendChild(silentIframe);

    // Intentar reproducir el audio real después del iframe
    silentIframe.onload = () => {
      if (realAudioRef.current) {
        realAudioRef.current.play().catch(() => {
          setIsPlaying(false); // Si no se puede reproducir, desactivamos "On"
        });
      }
    };

    return () => {
      document.body.removeChild(silentIframe); // Eliminar iframe al desmontar
    };
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
      {/* Audio real para reproducción */}
      <audio ref={realAudioRef} src={SONG} loop style={{ display: "none" }} />

      {/* Botón para controlar el audio */}
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

      {/* Contenido principal */}
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
