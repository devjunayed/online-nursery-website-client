import {
  CloseOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/products",
      text: "Products",
    },
  ];

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="relative navbar rounded px-6 bg-[#60A83B] uppercase text-white">
        <div className="navbar-start">
          {/* smaller device menu */}
          <div className="absolute top-2 z-[30] left-0 lg:hidden">
            <div
              role="button"
              className="btn btn-ghost "
              onClick={handleMenu}
            >
              {!menu ? <MenuOutlined /> : <CloseOutlined />}
            </div>
            <ul
              className={`${
                menu ? "translate-x-30" : "-translate-x-[50rem]"
              } transform transition-transform duration-500 ease-in-out text-white bg-[#60A83B] menu menu-sm dropdown-content rounded z-[1] mt-3 w-52 p-2 shadow`}
            >
              {links.map((link) => (
                <li key={link?.path} className="hover:cursor-pointer">
                  <NavLink className={"cursor-pointer"} to={link?.path}>
                    {link?.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Larger device menu */}
          <div className="navbar-start hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {links.map((link) => (
                <li key={link?.path} className="hover:cursor-pointer">
                  <NavLink
                    className="hover:cursor-pointer text-white font-bold"
                    to={link?.path}
                  >
                    {link?.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <a href="" className="block relative">
            <ShoppingCartOutlined />
            <span className="absolute -top-2 -right-3 text-xs">{0}</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
