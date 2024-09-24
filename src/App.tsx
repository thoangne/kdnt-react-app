import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownNav } from "./components/DropdownNav";
import {Product} from "./initialize/type";
import {ProductDefault} from "./initialize/defaultType";
import ProductCard from "./components/Card/ProductCard";



function App() {
  const [product, setProduct] = useState<Product>(ProductDefault);

  return (
    <>

    <Header/>
    <DropdownNav></DropdownNav>
    <ProductCard product={product} imageName="hehe" ></ProductCard>
    </>
  );
}

export default App;
