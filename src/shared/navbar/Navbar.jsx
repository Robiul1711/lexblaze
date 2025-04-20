import logo from "@/assets/images/logo.png";
import { CalenderIcons, SettingsIcons } from "@/lib/Icons";
import { Menu, Search } from "lucide-react";
import MenuDropdown from "./MenuDropdown";
import { Dropdown, Space } from "antd";
import CalenderDropdown from "./CalenderDropdown";
import TodoEventDropdown from "./TodoEventDropdown";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="bg-secondary sticky top-0 z-40 text-primary section-padding-x py-1  flex justify-between items-center">
      <div className="flex items-center gap-[160px]  ">
        <Dropdown
          trigger={["click"]}
          dropdownRender={() => <MenuDropdown />}
          placement="bottomLeft"
          arrow
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <div className="flex items-center gap-1 cursor-pointer">
                <Menu className="size-12" />
              </div>
            </Space>
          </a>
        </Dropdown>
        <Search className="size-12" />
      </div>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div className="flex items-center gap-[160px]">
        <TodoEventDropdown />

        <Dropdown
           arrow
          dropdownRender={() => <CalenderDropdown />}
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
