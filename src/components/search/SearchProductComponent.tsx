import { useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";
import "./SearchProductComponent.scss";

function SearchProductComponent() {
  const [inputText, setInputText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value.toLowerCase());
    setSelectedProduct(null); // Reset selection on input change
  };

  const handleSelectProduct = (productId: string, name: string) => {
    setInputText(name); // Set the input text to the selected product name
    setSelectedProduct(productId);
  };

  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          value={inputText}
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      {inputText && !selectedProduct && (
        <List input={inputText} onSelect={handleSelectProduct} />
      )}
    </div>
  );
}

export default SearchProductComponent;
