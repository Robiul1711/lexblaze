import logo from "@/assets/images/logo.png";
import { CalenderIcons } from "@/lib/Icons";
import MenuDropdown from "./MenuDropdown";
import { Dropdown } from "antd";
import { TodoEventDropdown } from "./TodoEventDropdown";
import { Link, Navigate } from "react-router-dom";
import SearchModal from "@/components/common/SearchModal";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
const Navbar = () => {
  const { pathname } = useLocation();
  const { search, setSearch, date, setDate } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // Set today's date when on home page and date is not set
  useEffect(() => {
    if (pathname === "/" && !date) {
      const formattedToday = dayjs().format("YYYY-MM-DD");
      setDate(formattedToday);
    }

    if (pathname !== "/") {
      setDate(null);
    }
  }, [pathname, setDate, date]);

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const formatted = dayjs(selectedDate).format("YYYY-MM-DD");
      setDate(formatted);
    } else {
      setDate(null);
    }
    setDropdownVisible(false);
  };
  //   useEffect(() => {

  //     if (pathname === "/" && !date) {
  //       const today = new Date();
  //       const localDate = new Date(
  //         today.getTime() - today.getTimezoneOffset() * 60000
  //       );
  //       setDate(localDate.toISOString().split("T")[0]);
  //     }

  //     // Reset date when not on home page
  //     if (pathname !== "/") {
  //       setDate(null);
  //     }
  //   }, [pathname, setDate, date]);
  //   const today = new Date();
  //   const handleDateChange = (selectedDate) => {
  //   if (selectedDate) {
  //     // Fix timezone shift by removing the offset
  //     const utcDate = new Date(
  //       selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
  //     );
  // console.log("utcDate",utcDate);
  //     const year = utcDate.getFullYear();
  //     const month = String(utcDate.getMonth() + 1).padStart(2, "0");
  //     const day = String(utcDate.getDate()).padStart(2, "0");
  //     setDate(`${year}-${month}-${day}`); // "YYYY-MM-DD"
  //   } else {
  //     setDate(null);
  //   }
  //   setDropdownVisible(false);
  // };

  // const handleDateChange = (selectedDate) => {
  //   if (selectedDate) {
  //     const year = selectedDate.getFullYear();
  //     const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  //     const day = String(selectedDate.getDate()).padStart(2, "0");
  //     setDate(`${year}-${month}-${day}`); // "YYYY-MM-DD"
  //   } else {
  //     setDate(null);
  //   }
  //   setDropdownVisible(false);
  // };
  // const handleDateChange = (selectedDate) => {
  //   if (selectedDate) {
  //     const nextDay = new Date(selectedDate);
  //     nextDay.setDate(nextDay.getDate() + 1); // Add 1 day

  //     const year = nextDay.getFullYear();
  //     const month = String(nextDay.getMonth() + 1).padStart(2, "0");
  //     const day = String(nextDay.getDate()).padStart(2, "0");

  //     setDate(`${year}-${month}-${day}`); // "YYYY-MM-DD"
  //   } else {
  //     setDate(null);
  //   }
  //   setDropdownVisible(false);
  // };

const { setCategory } = useAuth();
  const handleLogoClick = () => {
  setDate(null);
  setCategory(null);  // reset category
};
  return (
    <header className="bg-secondary w-full sticky top-0 z-40 text-primary section-padding-x py-2 flex justify-between items-center">
      <div className="flex items-center w-[25%] xlg:gap-[150px] xl:gap-[180px] gap-4 sm:gap-10">
        <MenuDropdown />
        {pathname === "/" && (
          <SearchModal search={search} setSearch={setSearch} />
        )}
      </div>
      <div className="w-[50%] flex items-center justify-center">
  <Link to="/" onClick={handleLogoClick} className="">
  <img
    src={logo}
    alt="Logo"
    className="h-10 sm:h-12 md:h-14 xmd:h-16 lg:h-[70px]"
  />
</Link>

      </div>
      <div
        className={`flex items-center justify-end ${
          pathname === "/" ? "lg:justify-between" : ""
        }  w-[25%]`}
      >
        {pathname === "/" && <TodoEventDropdown />}
        {pathname === "/" && (
          <Dropdown
            arrow
            dropdownRender={() => (
              <Calendar
                className="rounded-md border bg-white"
                onChange={handleDateChange}
                value={date ? dayjs(date, "YYYY-MM-DD").toDate() : null}
                minDate={new Date()} // disables past dates
              />
            )}
            trigger={["click"]}
            open={dropdownVisible}
            onOpenChange={(visible) => setDropdownVisible(visible)}
          >
            <div className="flex items-center gap-1 ml-4 lg:ml-0 cursor-pointer">
              <CalenderIcons />
            </div>
          </Dropdown>
        )}
      </div>
    </header>
  );
};

export default Navbar;
