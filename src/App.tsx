import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
// import './App.sass'
import ProductDetailPage from './pages/ProductDetailPage';
import AccountPage from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import CategoryProductPage from './pages/CategoryProductPage';
import PayOutPage from './pages/PayOutPage';
import AdminPage from './admin/AdminPage';
import MainLayout from './Admin1/components/layout/MainLayout';
import { routes } from './Admin1/routes';
import DefaultPage from './Admin1/pages/dashboard/DefaultPage';
import CategoryPage from './Admin1/pages/category/CategoryPage';
import OrderDeliveredPage from './Admin1/pages/orders/OrderDeliveredPage';
import OrderProcessingPage from './Admin1/pages/orders/OrderProcessingPage';
import OrderDeliveringPage from './Admin1/pages/orders/OrderDeliveringPage';
import AnalyticsPage from './Admin1/pages/dashboard/AnalyticsPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProductPage from './Admin1/pages/products/ProductPage';
import OrderTracking from './Admin1/pages/orders/OrderTracking';
import MyOrdersPage from './pages/MyOrdersPage';
import OnPromotion from './Admin1/pages/promotion/onPromotion';
import PromotionDetail from './Admin1/pages/promotion/PromotionDetail';


const HanderRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
    <Route path="/my-info" element={<AccountPage />} />
    <Route path="/shopping-cart" element={<ShoppingCartPage />} />
    <Route path="/collections/:categoryName/:categoryId" element={<CategoryProductPage />} />
    <Route path="payout" element={<PayOutPage />} />
    <Route path="/collections/:categoryName/:categoryId" element={<CategoryProductPage />} />
    <Route path="/my-orders" element={<MyOrdersPage />} />
    
    
    <Route path="/admin" element={<MainLayout />}>
          {routes}
        {/* Child router admin */}
        <Route path="overview" element={<DefaultPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="product-page" element={<ProductPage />} />
        <Route path="processing" element={<OrderTracking />} />

        <Route path="on-promotion" element={<OnPromotion />} />
        <Route path="promotied" element={<OrderTracking />} />
        <Route path="create-promotion" element={<OrderTracking />} />

        <Route path="promotion-detail/:promotionId" element={<PromotionDetail />} />
        

    </Route>

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