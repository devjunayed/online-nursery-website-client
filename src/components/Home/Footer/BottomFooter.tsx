
const BottomFooter = () => {
  return (
    <>

      <footer
        style={{
          backgroundImage: "url('/assets/banner.svg')",
        }}
        className=" footer hero  footer-center h-full w-full bg-cover bg-center bg-no-repeat  text-white  "
      >
        <div className="hero-overlay opacity-90"></div>
        <aside className="hero-content font-bold">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by GACH
            LAGAO
          </p>
        </aside>
      </footer>
    </>
  );
};

export default BottomFooter;
