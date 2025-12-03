import React, { useState, useEffect } from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import { useLocation } from '@docusaurus/router';

function CustomModulesDropdownNavbarItem({ label, position, ...props }) {
  const [dynamicItems, setDynamicItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Dynamically fetch module information.
    // In a real application, you might read from a global context or an API.
    // For this Docusaurus setup, we can infer from docs structure.
    // This is a simplified example; a robust solution might involve build-time data generation.

    const modules = [
      {
        label: 'Module 1: ROS 2',
        to: '/docs/module1/',
      },
      {
        label: 'Module 2: Digital Twin',
        to: '/docs/module2/',
      },
      {
        label: 'Module 3: AI-Robot Brain',
        to: '/docs/module3/',
      },
      // Assuming Module 4 might exist in the future, add a placeholder
      {
        label: 'Module 4: VLA (Coming Soon)',
        to: '/docs/module4/',
      },
    ];
    setDynamicItems(modules);
  }, [location.pathname]);

  const allItems = [
    // You can add static items here if needed
    ...dynamicItems,
  ];

  if (!allItems.length) {
    return null; 
  }

  return (
    <DropdownNavbarItem
      {...props}
      label={label}
      position={position}
      items={allItems}
    />
  );
}

export default CustomModulesDropdownNavbarItem;
