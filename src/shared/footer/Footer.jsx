import logo from "@/assets/images/footerLogo.png";
import { TiktokIcons, YoutubeIcons } from "@/lib/Icons";

const Footer = () => {
  return (
    // mt-40
    <footer className="bg-secondary  text-white px-6 pt-40 pb-10 relative">
      {/* Logo in a curved container */}
      <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[500px] h-[250px] bg-secondary rounded-[50%] flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-auto w-auto" />
      </div>

      <div className="section-padding-x  mx-auto">
        {/* Notice */}
        <p className="text-primary text-center text-base md:text-xl font-semibold mb-10">
          Por favor, no nos contacte sobre eventos, Contacta directamente con la empresa del evento
        </p>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Contact Info */}
          <div className="space-y-6 text-2xl md:text-base font-bold">
            <p className="">Contactos</p>
            <p>
              Consulta General{" "}
              <a href="mailto:BogotaHoy@gmail.com" >
                BogotaHoy@gmail.com
              </a>
            </p>
            <p>
              Marketing{" "}
              <a href="mailto:BogotaHoyMkt@gmail.com" className="" >
                BogotaHoyMkt@gmail.com
              </a>
            </p>
            <p className="underline cursor-pointer">Términos y Condiciones</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-14">
            <a href="#" aria-label="TikTok">
              <TiktokIcons />
            </a>
            <a href="#" aria-label="YouTube">
              <YoutubeIcons />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
