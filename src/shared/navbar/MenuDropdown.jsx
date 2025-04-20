import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Iniciar Sesión de Negocios', href: 'log-in' },
  { name: 'Crear Cuenta de Negocios', href: 'profile' },
  { name: 'Tutoriales', href: 'tutorials' },
  { name: 'Acerca de Nosotros', href: '/' }, // 
];

const MenuDropdown = () => {
  return (
    <div className="w-full max-w-[600px] mx-auto bg-primary backdrop-blur-md text-black p-6 rounded-xl shadow-xl">
      <nav className="space-y-4 md:space-y-5">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="block text-lg md:text-xl font-medium py-2 px-3 rounded-lg transition-colors duration-200 hover:text-primary-400 hover:bg-gray-800/50"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuDropdown;
