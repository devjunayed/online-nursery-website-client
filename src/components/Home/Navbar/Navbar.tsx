import { ShoppingCartOutlined } from "@ant-design/icons";
import Container from "../../ui/Container";

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
  return (
    <>
      <Container>
        <div className="navbar bg-[#60A83B] uppercase  text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="text-white menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links.map((link) => (
                  <li>
                    <a href={link.path}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="navbar-start hidden lg:flex">
              <ul className="menu  menu-horizontal px-1">
                {links.map((link) => (
                  <li className="">
                    <a className="text-red-white font-bold" href={link.path}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="navbar-end">
            <a href="">
            <ShoppingCartOutlined />
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
