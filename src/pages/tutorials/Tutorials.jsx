import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import TutorialMiddle from "@/components/tutorials/TutorialMiddle";
import AddSlider from "@/components/common/AddSlider";
const Tutorials = () => {

  return (
    <div className="section-padding-x ">
      {/* Title  */}
   
      <div className="flex flex-col w-full lg:flex-row justify-between gap-12  ">
        {/* Leftside  */}
        <div className="mt-40 hidden lg:block w-full lg:w-auto"> 
          <LeftSide />
        </div>
        {/* Middle  */}
        <div className=" lg:bg-[#FFFBE0] lg:px-10">
        <div className="text-center mt-5 lg:mt-14">
        <Title48 title2="Tutorials" />
      </div>
      <div className="lg:mt-10 mt-5 w-full lg:w-auto">
          <TutorialMiddle />

      </div>
          <div className="lg:flex justify-center hidden mt-10 lg:mb-[220px] ">
          <AddSlider />
      </div>
        </div>
        {/* Rightside  */}
        <div className="lg:mt-40 mb-[140px] w-full lg:w-auto">
          <RightSide />
          <div className="flex justify-center lg:hidden mt-4 lg:mt-0 lg:mb-[220px] ">
      <AddSlider />
      </div>
        </div>
      </div>
      {/* Footer  */}
    
    </div>
  );
};

export default Tutorials;
