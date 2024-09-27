import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputForm from './components/InputForm';

const HanderRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<InputForm />} />

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
