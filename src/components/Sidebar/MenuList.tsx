import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";
import { ApplicationContext } from "@/context/ApplicationContext";

interface MenuItem {
  label: string;
  path?: string;
  icon?: any; // Adjust the type of icon accordingly (e.g., IconDefinition from FontAwesome)
  submenu?: MenuItem[];
}

interface MenuListProps {
  menus: MenuItem[];
  toggle: () => void;
}

function MenuList({ menus, toggle }: MenuListProps) {
  return (
    <div className="navWrapper p-4">
      <ul id="menu" className="">
        {menus?.map((menu) => {
          if (menu.submenu) {
            // Handle submenu case here
            return <SubMenu key={menu.label} menu={menu} toggle={toggle} />;
          } else if (menu.path) {
            // Handle menu item with path
            return (
              <li key={menu.label} className={``} onClick={toggle}>
                <NavLink
                  to={`${menu.path}`}
                  className="link no-underline relative"
                >
                  {menu.icon && <FontAwesomeIcon icon={menu.icon} />}
                  {menu.label}{" "}
                </NavLink>
              </li>
            );
          } else {
            // Handle any other case here (optional)
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default MenuList;
