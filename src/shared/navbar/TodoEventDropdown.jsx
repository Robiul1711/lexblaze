import React from "react";
import { Dropdown, Space } from "antd";
import { SettingsIcons } from "@/lib/Icons";
const items = [
  {
    label: <a>Todos Eventos</a>,
    key: "0",
  },
  {
    label: <a>Comedia</a>,
    key: "1",
  },

  {
    label: "Música en vivo",
    key: "2",
  },

  {
    label: "Comedia",
    key: "3",
  },
  {
    label: "Deportivos",
    key: "4",
  },

  {
    label: "Arte y Cultura",
    key: "5",
  },

  {
    label: "Comida y Bebida",
    key: "6",
  },

  {
    label: "Cine and Televisión",
    key: "7",
  },

  {
    label: "Talleres y Clases",
    key: "8",
  },

  {
    label: "Variedad y Otro",
    key: "9",
  },
];
export const TodoEventDropdown = () => (
  <Dropdown className="" arrow menu={{ items }} trigger={["click"]}>
    <Space>
      <button className="lg:flex w-full items-center gap-2 lg:gap-4 lg:text-2xl font-medium hidden  ">
        <SettingsIcons /> <span className="">Todos Eventos</span>{" "}
      </button>
    </Space>
  </Dropdown>
);
export const TodoEventDropdownMobile = () => (
  <>
    <div className="flex items-center justify-center gap-2 rounded-2xl lg:gap-4 lg:text-2xl font-medium lg:hidden px-5  bg-secondary py-1">
      <Dropdown className="rounded-2xl " arrow menu={{ items }}>
        <div className="flex items-center gap-2 lg:gap-4 lg:text-2xl font-medium">
          <SettingsIcons />
          <span className="text-primary">Todos Eventos</span>
        </div>
      </Dropdown>
    </div>
  </>
);
