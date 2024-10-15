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


const HanderRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
    <Route path="/my-info" element={<AccountPage />} />

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