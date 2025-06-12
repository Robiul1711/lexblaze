import { Link, useLocation } from "react-router-dom";
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

const EventCardPublic = ({ visibleCards }) => {
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

  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  const options = { day: "2-digit", month: "short" };
  const parts = date
    .toLocaleDateString("es-ES", options)
    .split(" ")
    .map((part) => part.toLowerCase());

  // Capitalize the first letter of the month
  const month = parts[1];
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  const formattedDate = `${capitalizedMonth} ${parts[0]}`;

  if (checkDate.getTime() === today.getTime()) {
    return `Hoy ${formattedDate}`;
  }

  return formattedDate;
};


  // Filter out past events and sort (today -> tomorrow -> future)
  const sortedEvents = [...visibleCards]
    .filter((item) => {
      if (!item.event_dates?.[0]?.date) return false;
      
      const eventDate = new Date(item.event_dates[0].date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return eventDate >= today; // Only keep today or future events
    })
    .sort((a, b) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const dateA = new Date(a.event_dates[0].date);
      const dateB = new Date(b.event_dates[0].date);

      const normalize = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      };

      const normalizedA = normalize(dateA);
      const normalizedB = normalize(dateB);

      const getRank = (date) => {
        if (date === today.getTime()) return 0;    // Today (highest priority)
        if (date === tomorrow.getTime()) return 1; // Tomorrow
        return 2; // Future dates
      };

      const rankA = getRank(normalizedA);
      const rankB = getRank(normalizedB);

      if (rankA !== rankB) return rankA - rankB;
      return normalizedA - normalizedB; // If same rank, sort chronologically
    });

  const getEventDateLabel = (eventDates) => {
    if (!eventDates || eventDates.length === 0) return null;

    const dates = eventDates
      .map((d) => new Date(d?.date))
      .filter((d) => d instanceof Date && !isNaN(d))
      .sort((a, b) => a - b);

    if (dates.length === 0) return null;

const formatDate = (date) => {
  const options = { day: "2-digit", month: "short" };
  const [day, month] = date
    .toLocaleDateString("es-ES", options)
    .split(" ")
    .map((part) => part.toLowerCase());

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  return `${capitalizedMonth} ${day}`;
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

    let isContinuous = true;
    for (let i = 1; i < dates.length; i++) {
      const diffInDays = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
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

  // Don't render anything if there are no events
  if (!sortedEvents || sortedEvents.length === 0) {
    return null;
  }

  return (
    <>
      <DeleteModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      <div className="flex flex-col mt-10">
        {sortedEvents.map((item) => {
          const eventDate = item.event_dates[0]?.date;
          const formattedDate = eventDate ? formatDate(eventDate) : "N/A";

          return (
            <div key={item.id}>
              <h1 className="text-[#333] text-xl sm:text-2xl xlg:text-[40px] font-belanosima font-bold text-center mb-3 sm:mb-4 xlg:mb-5">
                {formattedDate}
                {console.log(formatDate(eventDate))}
              </h1>
              <Link to={`/event-user-view/${item.id}`}>
                <div className="relative rounded overflow-hidden shadow-lg mb-5 mx-auto w-full sm:mb-7 xlg:mb-10">
                  <div className="h-[200px] sm:h-[250px]">
                    <img
                      src={item?.flyer}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute bg-black/60 top-0 left-0 w-full h-full">
                   {item.event_dates && item.event_dates.length > 0 && (() => {
  const dateLabel = getEventDateLabel(item.event_dates);
  const isToday = dateLabel?.startsWith("Hoy");
  
  const firstDate = item.event_dates
    .map((d) => new Date(d?.date))
    .filter((d) => d instanceof Date && !isNaN(d))
    .sort((a, b) => a - b)[0];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isPastOrToday = firstDate && firstDate <= today;
  
  // Only show button if not today and not past
  if (!isPastOrToday && !isToday) {
    return (
      <div className="absolute top-0 right-0">
        <button className="bg-primary text-[#F12617] p-1 text-sm sm:text-base sm:p-2 font-bold">
          {dateLabel}
        </button>
      </div>
    );
  }
  return null;
})()}

                    <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
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
                                  <Link
                                    to={`/update-event/${item.id}`}
                                    className="cursor-pointer"
                                  >
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
                          <div className="flex items-center gap-1 xlg:text-lg">
                            <MapPin className="size-6" />
                            {item?.user?.business_name}
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

                        <div className="flex items-center max-w-[300px] justify-between gap-2 font-semibold text-white">
                          <p>{item.price_limite}</p>
                          <p>{item.event_start_time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EventCardPublic;