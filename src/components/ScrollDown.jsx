import React, { useEffect, useState } from "react";

const ScrollDown = ({ dur = 10000 }) => {
  const [showText, setShowText] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    // Ocultar el texto después de 5 segundos
    const textTimer = setTimeout(() => setShowText(false), dur / 2);

    // Ocultar el icono después de dur
    const iconTimer = setTimeout(() => setShowIcon(false), dur);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(iconTimer);
    };
  }, [dur]);

  return (
    <>
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      {showIcon && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {showText && (
            <span
              style={{
                fontSize: "14px",
                color: "#333",
                marginBottom: "8px",
                animation: "fadeOut 5s ease-in-out forwards",
              }}
            >
              Desplaza hacia abajo
            </span>
          )}
          <i
            className="fas fa-chevron-down"
            style={{
              fontSize: "24px",
              color: "#333",
              animation: "bounce 1s infinite",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ScrollDown;
