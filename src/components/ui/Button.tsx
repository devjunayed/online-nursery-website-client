import { ReactNode } from "react";

const Button = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return <button className={`${className} bg-white  text-black outline-none border-none px-6 py-2 rounded text-xs md:text-md lg:text-base`}>{children}</button>;
};

export default Button;
