import React, { useState, useEffect, memo } from "react";

// Componente TimeBox memorizado para evitar re-renders innecesarios
const TimeBox = memo(({ value, label }) => (
  <div className="flex flex-col items-center justify-center p-2 md:p-4 m-1 md:m-2 bg-gray-800 rounded-lg shadow-lg w-16 md:w-24 h-16 md:h-24">
    <span className="text-xl md:text-3xl font-bold text-yellow-500">{value}</span>
    <span className="text-xs md:text-sm text-yellow-600">{label}</span>
  </div>
));

TimeBox.displayName = "TimeBox";

const CountdownTimer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2025-01-11T18:30:00-06:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    const updateTime = () => {
      const time = calculateTimeLeft();

      // Solo actualizar los estados que han cambiado
      setDays((prev) => (time.days !== prev ? time.days : prev));
      setHours((prev) => (time.hours !== prev ? time.hours : prev));
      setMinutes((prev) => (time.minutes !== prev ? time.minutes : prev));
      setSeconds((prev) => (time.seconds !== prev ? time.seconds : prev));
    };

    // Actualización inicial
    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-dvh  flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl  font-bold mb-4 md:mb-8 text-yellow-700">Días Faltantes</h1>
      <div className="flex items-center justify-center space-x-1 md:space-x-4">
        <TimeBox value={days} label="Días" />
        <TimeBox value={hours} label="Horas" />
        <TimeBox value={minutes} label="Minutos" />
        <TimeBox value={seconds} label="Segundos" />
      </div>
    </div>
  );
};

export default CountdownTimer;
