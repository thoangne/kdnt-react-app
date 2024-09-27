import 'bootstrap/dist/css/bootstrap.min.css';
import InputForm from './components/InputForm';
import { CarouselCard } from './components/Card/CarouselCard';
import Header from "./layout/Header";
 import BodyMenu from './components/BodyMenu';
import { Banner } from './initialize/type.tsx'; 
import ListItem from './components/ListItem.tsx';


function App() {
   const bannerData: Banner = {
    name: "Menu chính", 
  };

  return (
    <>
        <Header  />
      <BodyMenu bannerName={bannerData} /> 
      <ListItem></ListItem> 
      {/* <InputForm/> */}
      {/* <CarouselCard></CarouselCard> */}
    </>
  );
}

export default App;
