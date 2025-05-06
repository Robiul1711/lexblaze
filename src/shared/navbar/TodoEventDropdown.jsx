// TodoEventDropdown.jsx
import React from "react";
import { Dropdown, Space } from "antd";
import { SettingsIcons } from "@/lib/Icons";
import useCategoryList from "@/hooks/useCategoryList";
import { useAuth } from "@/hooks/useAuth";


export const TodoEventDropdown = () => {
  const {category, setCategory} = useAuth();
  const { data: categoryData, isLoading } = useCategoryList();

  const items =
    categoryData?.data?.map((category, index) => ({
      label: <a onClick={() => setCategory(category?.id)}>{category.category_name}</a>,
      key: (index),
    })) || [];
console.log(category);
  return (
    <Dropdown arrow menu={{ items }} trigger={["click"]}>
      <Space>
        <button className="lg:flex w-full items-center gap-2 lg:gap-4 lg:text-2xl font-medium hidden">
          <SettingsIcons />
          <span>Todos Eventos</span>
        </button>
      </Space>
    </Dropdown>
  );
};
