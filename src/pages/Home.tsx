import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/Header';
import BodyMenu from '../components/BodyMenu';
import ListItem from '../components/ListItem';
import Footer from '../layout/Footer';
import { Banner } from '../initialize/type';
// import InputForm from './components/InputForm';
// import { CarouselCard } from './components/Card/CarouselCard';


function Home() {
   const bannerData: Banner = {
    name: "Menu chính", 
  };

  return (
    <>
    <Header  />
      <BodyMenu bannerName={bannerData} /> 
      <ListItem></ListItem> 
      <Footer></Footer>
    </>
  );
}

export default Home;
