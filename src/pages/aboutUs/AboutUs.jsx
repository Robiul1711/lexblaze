import RightSide from "@/components/home/RightSide";
import React from "react";
import bottomImg from "@/assets/images/img6.png";
import aboutus from "@/assets/images/aboutus.png";
import Title48 from "@/components/common/Title48";

const AboutUs = () => {
  return (
    <div className="section-padding-x flex w-full h-full gap-12 mt-[72px]">
      <div className="w-[70%] flex flex-col gap-8">
        <div className="w-full h-full flex justify-center items-center relative">
          <img src={aboutus} alt="About us" className="w-full h-full opacity-40" />
          <div className="absolute top-0 left-0 w-full h-full bg-black/20">
            <div className="flex flex-col items-center mt-8 mb-6 h-full px-4">
              <Title48 title2="Acerca de Nosotros" />
              <div className="text-lg font-semibold text-[#333] text-center mt-10 space-y-4">
                <p>
                  Bienvenido a Bogotá HOY, tu guía esencial para descubrir todo lo que hace única a esta ciudad llena de vida y diversidad! Nos dedicamos a conectar a las personas con el alma de Bogotá, resaltando su riqueza cultural, su historia vibrante y su energía contagiosa, día tras día y durante todo el año.
                </p>
                <p>
                  Desde impresionantes festivales como Rock al Parque y el Festival Iberoamericano de Teatro hasta exposiciones en el Museo del Oro, obras en el Teatro Colón, gastronomía innovadora y una vida nocturna que late en zonas como Zona T, Chapinero y La Candelaria, Bogotá HOY es tu aliado para explorar los eventos más auténticos de la capital. Ya seas rolo, visitante o un viajero curioso, te ayudamos a vivir al máximo cada rincón de esta metrópoli.
                </p>
                <p>
                  Nuestra plataforma es COMPLETAMENTE GRATUITA, tanto para emprendedores y negocios locales como para quienes buscan experiencias memorables. Impulsamos a los creadores a dar visibilidad a sus iniciativas y ofrecemos a bogotanos, turistas y amantes de la cultura un acceso exclusivo a lo mejor de la escena local.
                </p>
                <p>
                  ¿Conoces un evento que merezca ser destacado? ¡Invita a sus organizadores a publicarlo en Bogotá HOY! Juntos podemos celebrar y posicionar a la capital como un epicentro cultural global, reconocido por su creatividad, diversidad y dinamismo.
                </p>
                <p>
                  Amamos Bogotá y nos enorgullece compartir con el mundo su pasión por el arte, su espíritu innovador y la calidez de su gente. Aquí, cada día hay algo nuevo por descubrir, y estamos contigo para no perderte nada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-[30%]">
        <RightSide />
        <div className="pb-6">
          <img src={bottomImg} alt="Sidebar visual" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
