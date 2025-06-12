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

    // Capitalize only the first letter of the month
    const capitalizedMonth =
      parts[1].charAt(0).toUpperCase() + parts[1].slice(1);

    const formattedDate = `${capitalizedMonth} ${parts[0]}`;

    if (checkDate.getTime() === today.getTime()) {
      return `Hoy ${formattedDate}`;
    }

    return formattedDate;
  };

  // Group events by date and sort them
  const groupAndSortEvents = () => {
    const dateGroups = {};
    
    // First, group events by their first date
    visibleCards.forEach((event) => {
      const eventDate = event.event_dates?.[0]?.date;
      if (!eventDate) return;

      const dateKey = new Date(eventDate).toISOString().split('T')[0]; // YYYY-MM-DD format for consistent grouping
      
      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = {
          date: eventDate,
          formattedDate: formatDate(eventDate),
          events: []
        };
      }
      dateGroups[dateKey].events.push(event);
    });

    // Convert to array and sort chronologically
    const sortedGroups = Object.values(dateGroups).sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    // Sort events within each date group (if needed)
    sortedGroups.forEach(group => {
      group.events.sort((a, b) => {
        // Sort by start time if available, otherwise by title
        return (a.event_start_time || '').localeCompare(b.event_start_time || '') ||
               a.event_title.localeCompare(b.event_title);
      });
    });

    return sortedGroups;
  };

  const groupedEvents = groupAndSortEvents();

  return (
    <>
      <DeleteModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={confirmDelete}
        isLoading={deleteEventMutation.isLoading}
      />

      <div className="flex flex-col mt-10">
        {groupedEvents.map((group) => (
          <div key={group.date} className="mb-8">
            <h1 className="text-[#333] text-xl sm:text-2xl xlg:text-[30px] font-belanosima font-bold text-center mb-3 sm:mb-6">
              {group.formattedDate}
            </h1>
            
            <div className="space-y-5">
              {group.events.map((item) => (
                <div key={item.id} className="relative rounded mx-auto overflow-hidden shadow-lg max-w-[625px] w-full">
                  <div className="w-full h-[200px] sm:h-[250px]">
                    <img
                      src={item.flyer ? item.flyer : item.event_thumb_image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bg-black/70 top-0 left-0 w-full h-full">
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
                          {item?.business_name}
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
                          <div
                            onClick={() => navigate(`/event-user-view/${item.id}`)}
                            className="flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <MapPin className="size-5 lg:size-6" />
                            <p className="xlg:text-lg">
                              {item?.user?.business_name}
                            </p>
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventCard;