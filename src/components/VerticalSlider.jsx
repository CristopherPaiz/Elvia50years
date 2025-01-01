import { useState, useEffect, Children } from "react";

const VerticalSlider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50; // Distancia mínima para reconocer el deslizamiento

  const navigateSlide = (direction) => {
    if (isTransitioning) return;
    const totalSlides = Children.count(children);

    const nextSlide = currentSlide + direction;
    if (nextSlide >= 0 && nextSlide < totalSlides) {
      setIsTransitioning(true);
      setCurrentSlide(nextSlide);
      setTimeout(() => setIsTransitioning(false), 300); // Tiempo de transición
    }
  };

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") navigateSlide(-1);
      if (e.key === "ArrowDown") navigateSlide(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Manejo del inicio del deslizamiento táctil
  const handleTouchStart = (e) => {
    setTouchEnd(null); // Reinicia el punto final
    setTouchStart(e.targetTouches[0].clientY); // Obtén la posición inicial
  };

  // Manejo del movimiento táctil
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY); // Actualiza la posición final
    e.preventDefault(); // Previene el comportamiento predeterminado
  };

  // Manejo del final del deslizamiento táctil
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) navigateSlide(1);
    if (isDownSwipe) navigateSlide(-1);
  };

  // Previene el comportamiento de pull to refresh
  useEffect(() => {
    const preventPullToRefresh = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch.clientY < 50) {
          // Ajusta este valor según sea necesario
          e.preventDefault();
        }
      }
    };

    window.addEventListener("touchmove", preventPullToRefresh, { passive: false });
    return () => window.removeEventListener("touchmove", preventPullToRefresh);
  }, []);

  // Previene completamente el pull to refresh y comportamientos por defecto
  useEffect(() => {
    // Previene el pull to refresh
    const preventPullToRefresh = (e) => {
      e.preventDefault();
    };

    // Desactiva el scroll elástico en Safari
    document.body.style.overscrollBehavior = "none";

    // Listeners para prevenir diferentes comportamientos
    window.addEventListener("touchstart", preventPullToRefresh, { passive: false });
    window.addEventListener("touchmove", preventPullToRefresh, { passive: false });
    window.addEventListener("touchend", preventPullToRefresh, { passive: false });

    // Previene el zoom en dispositivos móviles
    document.addEventListener("gesturestart", (e) => e.preventDefault());
    document.addEventListener("gesturechange", (e) => e.preventDefault());
    document.addEventListener("gestureend", (e) => e.preventDefault());

    return () => {
      // Restaura los estilos y remueve los listeners
      document.body.style.overscrollBehavior = "auto";

      window.removeEventListener("touchstart", preventPullToRefresh);
      window.removeEventListener("touchmove", preventPullToRefresh);
      window.removeEventListener("touchend", preventPullToRefresh);

      document.removeEventListener("gesturestart", (e) => e.preventDefault());
      document.removeEventListener("gesturechange", (e) => e.preventDefault());
      document.removeEventListener("gestureend", (e) => e.preventDefault());
    };
  }, []);

  // Añade estos estilos globales (puedes ponerlos en un archivo CSS global)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html, body {
        overscroll-behavior: none;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className="h-dvh w-full relative overflow-hidden touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // Añade estos props para prevenir comportamientos por defecto
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {Children.map(children, (child, index) => (
        <div
          key={index}
          style={{
            display: index === currentSlide ? "block" : "none",
          }}
          className="h-dvh w-full"
        >
          {child}
        </div>
      ))}

      {/* Botones de navegación */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {Children.map(children, (_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentSlide(index)}
            className={`size-4 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-yellow-500 scale-150" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalSlider;
