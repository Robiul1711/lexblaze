import logo from "@/assets/images/footerLogo.png";
import TearmAndConditionModal from "@/components/common/TearmAndConditionModal";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { LuInstagram } from "react-icons/lu";
import { IoLogoYoutube } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: ["socialLink"],
    queryFn: async () => {
      const response = await axiosPublic.get("/social-links");
      return response.data; // returns array
    },
  });

  // safely get the first object
  const links = data?.[0];

  const socialLinks = [
    {
      name: "Instagram",
      icon: <LuInstagram size={28} />,
      url: links?.instagram,
    },
    { name: "YouTube", icon: <IoLogoYoutube size={28} />, url: links?.youtube },
    { name: "TikTok", icon: <FaTiktok size={28} />, url: links?.tiktok },
  ];

  return (
    <footer className="bg-secondary text-white pt-28 sm:pt-32 md:pt-30 pb-2 md:pb-10 relative">
      {/* Logo */}
      <div className="absolute top-[-25px] md:top-[-70px] left-1/2 transform -translate-x-1/2 w-[250px] h-[100px] md:w-[450px] md:h-[200px] bg-secondary rounded-[50%] flex items-center justify-center">
        <img
          src={logo}
          alt="Logo"
          className="h-16 sm:h-28 md:h-32 xl:h-40 w-auto"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <p className="text-primary text-sm text-center sm:text-base md:text-xl font-semibold mb-2 md:mb-5 md:mt-8">
          Por favor, no nos contacte sobre eventos, Contacta directamente con la
          empresa del evento
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Contact Info */}
          <div className="space-y-2 md:space-y-4 text-sm sm:text-lg md:text-xl font-bold text-center md:text-left">
            <p>Contactos</p>
            <p>
              Consulta General{" "}
              <a
                href="mailto:Soporte@bogotahoy.co"
                className="hover:text-primary transition-colors"
              >
                Soporte@bogotahoy.co
              </a>
            </p>
            <p>
              Marketing{" "}
              <a
                href="mailto:Marketing@bogotahoy.co"
                className="hover:text-primary transition-colors"
              >
                Marketing@bogotahoy.co
              </a>
            </p>
            <TearmAndConditionModal />
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 md:gap-10">
            {socialLinks.map(
              (link) =>
                link.url && (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.icon}
                  </a>
                )
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-center mt-5 sm:mt-10 md:mt-12 text-primary">
          Todos los eventos en Bogotá. Bogotá vive aquí
        </p>
      </div>
    </footer>
  );
};

export default Footer;
