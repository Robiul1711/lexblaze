import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Spinner from "./Spinner";
import dayjs from "dayjs";

const SearchModal = ({ search, setSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // Obtener resultados de búsqueda
  const { 
    data: searchResults, 
    isLoading, 
    isError,
    error 
  } = useQuery({
    queryKey: ["searchEvents", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return { events: [] };
      try {
        const response = await axiosPublic.post(`/event/show`, {
          search: searchQuery,
        });
        return response.data || { events: [] };
      } catch (err) {
        console.error("Error de búsqueda:", err);
        throw err;
      }
    },
    enabled: !!searchQuery.trim() && isOpen,
    retry: 1,
    refetchOnWindowFocus: false
  });

  // Reiniciar búsqueda cuando cambia la ruta
  useEffect(() => {
    setSearchQuery("");
    setSearch("");
  }, [pathname, setSearch]);

  // Debounce: Retrasar la actualización de la búsqueda por 1 segundo (solo en página principal)
  useEffect(() => {
    if (pathname !== "/") return;

    const delayDebounce = setTimeout(() => {
      setSearch(searchQuery);
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, setSearch, pathname]);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
    setIsOpen(false);
  };

  // Formatear hora en formato 24 horas
  const formatTime = (timeString) => {
    return dayjs(timeString, "HH:mm").format("HH:mm");
  };

  return (
    <div className="relative">
      {/* Botón de búsqueda */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100/20 transition-colors"
        aria-label="Abrir búsqueda"
      >
        <Search className="size-6 md:size-8 lg:size-10" />
      </button>

      {/* Modal de búsqueda */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in max-h-[80vh] overflow-hidden"
          >
            <form onSubmit={handleSearch} className="p-4">
              <div className="flex items-center border-b-2 border-gray-200 pb-3">
                <Search className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar eventos, lugares o categorías..."
                  className="w-full outline-none text-gray-800 placeholder-gray-400 text-base"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Resultados de búsqueda */}
            <div className="overflow-y-auto max-h-[60vh]">
              {isLoading ? (
                <div className="flex justify-center p-6">
                  <Spinner />
                </div>
              ) : isError ? (
                <div className="p-6 text-center text-red-500">
                  <p className="font-medium">Error al cargar resultados</p>
                  <p className="text-sm mt-1">{error.message}</p>
                </div>
              ) : searchResults?.events?.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {searchResults.events.map((event) => (
                    <li key={event.id} className="hover:bg-gray-50 transition-colors">
                      <Link
                        to={`/event-user-view/${event.id}`}
                        className="block p-4"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={event.flyer || 'https://via.placeholder.com/100'}
                              alt={event.event_title}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                  {event.event_title || 'Evento sin título'}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {event.business_name || 'Negocio desconocido'}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                  {event.price_limite || 'Gratis'}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-xs text-gray-500 flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5 mr-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {event.business_address || 'Dirección no disponible'}
                                </p>
                              </div>
                              <p className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                {event.event_start_time && formatTime(event.event_start_time)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : searchQuery.trim() ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500 font-medium">No se encontraron eventos</p>
                  <p className="text-sm text-gray-400 mt-1">
                    No hay resultados para "{searchQuery}"
                  </p>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500 font-medium">Buscar eventos</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Escribe para encontrar eventos, lugares o categorías
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;