import Button from "../../ui/Button";

const Banner = () => {
  return (
    <div
      className="hero min-h-[70vh] relative my-10"
      style={{
        backgroundImage: "url('/assets/banner.svg')",
      }}
    >
      <div className="hero-content  text-black-content text-center">
        {/* Background overlay with reduced opacity */}
        <div className="bg-gray-600 opacity-70 w-11/12 md:w-2/3  h-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

        {/* Non-transparent text content */}
        <div className="relative z-10 max-w-xs md:max-w-lg  xl:max-w-xl text-gray-50  py-10">
          <h1 className="mb-5 text-xl md:text-3xl lg:text-5xl font-bold">Grow Your Green Haven</h1>
          <p className="mb-5 text-sm md:text-md lg:text-lg">
            Discover a wide range of plants and gardening essentials to bring
            nature into your home. Shop now and nurture your own green space
            with ease!
          </p>
          <Button className=" ">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
