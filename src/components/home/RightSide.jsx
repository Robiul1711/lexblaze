import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";

const RightSide = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: ["adsDataRight"],
    queryFn: async () => {
      const response = await axiosPublic.get("/adds/allApiDatas");
      return response.data;
    },
  });

  const rightAds =
    data?.filter((ad) => ad.type === "right" && ad.status === "active") || [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideRef = useRef();

  // Auto slide
  useEffect(() => {
    if (rightAds.length > 0) {
      const autoSlide = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(autoSlide);
    }
  }, [rightAds.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  // When currentSlide changes, handle infinite loop
  useEffect(() => {
    if (!slideRef.current) return;
    const handleTransitionEnd = () => {
      if (currentSlide === rightAds.length) {
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
  }, [currentSlide, rightAds.length]);

  // Restore transition after jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (isLoading) return <div className="w-full max-w-[450px] mx-auto aspect-[4/5] flex items-center justify-center"></div>;
  if (error || rightAds.length === 0)
    return (
      <div className="w-full max-w-[450px] mx-auto aspect-[4/5] flex items-center justify-center">
        <p className="text-red-500 font-semibold">No ads available</p>
      </div>
    );

  // Clone first slide for smooth infinite loop
  const slides = [...rightAds, rightAds[0]];

  return (
    <>
      <p className="bg-[#D40000] xlg:py-2 w-full py-2 mb-3 rounded-md lg:rounded-xl text-sm text-center font-semibold xl:text-lg text-white">
        EVENTOS DESTACADOS
      </p>

      <div className="relative w-full max-w-[450px] mx-auto aspect-[4/5] overflow-hidden rounded-lg">
        <div
          ref={slideRef}
          className={`flex h-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((ad, index) => (
            <a href={ad.url} target="_blank" key={ad._id || index} className="w-full flex-shrink-0">
              <img src={ad.image} alt={ad.title || `Ad ${index + 1}`} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default RightSide;
