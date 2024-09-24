import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Product } from '../../initialize/type';
import DefaultImg from '../../assets/DefaultImg.jpg';

interface ProductCardProps{
    product: Product;
     imageName:string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, imageName }) =>{
      return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={DefaultImg} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title> 
        <Card.Text>
          {product.productId}
        </Card.Text>
        <Card.Text>
          {imageName}
        </Card.Text>

        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;