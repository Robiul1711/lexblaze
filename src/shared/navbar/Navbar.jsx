import logo from "@/assets/images/logo.png";
import { CalenderIcons, SettingsIcons } from "@/lib/Icons";
import { Menu, Search } from "lucide-react";
import MenuDropdown from "./MenuDropdown";
import { Dropdown, Space } from "antd";
import CalenderDropdown from "./CalenderDropdown";
import { TodoEventDropdown } from "./TodoEventDropdown";
import { Link } from "react-router-dom";
import SearchModal from "@/components/common/SearchModal";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { search, setSearch, date, setDate} = useAuth();

  const handleDateChange = (date) => {
    if (date) {
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      setDate(local.toISOString().split("T")[0]); // "YYYY-MM-DD"
    } else {
      setDate(null);
    }
  };

  console.log(date);
  return (
    <header className="bg-secondary w-full sticky top-0 z-40 text-primary section-padding-x py-3 lg:py-4  flex justify-between items-center">
      <div className="flex items-center w-[25%] xlg:gap-[150px] xl:gap-[180px] gap-4 sm:gap-10 ">
        <MenuDropdown />
        <SearchModal search={search} setSearch={setSearch} />
        {/* <Search className="size-12" /> */}
      </div>
      <Link to="/" className="w-[50%] flex items-center justify-center ">
        <img
          src={logo}
          alt=""
          className="h-10 sm:h-12 md:h-14 xmd:h-16 lg:h-20 xlg:h-auto"
        />
      </Link>
      <div className="flex items-center justify-end lg:justify-between   w-[25%]   ">
        <TodoEventDropdown />

        <Dropdown
          arrow
          dropdownRender={() => (
            <Calendar
              mode="single"
              selected={date ? new Date(date) : date}
              onSelect={handleDateChange}
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
