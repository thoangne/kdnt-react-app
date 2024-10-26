import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/Header';
import BodyMenu from '../components/BodyMenu';
import ListItem from '../components/ListItem';
import Footer from '../layout/Footer';
import { Banner } from '../initialize/type';
import { SupportCard } from '../components/Card/SupportCard';

function Home() {
  const bannerData: Banner = {
    name: "Menu chính",
 };
  return (
    <>
      <Header />
      <BodyMenu bannerName={bannerData} />
      <ListItem />
      <SupportCard></SupportCard>
      <Footer />
    </>
  );
}

export default Home;
