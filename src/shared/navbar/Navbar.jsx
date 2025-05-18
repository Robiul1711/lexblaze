import logo from "@/assets/images/logo.png";
import { CalenderIcons } from "@/lib/Icons";
import MenuDropdown from "./MenuDropdown";
import { Dropdown } from "antd";
import { TodoEventDropdown } from "./TodoEventDropdown";
import { Link } from "react-router-dom";
import SearchModal from "@/components/common/SearchModal";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const { search, setSearch, date, setDate } = useAuth();

  // Set today's date when on home page and date is not set
  useEffect(() => {
    if (pathname === "/" && !date) {
      const today = new Date();
      const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
      setDate(localDate.toISOString().split("T")[0]);
    }
    
    // Reset date when not on home page
    if (pathname !== "/") {
      setDate(null);
    }
  }, [pathname, setDate, date]);

  const handleDateChange = (date) => {
    if (date) {
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      setDate(local.toISOString().split("T")[0]); // "YYYY-MM-DD"
    } else {
      setDate(null);
    }
  };

  return (
    <header className="bg-secondary w-full sticky top-0 z-40 text-primary section-padding-x py-2 flex justify-between items-center">
      <div className="flex items-center w-[25%] xlg:gap-[150px] xl:gap-[180px] gap-4 sm:gap-10">
        <MenuDropdown />
        {pathname === "/" && (
          
        <SearchModal search={search} setSearch={setSearch} />
        )}
      </div>
      <Link to="/" className="w-[50%] flex items-center justify-center">
        <img
          src={logo}
          alt=""
          className="h-10 sm:h-12 md:h-14 xmd:h-16 lg:h-20"
        />
      </Link>
      <div className={`flex items-center justify-end ${pathname === "/" ? "lg:justify-between" : ""}  w-[25%]`}>
        <TodoEventDropdown />
{
  pathname === "/" && (
        <Dropdown
          arrow
          dropdownRender={() => (
            <Calendar
              mode="single"
              selected={date ? new Date(date) : null}
              onSelect={handleDateChange}
              className="rounded-md border bg-white"
            />
          )}
          trigger={["click"]}
        >
          <div className="flex items-center gap-1 ml-4 lg:ml-0 cursor-pointer">
            <CalenderIcons />
          </div>
        </Dropdown>
  )
}
       
      </div>
    </header>
  );
};

export default Navbar;