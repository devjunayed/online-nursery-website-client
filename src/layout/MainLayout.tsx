import { Outlet } from "react-router-dom";
import Header from "../components/Home/Header/Header";
import Container from "../components/ui/Container";
import TopFooter from "../components/Home/Footer/TopFooter";
import BottomFooter from "../components/Home/Footer/BottomFooter";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <Container>
        <Header />
        <Outlet />
        <TopFooter />
        <BottomFooter />
      </Container>
    </div>
  );
};

export default MainLayout;
