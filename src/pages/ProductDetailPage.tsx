import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/Header';
import BodyMenu from '../components/BodyMenu';
import ListItem from '../components/ListItem';
import Footer from '../layout/Footer';
import { Banner } from '../initialize/type';
import { ProductDetail } from '../layout/ProductDetail';

function ProductDetailPage() {

  return (
    <>
      <Header />
      <ProductDetail></ProductDetail>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
