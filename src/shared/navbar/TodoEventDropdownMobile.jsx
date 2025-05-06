// TodoEventDropdownMobile.jsx
import React from "react";
import { Dropdown } from "antd";
import { SettingsIcons } from "@/lib/Icons";
import useCategoryList from "@/hooks/useCategoryList";
import { useAuth } from "@/hooks/useAuth";


export const TodoEventDropdownMobile = () => {
      const {category, setCategory} = useAuth();
  const { data: categoryData, isLoading } = useCategoryList();

  const items =
    categoryData?.data?.map((category, index) => ({
      label:  <a onClick={() => setCategory(category?.id)}>{category.category_name}</a>,
      key: (index),
    })) || [];

  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl lg:gap-4 lg:text-2xl font-medium lg:hidden px-5 bg-secondary py-1">
      <Dropdown className="rounded-2xl" arrow menu={{ items }}>
        <div className="flex items-center gap-2 lg:gap-4 lg:text-2xl font-medium">
          <SettingsIcons />
          <span className="text-primary">Todos Eventos</span>
        </div>
      </Dropdown>
    </div>
  );
};
