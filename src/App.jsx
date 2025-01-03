import { useEffect, useRef, useState } from "react";
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
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Crear el elemento de audio
    audioRef.current = new Audio(SONG);
    audioRef.current.loop = true;

    // Manejar el evento visibilitychange
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (isPlaying) {
        audioRef.current.play();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const handleStart = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasStarted(true);
      } catch (error) {
        console.log("Error al reproducir el audio:", error);
      }
    }
  };

  if (!hasStarted) {
    return (
      <div
        onClick={handleStart}
        className="h-dvh w-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 cursor-pointer"
      >
        <div className="envelope-container">
          <i className="fas fa-envelope text-pink-500 text-8xl"></i>
        </div>
        <span className="mt-4 text-3xl font-medium text-gray-700">Toca para empezar</span>
        <style>{`
          .envelope-container {
            width: 10rem;
            height: 10rem;
            background-color: white;
            border-radius: 50%;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: heartbeat 1.5s infinite;
          }

          @keyframes heartbeat {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => {
            if (isPlaying) {
              audioRef.current.pause();
            } else {
              audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
          }}
          className="px-4 py-2 bg-white rounded shadow-md flex items-center space-x-2"
        >
          <span>Audio: </span>
          <span className={isPlaying ? "underline" : ""}>On</span>
          <span className={!isPlaying ? "underline" : ""}>Off</span>
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
