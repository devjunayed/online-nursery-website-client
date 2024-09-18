import Header from "../components/Home/Header/Header";
import DashboardMenu from "../components/Dashboard/DashboardMenu/DashboardMenu";
import Container from "../components/ui/Container";
import BottomFooter from "../components/Home/Footer/BottomFooter";

const DashboardLayout = () => {
  return (
    <Container>
      <Header />
      <DashboardMenu />
      <BottomFooter />
    </Container>
  );
};

export default DashboardLayout;
