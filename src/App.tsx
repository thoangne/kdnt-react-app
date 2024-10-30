import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { RegisterPage } from './pages/RegisterPage';
import './App.sass'
import { ProductDetail } from './layout/ProductDetail';
import MyInfo from './layout/MyInfo';
import ProductDetailPage from './pages/ProductDetailPage';
import AccountPage from './pages/AccountPage';
import { FillerProduct } from './components/FillerProduct';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { LoginPage } from './pages/LoginPage';
import { PayOut } from './layout/PayOut';


const HanderRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
    <Route path="/my-info" element={<AccountPage />} />
    <Route path="/test" element={<PayOut />} />


  </Routes>
);

function App() {
  return (
    <>
      <BrowserRouter>
      <HanderRoutes />
    </BrowserRouter>

   
    </>
  );
}

export default App;