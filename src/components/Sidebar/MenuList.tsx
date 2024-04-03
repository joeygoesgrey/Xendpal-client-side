import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
// import SubMenu from "./SubMenu";

interface MenuItem {
  label: string;
  path?: string;
  icon?: any;  
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
            // return <SubMenu key={menu.label} menu={menus} toggle={toggle} />;
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
