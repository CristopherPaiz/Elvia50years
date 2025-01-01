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
    if (e.target.tagName === "BUTTON") return; // Permite interacción con botones
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (e.target.tagName === "BUTTON") return; // Permite interacción con botones
    setTouchEnd(e.targetTouches[0].clientY);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) navigateSlide(1);
    if (isDownSwipe) navigateSlide(-1);
  };

  useEffect(() => {
    const preventPullToRefresh = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (touch.clientY < 50) e.preventDefault();
      }
    };

    window.addEventListener("touchmove", preventPullToRefresh, { passive: false });
    return () => window.removeEventListener("touchmove", preventPullToRefresh);
  }, []);

  return (
    <div
      className="h-dvh w-full relative overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
