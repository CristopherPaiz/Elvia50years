import { memo } from "react";
import TextoAnimado from "./TextoAnimado";

const Pagina1 = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className="h-[100px] flex justify-start flex-col">
        <TextoAnimado dur={5000} delay={1000}>
          <p className="handlee-regular text-4xl text-yellow-700">¡Brindemos por los</p>
        </TextoAnimado>
        <TextoAnimado dur={5000} delay={2000}>
          <p className="kaushan-script-regular text-7xl text-yellow-500 font-bold mt-0">50 Años!</p>
        </TextoAnimado>
      </div>
    </div>
  );
});

Pagina1.displayName = "Pagina1";

export default Pagina1;
