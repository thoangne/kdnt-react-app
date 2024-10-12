import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { RegisterPage } from './pages/RegisterPage';
import './App.sass'
import { ProductDetail } from './components/ProductDetail';
import MyInfo from './layout/MyInfo';


const HanderRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/test" element={<MyInfo />} />

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