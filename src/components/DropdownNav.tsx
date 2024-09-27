import React, { useState } from 'react';
import Dropdown from 'react-multilevel-dropdown';
import "./DropdownNav.scss";

export const DropdownNav = ({ category }: { category: string }) => {
  const [listItem, setListItem] = useState<string[]>([
    "item1", "item2", "item3", "item4", "item5", "item6", "item7"
  ]);
  const [subItem1, setSubItem1] = useState<string[]>([
    "subItem1", "subItem2", "subItem3", "subItem4", "subItem5", "subItem6", "subItem7"
  ]);
  const [subItem2, setSubItem2] = useState<string[]>([
    "subItem1", "subItem2", "subItem3", "subItem4", "subItem5", "subItem6", "subItem7"
  ]);

  const handleItemClick = (item: string) => {
    console.log("Item clicked:", item);
  };

  const handleSubItemClick = (subItem: string) => {
    console.log("Sub-item clicked:", subItem);
  };

  return (
    <div id="dropdown">
    <Dropdown title={category}>
      {listItem.map((item, index) => (
        <Dropdown.Item key={index} onClick={() => handleItemClick(item)}>
          {item}
          {/* Hiển thị submenu cho item 1 và item 2 */}
          {index === 0 && (
            <Dropdown.Submenu className='xxx'>
              {subItem1.map((sub, subIndex) => (
                <Dropdown.Item key={subIndex} onClick={() => handleSubItemClick(sub)}>
                  {sub}
                </Dropdown.Item>
              ))}
            </Dropdown.Submenu>
          )}
          {index === 1 && (
            <Dropdown.Submenu>
              {subItem2.map((sub, subIndex) => (
                <Dropdown.Item key={subIndex} onClick={() => handleSubItemClick(sub)}>
                  {sub}
                </Dropdown.Item>
              ))}
            </Dropdown.Submenu>
          )}
        </Dropdown.Item>
      ))}
    </Dropdown>
    </div>
  );
};
