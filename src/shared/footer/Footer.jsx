import logo from "@/assets/images/footerLogo.png";
import { TiktokIcons, YoutubeIcons } from "@/lib/Icons";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white  pt-28 sm:pt-32 md:pt-30 pb-2 md:pb-10 relative">
      {/* Logo in a curved container - Responsive sizing */}
      <div className="absolute top-[-25px] md:top-[-70px] left-1/2 transform -translate-x-1/2 w-[250px] h-[100px] md:w-[450px] md:h-[200px] bg-secondary rounded-[50%] flex items-center justify-center">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-16 sm:h-28 md:h-32 xl:h-40 w-auto" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Notice - Responsive text and spacing */}
        <p className="text-primary text-sm text-center sm:text-base  md:text-xl font-semibold mb-2 md:mb-5 md:mt-8 ">
          Por favor, no nos contacte sobre eventos, Contacta directamente con la empresa del evento
        </p>

        {/* Bottom Row - Flex direction changes on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
          {/* Contact Info - Text sizing and spacing */}
          <div className="space-y-2 md:space-y-4 text-sm sm:text-lg md:text-xl font-bold text-center md:text-left">
            <p>Contactos</p>
            <p>
              Consulta General{" "}
              <a href="mailto:BogotaHoy@gmail.com" className="hover:text-primary transition-colors">
                BogotaHoy@gmail.com
              </a>
            </p>
            <p>
              Marketing{" "}
              <a href="mailto:BogotaHoyMkt@gmail.com" className="hover:text-primary transition-colors">
                BogotaHoyMkt@gmail.com
              </a>
            </p>
            <p className="underline hover:text-primary">Términos y Condiciones</p>
          </div>

          {/* Social Icons - Centered on mobile, normal on desktop */}
          <div className="flex gap-6 md:gap-10">
            <a href="https://www.tiktok.com/" target="_blank" aria-label="TikTok" className="hover:opacity-80 transition-opacity">
              <TiktokIcons className="w-8 h-8 md:w-auto md:h-auto" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
              <YoutubeIcons className="w-8 h-8 md:w-auto md:h-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;