import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { DeleteIcon, EditIcon2 } from "@/lib/Icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import DeleteModal from "../DeleteModal";

const EventCard = ({ visibleCards }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) => {
      return await axiosSecure.post(`/event/destroy/${eventId}`);
    },
    onSuccess: () => {
      toast.success("Event deleted successfully!");
      queryClient.invalidateQueries(["events"]);
      setIsDialogOpen(false);
      setSelectedEventId(null);
    },
    onError: () => {
      toast.error("Failed to delete event.");
    },
  });

  const handleDeleteClick = (id) => {
    setSelectedEventId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEventId) {
      deleteEventMutation.mutate(selectedEventId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is today
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    const options = { day: "2-digit", month: "short" };
    const parts = date
      .toLocaleDateString("es-ES", options)
      .split(" ")
      .map((part) => part.toLowerCase());
    const formattedDate = `${parts[1]} ${parts[0]}`;
    
    if (checkDate.getTime() === today.getTime()) {
      return `Hoy ${formattedDate}`;
    }
    
    return formattedDate;
  };

  const getEventDateLabel = (eventDates) => {
    if (!eventDates || eventDates.length === 0) return null;

    const dates = eventDates
      .map((d) => new Date(d?.date))
      .filter((d) => d instanceof Date && !isNaN(d))
      .sort((a, b) => a - b);

    if (dates.length === 0) return null;

    const formatDate = (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      
      const options = { day: "2-digit", month: "short" };
      const parts = date
        .toLocaleDateString("es-ES", options)
        .split(" ")
        .map((part) => part.toLowerCase());
      const formattedDate = `${parts[1]} ${parts[0]}`;
      
      if (checkDate.getTime() === today.getTime()) {
        return `Hoy ${formattedDate}`;
      }
      return formattedDate;
    };

    if (dates.length === 1) {
      return formatDate(dates[0]);
    }

    const allSameDay = dates.every(
      (date) => date.getDay() === dates[0].getDay()
    );

    if (allSameDay) {
      const weekdaysES = [
        "Domingos",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábados",
      ];
      return `Todos los ${weekdaysES[dates[0].getDay()]}`;
    }

    // Check if dates form a continuous range (no missing days)
    let isContinuous = true;
    for (let i = 1; i < dates.length; i++) {
      const diffInDays =
        (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
      if (diffInDays !== 1) {
        isContinuous = false;
        break;
      }
    }

    if (isContinuous) {
      const last = dates[dates.length - 1];
      return `Hasta ${formatDate(last)}`;
    }

    return formatDate(dates[dates.length - 1]);
  };

  // Sort events with today's events first
  const sortedEvents = [...visibleCards].sort((a, b) => {
    const dateA = a.event_dates[0]?.date ? new Date(a.event_dates[0].date) : null;
    const dateB = b.event_dates[0]?.date ? new Date(b.event_dates[0].date) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const isAToday = dateA && new Date(dateA).setHours(0, 0, 0, 0) === today.getTime();
    const isBToday = dateB && new Date(dateB).setHours(0, 0, 0, 0) === today.getTime();
    
    if (isAToday && !isBToday) return -1;
    if (!isAToday && isBToday) return 1;
    return 0;
  });

  return (
    <>
      <DeleteModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={confirmDelete}
        isLoading={deleteEventMutation.isLoading}
      />

      <div className="flex flex-col mt-10">
        {sortedEvents?.map((item) => (
          <div key={item.id}>
            <h1 className="text-[#333] text-xl sm:text-2xl xlg:text-[30px] font-belanosima font-bold text-center mb-3 sm:mb-4">
              {item.event_dates[0]?.date ? formatDate(item.event_dates[0].date) : "N/A"}
            </h1>
            <div className="relative rounded mx-auto overflow-hidden shadow-lg mb-5 max-w-[625px] w-full sm:mb-7">
              <div className="w-full h-[200px] sm:h-[250px]">
                <img
                  src={item.flyer ? item.flyer : item.event_thumb_image}
                  alt={item.title}
                  className="w-full h-full object-fill"
                />
              </div>

              <div className="absolute bg-black/60 top-0 left-0 w-full h-full">
                {item.event_dates && item.event_dates.length > 0 && (
                  <div className="absolute top-0 right-0">
                    <button className="bg-primary text-[#F12617] p-1 text-sm sm:text-base sm:p-2 font-bold">
                      {getEventDateLabel(item.event_dates)}
                    </button>
                  </div>
                )}
                <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
                  {item.button && (
                    <div className="absolute top-0 right-0">
                      <button className="bg-primary text-[#F12617] p-3 font-bold">
                        {item.button}
                      </button>
                    </div>
                  )}

                  <div className="space-y-1 sm:space-y-4">
                    <p className="sm:text-lg text-white font-semibold">
                      {item.business_name}
                    </p>
                    <div className="flex items-center justify-between">
                      <h2 className="text-[20px] md:text-[32px] lg:text-xl xlg:text-[32px] text-white font-extrabold">
                        {item.event_title}
                      </h2>
                      {pathname === "/venue-profile-edit" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Link to={`/update-event/${item.id}`} className="cursor-pointer">
                                <EditIcon2 />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-primary text-[#F12617] p-3 font-bold">
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-primary font-semibold">
                      <div onClick={() => navigate(`/event-user-view/${item.id}`)} className="flex items-center gap-1 hover:underline cursor-pointer">
                        <MapPin className="size-5 lg:size-6" />
                        <p className="xlg:text-lg">{item.business_address}</p>
                      </div>
                      {pathname === "/venue-profile-edit" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleDeleteClick(item.id)}
                                className="cursor-pointer"
                              >
                                <DeleteIcon className="size-7 text-red-700" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    <div className="flex items-center max-w-[200px] justify-between gap-4 font-semibold text-white">
                      <p>{item.price_limite}</p>
                      <p>{item.event_start_time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventCard;