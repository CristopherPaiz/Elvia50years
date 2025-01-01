import React, { useState, useEffect, Children } from "react";

const VerticalSlider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50; // Distancia mínima para reconocer el deslizamiento

  // Prevenir scroll por defecto
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      // Prevenir el scroll por defecto
      e.preventDefault();

      // Navegación basada en la dirección del scroll
      if (e.deltaY > 0) {
        navigateSlide(1); // Scroll hacia abajo
      } else if (e.deltaY < 0) {
        navigateSlide(-1); // Scroll hacia arriba
      }
    };

    // Opciones para el event listener
    const options = {
      passive: false, // Importante para poder llamar preventDefault()
    };

    // Agregar event listener para wheel
    window.addEventListener("wheel", preventScroll, options);

    // Limpiar el event listener
    return () => {
      window.removeEventListener("wheel", preventScroll, options);
    };
  }, [currentSlide]); // Dependencia para actualizar con el slide actual

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

  // Resto del código del componente permanece igual...

  return (
    <div className="h-dvh w-full relative overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
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
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {Children.map(children, (_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
