const Logo = ({className}: {className?: string}) => {
  return (
    <div className={`${className} text-center text-[#60A83B] uppercase text-3xl my-4`}>
      🌱🌳 <br />{" "}
      <span className=" font-bold font-Logo italic">
        Gach Lagao
      </span>
    </div>
  );
};

export default Logo;
