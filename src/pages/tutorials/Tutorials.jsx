import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import TutorialMiddle from "@/components/tutorials/TutorialMiddle";
import AddSlider from "@/components/common/AddSlider";

const Tutorials = () => {
  return (
    <div className="section-padding-x">
      {/* Responsive Flex Container */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* LeftSide: 30% on large screens */}
        <div className="hidden lg:block lg:basis-[30%] mt-10">
          <LeftSide />
        </div>

        {/* Tutorial Middle: 40% on large screens */}
        <div className="w-full lg:basis-[40%] min-h-screen lg:bg-[#FFFBE0] lg:px-10 lg:pb-[150px]">
          <div className="text-center mt-2 ">
            <Title48 title2="Tutorials" />
          </div>
          <div className="mt-2 ">
            <TutorialMiddle />
          </div>
          {/* AddSlider for large screens only */}
          <div className="hidden xxl:flex justify-center mt-10 ">
            <AddSlider />
          </div>
        </div>

        {/* RightSide: 30% on large screens */}
        <div className="lg:basis-[30%] lg:mt-10 mb-[140px]">
          <RightSide />
          {/* AddSlider for mobile only */}
          <div className="flex justify-center lg:hidden mt-4">
            <AddSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
