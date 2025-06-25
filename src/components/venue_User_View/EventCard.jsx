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

const monthMap = {
  0: "Ene",
  1: "Feb",
  2: "Mar",
  3: "Abr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Ago",
  8: "Set",
  9: "Oct",
  10: "Nov",
  11: "Dic",
};

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

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    const day = date.getDate().toString().padStart(2, "0");
    const month = monthMap[date.getMonth()];
    const formattedDate = `${month} ${day}`;

    return checkDate.getTime() === today.getTime()
      ? `Hoy ${formattedDate}`
      : formattedDate;
  };

  const formatEventDates = (dates = []) => {
    if (!Array.isArray(dates)) return "";

    const grouped = {};

    dates.forEach((d) => {
      const date = new Date(d.date);
      const day = date.getDate().toString().padStart(2, "0");
      const month = monthMap[date.getMonth()];
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(day);
    });

    const formattedGroups = Object.entries(grouped).map(
      ([month, days]) => `${days.join(", ")} ${month}`
    );

    return formattedGroups.join(" y ");
  };

  const groupAndSortEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateGroups = {};

    visibleCards.forEach((event) => {
      const eventDateStr = event.event_dates?.[0]?.date;
      if (!eventDateStr) return;

      const eventDate = new Date(eventDateStr);

      // Check if the date is valid
      if (isNaN(eventDate.getTime())) return;

      eventDate.setHours(0, 0, 0, 0);

      if (eventDate.getTime() < today.getTime()) return;

      const dateKey = eventDate.toISOString().split("T")[0];

      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = {
          date: eventDateStr,
          formattedDate: formatDate(eventDateStr),
          events: [],
        };
      }

      dateGroups[dateKey].events.push(event);
    });
    const sortedGroups = Object.values(dateGroups).sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    sortedGroups.forEach((group) => {
      group.events.sort((a, b) => {
        return (
          (a.event_start_time || "").localeCompare(b.event_start_time || "") ||
          a.event_title.localeCompare(b.event_title)
        );
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
                <div
                  onClick={() => navigate(`/event-user-view/${item.id}`)}
                  key={item.id}
                  className="relative rounded mx-auto overflow-hidden shadow-lg cursor-pointer max-w-[625px] w-full"
                >
                  <p className="absolute top-0 right-0 bg-primary z-20 text-[#F12617] font-semibold px-2 py-1">
                    {formatEventDates(item?.event_dates)}
                  </p>
                  <div className="w-full h-[200px] sm:h-[250px]">
                    <img
                      src={item.flyer || item.event_thumb_image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bg-black/70 top-0 left-0 w-full h-full">
                    <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5">
                      {item.button && (
                        <div
                          className="absolute top-0 right-0"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                                <TooltipTrigger asChild>
                                  <Link
                                    to={`/update-event/${item.id}`}
                                    onClick={(e) => e.stopPropagation()}
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
                        {console.log(item?.business_address)}
                        <div
                          className={`${
                            item?.business_address
                              ? "flex items-center justify-between"
                              : "flex items-center justify-end"
                          }  text-primary font-semibold`}
                        >
                          {item?.business_address && (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                item?.business_address
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:underline cursor-pointer text-primary font-semibold"
                              onClick={(e) => e.stopPropagation()} // optional if inside a clickable parent
                            >
                              <MapPin className="size-5 lg:size-6" />
                              <span className="xlg:text-lg">
                                {item?.business_address}
                              </span>
                            </a>
                          )}

                          {pathname === "/venue-profile-edit" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteClick(item.id);
                                    }}
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
                          <p>
                            {item.event_start_time === "Invalid Date" ||
                            item.event_start_time === "null"
                              ? ""
                              : item.event_start_time}
                          </p>
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
