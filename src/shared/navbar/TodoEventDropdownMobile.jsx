import React, { useEffect, useState } from "react";
import { Dropdown } from "antd";
import { SettingsIcons } from "@/lib/Icons";
import useCategoryList from "@/hooks/useCategoryList";
import { useAuth } from "@/hooks/useAuth";
import { Settings2 } from "lucide-react";

export const TodoEventDropdownMobile = () => {
  const { category, setCategory } = useAuth();
  const categoryData = useCategoryList();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Lock scroll when dropdown is open
  useEffect(() => {
    document.body.style.overflow = dropdownOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dropdownOpen]);

  const items = [
    {
      label: (
        <span className={`text-black text-lg ${category === 0 || category === null ? "font-bold" : ""}`}>
          Todos Eventos
        </span>
      ),
      key: "0",
    },
    ...(categoryData?.data?.map((cat) => ({
      label: (
        <span className={`text-black text-lg ${category === cat.id ? "font-bold" : ""}`}>
          {cat.category_name}
        </span>
      ),
      key: String(cat.id),
    })) || []),
  ];

  const handleClick = ({ key }) => {
    setCategory(Number(key));
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Title shown in dropdown trigger
  const selectedLabel =
    category === 0 || category === null
      ? "Todos Eventos"
      : categoryData?.data?.find((c) => c.id === category)?.category_name || "Todos Eventos";

  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl lg:hidden px-5 !text-black bg-secondary py-1">
      <Dropdown
        className="rounded-2xl"
        arrow
        menu={{
          items,
          onClick: handleClick,
          selectedKeys: [String(category ?? 0)],
          className: "custom-dropdown-menu",
        }}
        open={dropdownOpen}
        onOpenChange={(open) => setDropdownOpen(open)}
      >
        <div className="flex items-center gap-2 font-medium cursor-pointer">
            <Settings2 className="text-primary hidden" />
          <span className="text-primary text-lg">{selectedLabel}</span>
        </div>
      </Dropdown>
    </div>
  );
};
