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

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

const MONTH_MAP = {
  0: "Ene", 1: "Feb", 2: "Mar", 3: "Abr", 4: "May", 5: "Jun",
  6: "Jul", 7: "Ago", 8: "Set", 9: "Oct", 10: "Nov", 11: "Dic",
};

const today = dayjs().startOf("day");

const formatGroupLabel = (date) => {
  const d = dayjs(date).startOf("day");
  const label = `${d.format("DD")} ${MONTH_MAP[d.month()]}`;
  return d.isSame(today, "day") ? `Hoy ${label}` : label;
};

const getEventDateLabelWithoutHoy = (eventDates) => {
  if (!eventDates || eventDates.length <= 1) return null;

  const dates = eventDates
    .map(d => dayjs(d.date).startOf("day"))
    .filter(d => d.isValid())
    .sort((a, b) => a - b);

  if (dates.length <= 1) return null;

  const allToday = dates.every(date => date.isSame(today, "day"));
  if (allToday) return null;

  // ✅ Check if 4 or more dates fall on the same day of the week
  const weekdayCounts = {};
  dates.forEach(date => {
    const weekday = date.day(); // 0 = Sunday, 6 = Saturday
    weekdayCounts[weekday] = (weekdayCounts[weekday] || 0) + 1;
  });

  const dominantWeekday = Object.entries(weekdayCounts).find(
    ([, count]) => count >= 4
  );

  if (dominantWeekday) {
    const weekdayIndex = Number(dominantWeekday[0]);
    const weekdaysES = [
      "Domingos", "Lunes", "Martes", "Miércoles",
      "Jueves", "Viernes", "Sábados"
    ];
    return `Todos los ${weekdaysES[weekdayIndex]}`;
  }

  // Check if dates are continuous
  let isContinuous = true;
  for (let i = 1; i < dates.length; i++) {
    const diff = dates[i].diff(dates[i - 1], "day");
    if (diff !== 1) {
      isContinuous = false;
      break;
    }
  }

  if (isContinuous) {
    const last = dates[dates.length - 1];
    const formatted = last.format("DD MMM").replace(/^\w/, c => c.toUpperCase());
    return `Hasta ${formatted}`;
  }

  const monthGroups = {};
  dates.forEach(date => {
    const day = date.format("DD");
    const month = date.month();
    if (!monthGroups[month]) monthGroups[month] = [];
    monthGroups[month].push(day);
  });

  return Object.entries(monthGroups)
    .map(([monthIdx, days]) => `${days.join(", ")} ${MONTH_MAP[monthIdx]}`)
    .join(" y ");
};


const getFirstUpcomingDate = (dates) =>
  dates
    ?.map((d) => dayjs(d.date).startOf("day"))
    .filter((d) => d.isValid() && d.isSameOrAfter(today))
    .sort((a, b) => a - b)[0] ?? null;

const EventCardPublic = ({ visibleCards }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) => axiosSecure.post(`/event/destroy/${eventId}`),
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

  const sortedEvents = [...visibleCards]
    .filter((item) =>
      item.event_dates?.some((d) =>
        dayjs(d.date).startOf("day").isSameOrAfter(today)
      )
    )
    .sort((a, b) => {
      const aDate = getFirstUpcomingDate(a.event_dates)?.valueOf() ?? Infinity;
      const bDate = getFirstUpcomingDate(b.event_dates)?.valueOf() ?? Infinity;
      return aDate - bDate;
    });

  const groupedEvents = {};
  sortedEvents.forEach((event) => {
    const firstDate = getFirstUpcomingDate(event.event_dates);
    if (!firstDate) return;

    const label = formatGroupLabel(firstDate);

    if (!groupedEvents[label]) {
      groupedEvents[label] = [];
    }
    groupedEvents[label].push(event);
  });

  return (
    <>
      <DeleteModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      <div className="flex flex-col mt-10">
        {Object.entries(groupedEvents).map(([dateKey, events]) => (
          <div key={dateKey}>
            <h1 className="text-[#333] text-xl sm:text-2xl xlg:text-[40px] font-belanosima font-bold text-center mb-3 sm:mb-4 xlg:mb-5">
              {dateKey}
            </h1>

            {events.map((item) => {
              // Use new label function here to show/hide yellow tag
              const formattedDates = getEventDateLabelWithoutHoy(item.event_dates);

              return (
                <Link key={item.id} to={`/event-user-view/${item.id}`}>
                  <div className="relative rounded overflow-hidden shadow-lg mb-5 mx-auto w-full sm:mb-7 xlg:mb-10">
                    <div className="h-[200px] sm:h-[250px]">
                      <img
                        src={item?.flyer}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="absolute bg-black/60 top-0 left-0 w-full h-full">
                      {formattedDates && (
                        <div className="absolute top-0 right-0">
                          <button className="bg-yellow-400 text-[#F12617] px-2 py-1 text-xs sm:text-sm font-bold">
                            {formattedDates}
                          </button>
                        </div>
                      )}

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
                              {item?.business_address && (
                                <>
                                  <MapPin className="size-5 sm:size-6" />
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                      item.business_address
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-primary font-semibold"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {item.business_address}
                                  </a>
                                </>
                              )}
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
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default EventCardPublic;
