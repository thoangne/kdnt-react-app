import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { CheckOut } from './../layout/CheckOut';
import { SupportCard } from '../components/Card/SupportCard';

function ShoppingCartPage() {

  return (
    <>
      <Header />
      <CheckOut></CheckOut>
      <SupportCard></SupportCard>
      <Footer />
    </>
  );
}

export default ShoppingCartPage;
