import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/Header';
import BodyMenu from '../components/BodyMenu';
import ListItem from '../components/ListItem';
import Footer from '../layout/Footer';
import { Banner } from '../initialize/type';
import { SupportCard } from '../components/Card/SupportCard';
import ListProduct from '../layout/ListProduct';

function CategoryProductPage() {
  return (
    <>
      <Header />
      <ListProduct />
      <SupportCard></SupportCard>
      <Footer />
    </>
  );
}

export default CategoryProductPage;
