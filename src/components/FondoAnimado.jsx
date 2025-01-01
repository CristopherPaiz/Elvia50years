import { memo } from "react";
const FondoAnimado = memo(() => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-yellow-100/50 via-red-100/50 to-violet-200/50 animate-gradient-blur">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <i
            key={i}
            className={`fa fa-${["gift", "heart", "birthday-cake"][i % 3]} absolute text-violet-400/70`}
            style={{
              fontSize: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
              animation: `float-icons ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * -5}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes gradient-blur {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        @keyframes float-icons {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(25deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .animate-gradient-blur {
          animation: gradient-blur 15s ease infinite;
        }
      `}</style>
    </div>
  );
});

FondoAnimado.displayName = "FondoAnimado";

export default FondoAnimado;
