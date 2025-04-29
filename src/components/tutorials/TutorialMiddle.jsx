import React, { useState } from "react";
import img1 from "@/assets/images/img1.png";
import img2 from "@/assets/images/img2.png";
import img3 from "@/assets/images/img3.png";
import img4 from "@/assets/images/img4.png";
import img5 from "@/assets/images/img5.png";
import { PlayIcons } from "@/lib/Icons";
import { ChevronLeft, ChevronRight } from "lucide-react";


const card = [
  {
    id: 1,
    img: img1,
    play:<PlayIcons/>,
    title: "Tutorial Title",

  },
  {
    id: 2,
    img: img2,
    play:<PlayIcons/>,
    title: "Tutorial Title",
  },
  {
    id: 3,
    img: img3,
    play:<PlayIcons/>,
    title: "Tutorial Title",
  },
  {
    id: 4,
    img: img4,
    play:<PlayIcons/>,
    title: "Tutorial Title",
  },
  {
    id: 5,
    img: img5,
    play:<PlayIcons/>,
    title: "Tutorial Title",
  },
  {
    id: 6,
    img: img5,
    play:<PlayIcons/>,
    title: "Tutorial Title",
  },


];

const TutorialMiddle = () => {
  const [currentPage, setCurrentPage] =useState(0);
  const cardsPerPage=5;
  const totalPages = Math.ceil(card.length / cardsPerPage);

  const visibleCards=card.slice(
    currentPage*cardsPerPage,
    (currentPage+1)*cardsPerPage
  );

  const handleNext=()=>{
    if(currentPage<totalPages-1){
      setCurrentPage(currentPage+1);
    }
  };

  const handlePrev=()=>{
    if(currentPage>0){
      setCurrentPage(currentPage-1);
    }
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="h-screen overflow-y-auto scrollbar-hide">

      {visibleCards.map((item) => (
        <div key={item.id} className="relative rounded overflow-hidden shadow-lg mb-7 lg:mb-10 ">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute bg-black/40 top-0 left-0 w-full h-full p-6 flex flex-col justify-center items-center">
       

            <div className="space-y-4 lg:space-y-8">
              <p className="xlg:text-[32px] sm:text-xl md:text-2xl rounded-md xlg:rounded-2xl text-white p-2 xlg:p-3 bg-black/60 font-semibold">{item.title}</p>
          
              <div className="flex items-center justify-center ">
                <button>  {item.play}</button>
             
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className="flex justify-between items-center pb-10">
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
              currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight />
          </button>
          <p className="font-bold text-lg">Siguiente</p>
        </div>
      </div>
    </div>
  );
};

export default TutorialMiddle;