import React, { useEffect, useState } from "react";

const Sidebar: React.FC = () => {

  return (
    <div className="account-form-container">
          <h2 className="account-cust">Tài khoản</h2>
              <ul className="list-unstyle">
                <li className="cust-row w-50p">
                  <a className="list-cur" href="#">
                    Thông tin tài khoản
                  </a>
                </li>
                <li className="cust-row w-50p">
                  <a className="list-cur" href="#">
                    Đơn hàng của bạn
                  </a>
                </li>
                <li className="cust-row w-50p">
                  <a className="list-cur" href="#">
                    Đăng xuất
                  </a>
                </li>
              </ul>
    </div>
  );
};

export default Sidebar;
