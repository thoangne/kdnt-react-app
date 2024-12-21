import React, { useEffect, useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import "./Customer.scss";
import { fetchAllUser } from "../../../services/UserService";
import { User } from "../../../initialize/type";
import CustomerUpdateModal from "./modal/CustomerModal";

// Định nghĩa kiểu dữ liệu User



function Customer() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const getAllUser = async() => {
      const res = await fetchAllUser();
      setUsers(res.data);
    }

    getAllUser();
  }, [])

  const handleUpdateUser = (updatedUser: User) => {
    console.log("Updated user:", updatedUser);
    // Perform the update logic (e.g., call API to update the user)
  };

  const handleDeleteUser = (id: string) => {
    console.log("Deleted user ID:", id);
  };

  const handleShowModal = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div>
    <div className="customer-header">
      <h1>Khách Hàng</h1> 
    </div>

      <div className="customer-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>HỌ TÊN</th>
              <th>EMAIL</th>
              <th>SỐ ĐIỆN THOẠI</th>
              <th>USERNAME</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
              <th>XEM CHI TIẾT</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.username}</td>
                <td className="status">
                  {user.status ? (
                    <span className="hoat-dong">On</span>
                  ) : (
                    <span className="tam-ngung">Off</span>
                  )}
                </td>
                <td className="button">
                  <CustomerUpdateModal
                    customer={user}
                    onUpdate={handleUpdateUser}
                  />
                </td>
                <td className="button-view">
                  <FaEye
                    className="view-icon"
                    onClick={() => handleShowModal(user)}
                    title="Xem chi tiết"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for full user details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p><strong>ID:</strong> {selectedUser.userId}</p>
              <p><strong>Họ tên:</strong> {`${selectedUser.firstName} ${selectedUser.lastName}`}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Số điện thoại:</strong> {selectedUser.phoneNumber}</p>
              <p><strong>Tên đăng nhập:</strong> {selectedUser.username}</p>
              <p><strong>Ngày tạo:</strong> {selectedUser.createAt}</p>
              <p><strong>Trạng thái:</strong> {selectedUser.status ? "Hoạt động" : "Không hoạt động"}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

  </div>

    
  );
}

export default Customer;

