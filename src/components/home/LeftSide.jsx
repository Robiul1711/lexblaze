import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";

const LeftSide = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: ["adsDataLeft"],
    queryFn: async () => {
      const response = await axiosPublic.get("/adds/allApiDatas");
      return response.data;
    },
  });

  // Filter only left active ads
  const leftAds =
    data?.filter((ad) => ad.type === "left" && ad.status === "active") || [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideRef = useRef();

  // Auto slide every 3s
  useEffect(() => {
    if (leftAds.length > 0) {
      const autoSlide = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(autoSlide);
    }
  }, [leftAds.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  // Handle infinite loop using clone
  useEffect(() => {
    if (!slideRef.current) return;

    const handleTransitionEnd = () => {
      if (currentSlide === leftAds.length) {
        // Jump back to first slide without animation
        setIsTransitioning(false);
        setCurrentSlide(0);
      }
    };

    slideRef.current.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      if (slideRef.current)
        slideRef.current.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [currentSlide, leftAds.length]);

  // Restore transition after jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (isLoading)
    return (
      <div className="w-full max-w-[450px] mx-auto aspect-[4/5] flex items-center justify-center"></div>
    );

  if (error || leftAds.length === 0)
    return (
      <div className="w-full max-w-[450px] mx-auto aspect-[4/5] flex items-center justify-center">
        <p className="text-red-500 font-semibold">No ads available</p>
      </div>
    );

  // Clone first slide for smooth infinite loop
  const slides = [...leftAds, leftAds[0]];

  return (
    <div className="relative w-full max-w-[450px] mx-auto aspect-[4/5] overflow-hidden rounded-lg">
      <div
        ref={slideRef}
        className={`flex h-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((ad, index) => (
          <a href={ad.url} target="_blank" key={ad._id || index} className="w-full flex-shrink-0">
            <img
              src={ad.image}
              alt={ad.title || `Ad ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default LeftSide;
