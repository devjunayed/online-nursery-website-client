import {
  CloseOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGetCartQuery } from "../../../redux/api/cart/cartApi";

const Navbar = () => {
  const {data: cartData} = useGetCartQuery("");

  const links = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/products",
      text: "Products",
    },
    {
      path: "/dashboard",
      text: "Dashboard",
    },
  ];

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="relative navbar rounded px-6 bg-[#60A83B] uppercase text-white">
        <div className=" w-full">
          {/* smaller device menu */}
          <div className={`${menu && 'z-[30]'} absolute top-2 left-0 lg:hidden`}>
            <div
              role="button"
              className="btn btn-ghost "
              onClick={handleMenu}
            >
              {!menu ? <MenuOutlined /> : <CloseOutlined />}
            </div>
            <ul
            onClick={handleMenu} 
              className={`${
                menu ? "translate-x-0 transition-transform duration-500 ease-in-out" : "-translate-x-[500rem] transition-none"
              } transform text-white bg-[#60A83B] menu menu-sm dropdown-content rounded z-[1] mt-3 w-52 p-2 shadow`}
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
                <li  key={link?.path} className="hover:cursor-pointer">
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
        <div className="">
          <a href="/cart" className="block relative">
            <ShoppingCartOutlined />
            <span className="absolute -top-2 -right-3 text-xs">{cartData?.data?.length}</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
