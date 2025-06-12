import React, { useEffect } from "react";
import { Dropdown, Space } from "antd";
import { SettingsIcons } from "@/lib/Icons";
import useCategoryList from "@/hooks/useCategoryList";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom"; // <-- Add useNavigate

export const TodoEventDropdown = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // <-- Init navigate
  const { category, setCategory } = useAuth();
  const categoryData = useCategoryList();

  // Reset category when leaving home page
  useEffect(() => {
    if (pathname !== "/") {
      setCategory(null);
    }
  }, [pathname, setCategory]);

  const categoryItems =
    categoryData?.data?.map((item) => ({
      label: item?.category_name,
      key: String(item.id),
    })) || [];

  // Add default "Todos Eventos" at the beginning
  const items = [
    {
      label: <strong className="text-xl">Todos Eventos</strong>,
      key: "0",
    },
    ...categoryItems,
  ];

  const handleClick = ({ key }) => {
    setCategory(Number(key));
    if (pathname !== "/") {
      navigate("/"); // <-- Redirect to home
    }
  };

  const selectedLabel =
    category === 0 || category === null
      ? "Todos Eventos"
      : categoryData?.data?.find((item) => item.id === category)?.category_name || "Todos Eventos";

  return (
    <Dropdown
      arrow
      trigger={["click"]}
      menu={{
        items,
        onClick: handleClick,
        selectedKeys: [String(category ?? 0)],
        className: "custom-dropdown-menu",
      }}
    >
      <Space>
        <button className="lg:flex w-full items-center gap-2 lg:gap-4 lg:text-2xl font-medium ">
          <SettingsIcons  />
          <span className="hidden lg:block">{selectedLabel}</span>
        </button>
      </Space>
    </Dropdown>
  );
};
