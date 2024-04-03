import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTimes, IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface SidebarLogoProps {
  icon: IconDefinition;
  text: string;
  toggle: () => void;
}

function SidebarLogo({ icon, text, toggle }: SidebarLogoProps) {
  return (
    <div className="relative flex flex-row font-semibold text-3xl md:items-center md:mx-auto text-green-700 mb-5 p-4 justify-between">
      <Link to="/" className="text-emerald-300">
        <FontAwesomeIcon icon={icon} /> {text}
      </Link>
      <button
        onClick={toggle}
        className="border border-emerald-300 text-xl font-medium py-2 px-4 block md:hidden absolute right-1 top-3"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <style>
        {`.see{
          border: 2px solid red
        }`}
      </style>
    </div>
  );
}

export default SidebarLogo;
