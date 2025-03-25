import { FaStore } from "react-icons/fa";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

function TopBar() {
  return (
    <div className="bg-blue-whale text-[#FFFFFF]">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Left */}
        <div className="md:flex gap-1 items-center hidden ">
          <div className="hover:text-hover-color">
            <a href="#">
              <FaStore size={24} />
            </a>
          </div>

          <div className="text-sm hover:text-hover-color">
            <a href="+923039287727 " className="">
              +{92}303-928-7727
            </a>
          </div>
        </div>

        <div className="text-sm text-center flex-grow">
          <i> "Fast & Secure Shipping – Delivering Happiness Worldwide!" 🌍</i>
        </div>

        {/* Right Icons */}
        <div className="md:flex items-center hidden  space-x-0">
          <div className="hover:text-hover-color">
            <a href="#">
              <TbBrandMeta className="w-5 h-5" />
            </a>
          </div>
          <div className="hover:text-hover-color">
            <a href="#">
              <IoLogoInstagram className="w-5 h-5" />
            </a>
          </div>
          <div className="hover:text-hover-color">
            <a href="#">
              <RiTwitterXLine className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
