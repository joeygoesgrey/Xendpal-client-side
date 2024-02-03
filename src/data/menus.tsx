import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faTachometer,
  faFolderTree,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

// Define a type for menu items
type MenuItem = {
  label: string;
  path: string;
  icon: IconDefinition;
};

const initMenu: MenuItem[] = [
  {
    label: "Upload",
    path: "/upload",
    icon: faUpload,
  },
  {
    label: "My Items",
    path: "/items",
    icon: faFolderTree,
  },
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },
];

export default initMenu;
