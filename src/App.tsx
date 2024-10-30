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
import { FillerProduct } from './components/FilterProduct';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { LoginPage } from './pages/LoginPage';
<<<<<<< HEAD
import ListProduct from './layout/ListProduct';
import CategoryProductPage from './pages/CategoryProductPage';
=======
import { PayOut } from './layout/PayOut';
>>>>>>> 81db08d345e46f42a38518b9c8a26229398d22b6


const HanderRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
    <Route path="/my-info" element={<AccountPage />} />
<<<<<<< HEAD
    <Route path="/test" element={<ShoppingCartPage />} />
    <Route path="/collections/:categoryName/:categoryId" element={<CategoryProductPage />} />
=======
    <Route path="/test" element={<PayOut />} />
>>>>>>> 81db08d345e46f42a38518b9c8a26229398d22b6


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