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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") navigateSlide(-1);
      if (e.key === "ArrowDown") navigateSlide(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const handleTouchStart = (e) => {
    if (isInteractiveElement(e.target)) return; // Permite la interacción
    setTouchEnd(null); // Reinicia el punto final
    setTouchStart(e.targetTouches[0].clientY); // Obtén la posición inicial
  };

  const handleTouchMove = (e) => {
    if (isInteractiveElement(e.target)) return; // Permite la interacción
    setTouchEnd(e.targetTouches[0].clientY); // Actualiza la posición final
    e.preventDefault(); // Previene el comportamiento predeterminado
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) navigateSlide(1);
    if (isDownSwipe) navigateSlide(-1);
  };

  const isInteractiveElement = (element) => {
    const interactiveTags = ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT", "LABEL"];
    return interactiveTags.includes(element.tagName) || element.closest("[data-interactive]");
  };

  useEffect(() => {
    const preventPullToRefresh = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch.clientY < 50) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("touchmove", preventPullToRefresh, { passive: false });
    return () => window.removeEventListener("touchmove", preventPullToRefresh);
  }, []);

  useEffect(() => {
    document.body.style.overscrollBehavior = "none";

    const preventDefault = (e) => e.preventDefault();

    window.addEventListener("touchstart", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("touchend", preventDefault, { passive: false });

    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);
    document.addEventListener("gestureend", preventDefault);

    return () => {
      document.body.style.overscrollBehavior = "auto";

      window.removeEventListener("touchstart", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("touchend", preventDefault);

      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
      document.removeEventListener("gestureend", preventDefault);
    };
  }, []);

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

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
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
