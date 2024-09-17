import { Outlet } from "react-router-dom";
import Header from "../components/Home/Header/Header";
import Container from "../components/ui/Container";

const MainLayout = () => {
  return (
    <div className="bg-white">
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
