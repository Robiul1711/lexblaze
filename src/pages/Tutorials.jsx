import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import TutorialMiddle from "@/components/tutorials/TutorialMiddle";
const Tutorials = () => {

  return (
    <div className="section-padding-x mb-[120px]">
      {/* Title  */}
      <div className="text-center mt-14">
        <Title48 title2="Tutorials" />
      </div>
      <div className="flex justify-between gap-12  mt-10">
        {/* Leftside  */}
        <div className=""> 
          <LeftSide />
        </div>
        {/* Middle  */}
        <div className=" ">
          <TutorialMiddle />
        </div>
        {/* Rightside  */}
        <div>
          <RightSide />
        </div>
      </div>
      {/* Footer  */}
      <div className="flex justify-center ">
       <img src={bottomImg} alt="" />
      </div>
    </div>
  );
};

export default Tutorials;
