import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import TutorialMiddle from "@/components/tutorials/TutorialMiddle";
const Tutorials = () => {

  return (
    <div className="section-padding-x ">
      {/* Title  */}
   
      <div className="flex justify-between gap-12  ">
        {/* Leftside  */}
        <div className="mt-40"> 
          <LeftSide />
        </div>
        {/* Middle  */}
        <div className=" bg-[#FFFBE0] px-10">
        <div className="text-center mt-14">
        <Title48 title2="Tutorials" />
      </div>
      <div className="mt-10">
          <TutorialMiddle />

      </div>
          <div className="flex justify-center mb-[220px] ">
       <img src={bottomImg} alt="" />
      </div>
        </div>
        {/* Rightside  */}
        <div className="mt-40">
          <RightSide />
        </div>
      </div>
      {/* Footer  */}
    
    </div>
  );
};

export default Tutorials;
