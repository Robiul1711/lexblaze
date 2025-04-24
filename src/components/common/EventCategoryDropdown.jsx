import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { ChevronDown } from 'lucide-react';

const EventCategoryDropdown = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    'Música en vivo',
    'Comedia',
    'Deportivos',
    'Arte & Cultura',
    'Comida y Bebida',
    'Cine y Televisión',
    'Talleres y Clases',
    'Variedad y Otro'
  ];

  const handleChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(item => item !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="relative group">
      {/* Dropdown trigger button */}
      <ChevronDown />
 

      {/* Dropdown menu */}
      <div className="absolute z-10 hidden group-hover:block mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
        <div className="py-1">
          {categories.map((category) => (
            <label 
              key={category} 
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <Checkbox 
                checked={selectedCategories.includes(category)}
                onChange={() => handleChange(category)}
                className="mr-3"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCategoryDropdown;