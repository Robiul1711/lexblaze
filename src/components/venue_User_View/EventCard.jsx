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

const EventCard = ({ visibleCards }) => {
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
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short" };
    const parts = date
      .toLocaleDateString("es-ES", options)
      .split(" ")
      .map((part) => part.toLowerCase());
    return `${parts[1]} ${parts[0]}`;
  };

  return (
    <>
      {/* Confirmation Modal */}
      <DeleteModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={confirmDelete}
        isLoading={deleteEventMutation.isLoading} // Pass loading state here
      />

      {/* Events List */}
      <div className="flex flex-col mt-10">
        {[...visibleCards]?.reverse().map((item) => (
          <div key={item.id}>
            <h1 className="text-[#333] text-xl sm:text-2xl xlg:text-[40px] font-belanosima font-bold text-center mb-3 sm:mb-4 xlg:mb-5">
              {formatDate(item.event_start_date)}
            </h1>
            <div className="relative rounded overflow-hidden shadow-lg mb-5 max-w-[625px] w-full sm:mb-7 xlg:mb-10">
              <div className="h-[300px] sm:h-[350px] md:h-[420px]">
                <img
                  src={item.event_thumb_image}
                  alt={item.title}
                  className="w-full h-full object-fill"
                />
              </div>

              <div className="absolute bg-black/40 top-0 left-0 w-full h-full">
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
                      <div className="flex items-center gap-2 sm:gap-4 hover:underline cursor-pointer">
                        <MapPin className="size-7" />
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

                    <div className="flex items-center justify-between gap-4 font-semibold text-white">
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
