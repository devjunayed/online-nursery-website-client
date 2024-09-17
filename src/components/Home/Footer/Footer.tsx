import Logo from "../../ui/Logo";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-green text-white p-10">
        <aside>
          <Logo className="text-white" />
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
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

export default Footer;
