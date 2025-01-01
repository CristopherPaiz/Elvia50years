import React, { useState, useEffect } from "react";

const TextoAnimado = ({ children, dur = 5000, delay = 1000 }) => {
  const [isStarted, setIsStarted] = useState(false);

  const wrapLettersInSpan = (text) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block"
        style={{
          animationDelay: `${index * 50}ms`,
          opacity: 0,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const createPartialChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (typeof child === "string") {
        return wrapLettersInSpan(child);
      } else if (React.isValidElement(child)) {
        const childContent = child.props.children;
        return React.cloneElement(
          child,
          {
            className: `${child.props.className || ""}`, // Mantener las clases originales
            style: {
              ...child.props.style,
            },
          },
          wrapLettersInSpan(childContent)
        );
      }
      return child;
    });
  };

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  return (
    <div className="flex items-center justify-center">
      <div className={`text-center transition-all duration-500 ${isStarted ? "opacity-100" : "opacity-0"}`}>
        {isStarted && createPartialChildren(children)}
        <style>{`
          span {
            animation: waveEffect 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            display: inline-block;
            transform-origin: 50% 100%;
            white-space: pre;
          }

          @keyframes waveEffect {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0);
            }
            50% {
              opacity: 0.5;
              transform: translateY(-5px) scale(1.1);
            }
            75% {
              opacity: 0.75;
              transform: translateY(2px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TextoAnimado;
