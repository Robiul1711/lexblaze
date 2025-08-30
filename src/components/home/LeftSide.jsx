import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slideRef = useRef();
  const containerRef = useRef();

  // The minimum swipe distance required to trigger a slide change
  const minSwipeDistance = 50;

  // Handle touch start
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end - determine if it was a swipe
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto slide every 3s
  useEffect(() => {
    if (leftAds.length > 0) {
      const autoSlide = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(autoSlide);
    }
  }, [leftAds.length, currentSlide]);

  const nextSlide = () => {
    if (leftAds.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % leftAds.length);
  };

  const prevSlide = () => {
    if (leftAds.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + leftAds.length) % leftAds.length);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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

  return (
    <div className="relative w-full max-w-[450px] mx-auto aspect-[4/5] overflow-hidden rounded-lg">
      {/* Navigation Arrows */}
      {leftAds.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
            aria-label="Next slide"
          >
            <FaArrowRight />
          </button>
        </>
      )}
      
      {/* Slides Container */}
      <div
        ref={containerRef}
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {leftAds.map((ad, index) => (
          <div key={ad._id || index} className="w-full flex-shrink-0">
            <a href={ad.url} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.image}
                alt={ad.title || `Ad ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        ))}
      </div>
      
      {/* Dots Indicator */}
      {leftAds.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {leftAds.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftSide;