import { useState, useEffect } from "react";

const getNamesAndPassesFromURL = () => {
  const searchParams = new URLSearchParams(window.location.search);

  // Método 1: Usando URLSearchParams
  const namesFromParams = searchParams.getAll("n").map(decodeURIComponent);

  // Método 2: Usando expresión regular para mayor confiabilidad
  const searchString = window.location.search;
  const namesFromRegex = searchString.match(/[?&]n=([^&]+)/g)?.map((param) => decodeURIComponent(param.split("=")[1])) || [];

  // Método para obtener pases
  const pasesFromParams = searchParams.get("p");
  const pasesFromRegex = searchString.match(/[?&]p=(\d+)/)?.[1];

  // Combinar resultados de nombres
  const names = [...new Set([...namesFromParams, ...namesFromRegex])];

  // Obtener pases, con fallback a 0 si no se encuentra
  const pases = parseInt(pasesFromParams || pasesFromRegex || 0, 10);

  return { names, pases };
};

const LugarFecha = () => {
  const [names, setNames] = useState([]);
  const [pases, setPases] = useState(0);

  useEffect(() => {
    const { names: urlNames, pases: urlPases } = getNamesAndPassesFromURL();
    setNames(urlNames);
    setPases(urlPases);
  }, []);

  const formatNames = (names) => {
    if (names.length === 0) return "Queridos invitados";

    // Función para eliminar títulos de cortesía
    const removeHonorifics = (name) => {
      return name.replace(/(Sr\.|Sra\.)\s*/i, "").trim();
    };

    // Eliminar los títulos de los nombres
    const cleanedNames = names.map(removeHonorifics);

    if (cleanedNames.length === 1) return `${cleanedNames[0]}`;

    const lastName = cleanedNames.pop();
    const lastNamePrefix = lastName.toLowerCase().startsWith("i") ? "e" : "y";
    return `${cleanedNames.join(", ")} ${lastNamePrefix} ${lastName}`;
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "días";
    if (hour < 18) return "tardes";
    return "noches";
  };

  const handleWhatsAppClick = () => {
    const formattedNames = formatNames(names);
    const timeOfDay = getTimeOfDay();

    // Determinar si es una o varias personas
    const invitationText = names.length > 1 ? "Confirmamos nuestra" : "Confirmo mi";

    // Mensaje a enviar
    const encodedMessage = encodeURIComponent(
      `Buenas ${timeOfDay}, ${formattedNames}. ${invitationText} asistencia a la celebración. ¡Gracias por la invitación!`
    );

    window.open(`https://wa.me/50230369227?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="flex justify-center items-center min-h-dvh">
      <div className="max-w-md w-full m-4 p-10 rounded-lg shadow-lg bg-white/40 backdrop-blur-sm border-[3px] border-white">
        <h2 className="text-4xl font-bold text-center mb-12 mt-4 text-yellow-800">Lugar y Fecha</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-3 text-yellow-800  p-2 rounded-lg">
            <i className="fas fa-calendar w-5 h-5 mt-1" />
            <p>Sábado 11 de enero de 2025</p>
          </div>

          <div className="flex items-center gap-3 text-yellow-800  p-2 rounded-lg">
            <i className="fas fa-clock w-5 h-5 mt-1" />
            <p>6:30 P.M</p>
          </div>

          <div className="flex items-center gap-3 text-yellow-800  p-1 rounded-lg">
            <i className="fas fa-map-marker-alt w-5 h-5 mt-1" />
            <p>
              La Casita P&R
              <br />
              11 calle D12-98 Zona 1<br />
              <strong className="text-sm italic">(A 70 metros del parque Thelma Quixtán)</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 text-yellow-800 bg-white p-2 rounded-lg">
            <i className="fas fa-gift w-5 h-5 mt-2" />
            <span>
              Pase para:{" "}
              <b className="font-black text-lg">
                {pases === 0 ? 1 : pases} {pases === 1 || pases === 0 ? "persona" : "personas"}
              </b>
            </span>
          </div>

          <div className="py-2 px-2 bg-pink-50 rounded-lg text-center text-purple-700">
            <hr className="my-4" />
            <p className="text-lg mt-2 mb-2 text-semibold text-balance">Si deseas hacerme un obsequio, agradecería que fuera en efectivo.</p>
            <hr className="my-4" />
          </div>

          <div className="space-y-3 mt-6">
            <a
              href="https://maps.app.goo.gl/J26ThahGPaP7GdM3A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <i className="fas fa-map-marked-alt w-5 h-5" />
              Cómo llegar
            </a>

            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <i className="fab fa-whatsapp w-5 h-5" />
              Confirmar Asistencia
            </button>
          </div>

          <div className="w-full flex justify-center items-center">
            <span className="text-center text-sm text-yellow-800 mt-4 bg-yellow-50/80 px-4 py-2 rounded-lg">
              *Por favor confirmar antes del 8 de enero
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LugarFecha;
