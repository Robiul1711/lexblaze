import React, { useState, useRef, useEffect } from "react";
import { PlayIcons } from "@/lib/Icons";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const TutorialMiddle = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["tutorials"],
    queryFn: async () => {
      const response = await axiosPublic.get("tutorial/allApiDatas");
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const tutorials = data || [];
  const totalPages = Math.ceil(tutorials.length / cardsPerPage);

  const visibleTutorials = tutorials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);

    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      
    }
  };

  const handlePlayClick = (youtubeUrl) => {
    setCurrentVideo(youtubeUrl);
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setCurrentVideo(null);
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="flex flex-col gap-12 relative" >
      {/* YouTube Video Modal */}
      {isVideoOpen && currentVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo)}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full min-h-[400px]"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="h-screen overflow-y-auto scrollbar-hide">
        {visibleTutorials.length > 0 ? (
          visibleTutorials.map((tutorial) => (
            <div key={tutorial.id} className="relative rounded overflow-hidden shadow-lg mb-7 lg:mb-10">
              <img 
                src={tutorial.image || "/default-tutorial-image.jpg"} 
                alt={tutorial.title} 
                className="w-full h-[170px] xxs:h-[200px] sm:h-[280px] md:h-[300px] lg:h-[200px] xlg:h-[250px] object-cover"
              />
              <div className="absolute bg-black/40 top-0 left-0 w-full h-full p-6 flex flex-col justify-center items-center">
                <div className="space-y-4 lg:space-y-8">
                  <p className=" sm:text-xl md:text-2xl rounded-md xlg:rounded-2xl text-white p-2 xlg:p-3 bg-black/60 font-semibold">
                    {tutorial.title}
                  </p>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handlePlayClick(tutorial.youtube_url)}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <PlayIcons />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-xl">No tutorials found</p>
          </div>
        )}
      </div>

      {tutorials.length > cardsPerPage && (
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <button
              className={`p-1 rounded-full border-[2px] border-black ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrev}
              disabled={currentPage === 0}
            >
              <ChevronLeft />
            </button>
            <p className="font-bold text-lg">Atrás</p>
          </div>
          <div className="text-gray-600">
            Página {currentPage + 1} de {totalPages}
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className={`p-1 rounded-full border-[2px] border-black ${
                currentPage === totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight />
            </button>
            <p className="font-bold text-lg">Siguiente</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialMiddle;