import { useEffect, useState, memo } from "react";
import borde from "../assets/borde.webp";
import Elvia from "../assets/Elvia.jpg";

const getNamesFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const namesFromParams = urlParams.getAll("n").map(decodeURIComponent);
  const searchString = window.location.search;
  const namesFromRegex = searchString.match(/[?&]n=([^&]+)/g)?.map((param) => decodeURIComponent(param.split("=")[1])) || [];

  return [...new Set([...namesFromParams, ...namesFromRegex])];
};

const Personas = memo(() => {
  const [names, setNames] = useState([]);
  const [isMultiple, setIsMultiple] = useState(false); // Nueva variable

  useEffect(() => {
    const detectedNames = getNamesFromURL();
    setNames(detectedNames);

    // Verificar si hay más de un nombre
    setIsMultiple(detectedNames.length > 1);
  }, []);

  const formatNames = (names) => {
    if (names.length === 0) return "¡Hola!";
    if (names.length === 1) return `¡Hola, ${names[0]}!`;
    const lastName = names.pop();
    return `¡Hola, ${names.join(", ")} y ${lastName}!`;
  };

  return (
    <div className="flex justify-center items-center h-dvh w-full relative">
      <div className="-z-10 absolute top-0 left-0 w-full h-full">
        <img
          className="w-full h-full object-contain"
          src={borde}
          style={{
            aspectRatio: "1368/2000",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 p-14">
        <div className="sm:max-w-[350px]">
          <div className="-mt-6 mb-3 w-full flex justify-center items-center">
            <img className="size-24 rounded-full border-2 border-yellow-600" src={Elvia} alt="Foto de perfil" />
          </div>
          <div className="text-center text-xl font-semibold mb-4">
            <p className="text-bold text-2xl italic text-wrap mb-2">{formatNames(names)}</p>
            {isMultiple ? "Los invitamos" : "Te invitamos"} a celebrar los 50 años de nuestra querida madre.
          </div>

          <div className="text-center text-lg font-medium ">
            <span className="nombreElvia text-6xl mb-4 text-yellow-600">Elvia Paiz</span>
            <p>¡Nos encantaría que nos acompañaran en este día tan especial!</p>
          </div>
        </div>
      </div>
    </div>
  );
});

Personas.displayName = "Personas";

export default Personas;
