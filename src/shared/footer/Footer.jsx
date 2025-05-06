import logo from "@/assets/images/footerLogo.png";
import { TiktokIcons, YoutubeIcons } from "@/lib/Icons";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white px-4 sm:px-6 pt-28 sm:pt-32 md:pt-40 pb-5 md:pb-10 relative">
      {/* Logo in a curved container - Responsive sizing */}
      <div className="absolute top-[-60px] md:top-[-100px] left-1/2 transform -translate-x-1/2 w-[300px] h-[150px] md:w-[500px] md:h-[250px] bg-secondary rounded-[50%] flex items-center justify-center">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-24 sm:h-28 md:h-auto w-auto" 
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Notice - Responsive text and spacing */}
        <p className="text-primary text-center text-base sm:text-lg md:text-xl font-semibold mb-8 md:mb-10 px-2">
          Por favor, no nos contacte sobre eventos, Contacta directamente con la empresa del evento
        </p>

        {/* Bottom Row - Flex direction changes on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-6">
          {/* Contact Info - Text sizing and spacing */}
          <div className="space-y-4 md:space-y-6 sm:text-lg md:text-xl lg:text-2xl font-bold text-center md:text-left">
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
            <p className="underline cursor-pointer hover:text-primary">Términos y Condiciones</p>
          </div>

          {/* Social Icons - Centered on mobile, normal on desktop */}
          <div className="flex gap-8 md:gap-14">
            <a href="https://www.tiktok.com/" target="_blank" aria-label="TikTok" className="hover:opacity-80 transition-opacity">
              <TiktokIcons className="w-10 h-10 md:w-auto md:h-auto" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
              <YoutubeIcons className="w-10 h-10 md:w-auto md:h-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;