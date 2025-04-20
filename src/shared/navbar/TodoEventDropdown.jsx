import React from 'react';
import { Dropdown, Space } from 'antd';
import { SettingsIcons } from '@/lib/Icons';
const items = [
  {
    label: (
      <a >
       Todos Eventos
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a >
        Comedia
      </a>
    ),
    key: '1',
  },

  {
    label: 'Música en vivo',
    key: '2',
  },

  {
    label: 'Comida y Bebida',
    key: '3',
  },

  {
    label: 'Cine and Televisión',
    key: '4',
  },

  {
    label: 'Talleres y Clases',
    key: '5',
  },

  {
    label: 'Variedad y Otros',
    key: '6',
  },

  {
    label: 'Variedad y Otros',
    key: '7',
  },

  {
    label: 'Variedad y Otros',
    key: '8',
  },
];
const TodoEventDropdown = () => (
  <Dropdown    arrow menu={{ items }} trigger={['click']}>
    <a onClick={e => e.preventDefault()}>
      <Space>
      <button className="flex items-center gap-4 text-2xl font-medium"><SettingsIcons /> Todos Eventos</button>
     
      </Space>
    </a>
  </Dropdown>
);
export default TodoEventDropdown;