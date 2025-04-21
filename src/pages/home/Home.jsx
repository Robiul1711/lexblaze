import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import MiddleContent from "@/components/home/MiddleContent";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
const Home = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className="section-padding-x mb-[120px]">
      {/* Title  */}
      <div className="text-center mt-14">
        <Title48 title1="Ver Eventos para el" title2={formattedDate} />
      </div>
      <div className="flex justify-between gap-12  mt-10">
        {/* Leftside  */}
        <div className=""> 
          <LeftSide />
        </div>
        {/* Middle  */}
        <div className="">
          <MiddleContent />
        </div>
        {/* Rightside  */}
        <div>
          <RightSide />
        </div>
      </div>
      {/* Footer  */}
      <div className="flex justify-center mt-10 pb-[120px]">
       <img src={bottomImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
