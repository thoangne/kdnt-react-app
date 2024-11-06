import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { PayOut } from '../layout/PayOut';

function PayOutPage() {
  return (
    <>
      <Header />
      <PayOut></PayOut>
      <Footer />
    </>
  );
}

export default PayOutPage;
