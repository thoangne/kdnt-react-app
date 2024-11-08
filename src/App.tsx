import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import './App.sass'
import ProductDetailPage from './pages/ProductDetailPage';
import AccountPage from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import CategoryProductPage from './pages/CategoryProductPage';
import PayOutPage from './pages/PayOutPage';
import AdminPage from './admin/AdminPage';



const HanderRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
    <Route path="/my-info" element={<AccountPage />} />
    <Route path="/collections/:categoryName/:categoryId" element={<CategoryProductPage />} />
    <Route path="payout" element={<PayOutPage />} />
    <Route path="test" element={<AdminPage />} />
    <Route path="/collections/:categoryName/:categoryId" element={<CategoryProductPage />} />
    <Route path="/admin/*" element={<AdminPage />} />
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