import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Purchase.scss'
function Purchase() {

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="custom-nav-cus">
          <Nav className="me-auto nav-custom-br">
            <Nav.Link className="nav-link-custom" href="#home">Tất cả</Nav.Link>
            <Nav.Link className="nav-link-custom" href="#features">Vận chuyển</Nav.Link>
            <Nav.Link className="nav-link-custom" href="#pricing">Chờ giao hàng</Nav.Link>
            <Nav.Link className="nav-link-custom" href="#pricing">Hoàn thành</Nav.Link>
          </Nav>
      </Navbar>
      <div className="bgr-container">
        <div className="status-product">
            <span>Chờ giao hàng</span>
        </div>
        <a className="card-horizontal link-atri">
            <img src="https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_giuong_ngu_go_tram_vline_1m8_a_6ba57dbc2c7943509208badc020decf8_master.jpg" alt="" />
            <div className="card-midle">
                <span className="card-hori-name">
                    Bàn gõ chất lượng cao
                </span>
                <span className="type-hori">
                    Đen, 100cm
                </span>
                <span className="quantity-card-hori">
                    x1
                </span>
            </div>
            <div className="price-hori">
                <span className="sale-price">
                    đ3.689.000
                </span>
                <span className="pre-price">
                    đ2.394.000
                </span>
            </div>
        </a>        
        <a className="card-horizontal link-atri">
            <img src="https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_giuong_ngu_go_tram_vline_1m8_a_6ba57dbc2c7943509208badc020decf8_master.jpg" alt="" />
            <div className="card-midle">
                <span className="card-hori-name">
                    Bàn gõ chất lượng cao
                </span>
                <span className="type-hori">
                    Đen, 100cm
                </span>
                <span className="quantity-card-hori">
                    x1
                </span>
            </div>
            <div className="price-hori">
                <span className="sale-price">
                    đ3.689.000
                </span>
                <span className="pre-price">
                    đ2.394.000
                </span>
            </div>
        </a>        
        <a className="card-horizontal link-atri">
            <img src="https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_giuong_ngu_go_tram_vline_1m8_a_6ba57dbc2c7943509208badc020decf8_master.jpg" alt="" />
            <div className="card-midle">
                <span className="card-hori-name">
                    Bàn gõ chất lượng cao
                </span>
                <span className="type-hori">
                    Đen, 100cm
                </span>
                <span className="quantity-card-hori">
                    x1
                </span>
            </div>
            <div className="price-hori">
                <span className="sale-price">
                    đ3.689.000
                </span>
                <span className="pre-price">
                    đ2.394.000
                </span>
            </div>
        </a>        

       
      </div>
    </>
  );
}

export default Purchase;