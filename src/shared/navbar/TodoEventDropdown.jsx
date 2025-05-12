// TodoEventDropdown.jsx
import React, { useEffect } from "react";
import { Dropdown, Space } from "antd";
import { SettingsIcons } from "@/lib/Icons";
import useCategoryList from "@/hooks/useCategoryList";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";

export const TodoEventDropdown = () => {
  const { pathname } = useLocation();
  const { category, setCategory } = useAuth();
  const { data: categoryData } = useCategoryList();

  // Reset category when leaving home page
  useEffect(() => {
    if (pathname !== "/") {
      setCategory(null); // or setCategory(0) depending on your default state
    }
  }, [pathname, setCategory]);

  const items =
    categoryData?.data?.map((item) => ({
      label: item.category_name,
      key: String(item.id),
    })) || [];

  const handleClick = ({ key }) => {
    setCategory(Number(key));
  };

  // Only show dropdown on home page
  // if (pathname !== "/") {
  //   // return null;
  // }

  return (
    <Dropdown
      arrow
      trigger={["click"]}
      menu={{
        items,
        onClick: handleClick,
        selectedKeys: category ? [String(category)] : [],
        className: "custom-dropdown-menu",
      }}
    >
      <Space>
        <button className="lg:flex w-full items-center gap-2 lg:gap-4 lg:text-2xl font-medium hidden">
          <SettingsIcons />
          <span>Todos Eventos</span>
        </button>
      </Space>
    </Dropdown>
  );
};