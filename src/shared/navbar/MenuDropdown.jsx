import React from 'react';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const items = [
  {
    label: (
      <Link to="/log-in"  className="text-lg sm:text-xl font-semibold pr-6 !sm:pr-16 block py-2 sm:py-3">
        Iniciar Sesión de Negocios
      </Link>
    ),
    key: '0',
  },
  {
    label: (
      <Link to="/profile"  className="text-lg sm:text-xl font-semibold pr-6 !sm:pr-16 block py-2 sm:py-3">
        Crear Cuenta de Negocios
      </Link>
    ),
    key: '1',
  },
  {
    label: (
      <Link to="/tutorials"  className="text-lg sm:text-xl font-semibold pr-6 !sm:pr-16 block py-2 sm:py-3">
        Tutoriales
      </Link>
    ),
    key: '2',
  },
  {
    label: (
      <Link to="/about-us" className="text-lg sm:text-xl font-semibold pr-6 !sm:pr-16 block py-2 sm:py-3">
        Acerca de Nosotros
      </Link>
    ),
    key: '3',
  },
  
];

const MenuDropdown = () => (
  <Dropdown 
  arrow={{ pointAtCenter: true }}
    menu={{ 
      items,
      className: 'custom-menu' // Add custom class for the menu
    }} 
    trigger={['click']}
    overlayClassName=" custom-dropdown [&_.ant-dropdown-arrow]:before:!bg-[#FDE300] [&_.ant-dropdown-arrow]:before:!border-t-[#FDE300] [&_.ant-dropdown-arrow]:before:!border-l-[#FDE300] [&_.ant-dropdown-arrow]:after:!bg-[#FDE300] [&_.ant-dropdown-arrow]:after:!border-t-[#FDE300] [&_.ant-dropdown-arrow]:after:!border-l-[#FDE300]"
    dropdownRender={(menu) => (
      <div className=" bg-[#FDE300] rounded-lg shadow-lg sm:p-5 ">
        {React.cloneElement(menu, {
          style: { 
            boxShadow: 'none', 
            backgroundColor: 'transparent',
          },
        })}
      </div>
    )}
  >
   
      <Space>
        <Menu className="size-8 md:size-10 lg:size-12 cursor-pointer" />
      </Space>
 
  </Dropdown>
);

export default MenuDropdown;