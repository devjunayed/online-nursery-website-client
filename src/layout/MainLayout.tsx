import { Outlet } from "react-router-dom";
import Header from "../components/Home/Header/Header";
import Container from "../components/ui/Container";
import Footer from "../components/Home/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <Container>
        <Header />

        <Outlet />

        <Footer />
      </Container>
    </div>
  );
};

export default MainLayout;
