import logo from "@/assets/images/logo.png";
import { CalenderIcons, SettingsIcons } from "@/lib/Icons";
import { Menu, Search } from "lucide-react";
import MenuDropdown from "./MenuDropdown";
import { Dropdown, Space } from "antd";
import CalenderDropdown from "./CalenderDropdown";
import TodoEventDropdown from "./TodoEventDropdown";
import { Link } from "react-router-dom";
import SearchModal from "@/components/common/SearchModal";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
const Navbar = () => {
  const [date, setDate] = useState();
  return (
    <header className="bg-secondary sticky top-0 z-40 text-primary section-padding-x py-3 lg:py-1  flex justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 xlg:gap-[160px]  ">
        <MenuDropdown />
        <SearchModal />
        {/* <Search className="size-12" /> */}
      </div>
      <Link to="/">
        <img src={logo} alt="" className="h-10 sm:h-12 md:h-14 xmd:h-16 lg:h-20 xlg:h-auto"/>
      </Link>
      <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8 xlg:gap-[160px]  ">
        <TodoEventDropdown />

        <Dropdown
          arrow
          dropdownRender={() => (
            <Calendar
              mode="single" // or "range" | "multiple"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-white"
            />
          )}
          trigger={["click"]}
        >
          <div className="flex items-center gap-1 cursor-pointer">
            <CalenderIcons />
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Navbar;
