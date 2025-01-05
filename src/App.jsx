import { useEffect, useRef, useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import FondoAnimado from "./components/FondoAnimado";
import LugarFecha from "./components/LugarFecha";
import Pagina1 from "./components/Pagina1";
import Personas from "./components/Personas";
import ScrollDown from "./components/ScrollDown";
import VerticalSlider from "./components/VerticalSlider";
import SONG from "./assets/birthday.mp3";
import MisaCard from "./components/MisaCard";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio(SONG);
    audioRef.current.loop = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audioRef.current.paused) {
          wasPlayingRef.current = true;
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else if (wasPlayingRef.current) {
        audioRef.current.play().catch((e) => console.log("Error resuming audio:", e));
        setIsPlaying(true);
        wasPlayingRef.current = false;
      }
    };

    const handleBlur = () => {
      if (!audioRef.current.paused) {
        wasPlayingRef.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleFocus = () => {
      if (wasPlayingRef.current) {
        audioRef.current.play().catch((e) => console.log("Error resuming audio:", e));
        setIsPlaying(true);
        wasPlayingRef.current = false;
      }
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    // Page Visibility API para mobile
    document.addEventListener("pause", handleBlur);
    document.addEventListener("resume", handleFocus);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("pause", handleBlur);
      document.removeEventListener("resume", handleFocus);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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
              wasPlayingRef.current = false;
            } else {
              audioRef.current.play().catch((e) => console.log("Error playing audio:", e));
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
        <MisaCard />
        <LugarFecha />
        <CountdownTimer />
      </VerticalSlider>
      <ScrollDown dur={20000} />
    </>
  );
};

export default App;
