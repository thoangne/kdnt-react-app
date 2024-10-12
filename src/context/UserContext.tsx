import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MyInFo } from '../initialize/type';
import { getToken } from '../services/TokenService';
import { fetchMyInfo as fetchUserInfo } from '../services/UserService'; // Đổi tên import để tránh trùng lặp

// Định nghĩa interface cho context
interface IUserContext {
  myInfo: MyInFo | null;
  setMyInfo: React.Dispatch<React.SetStateAction<MyInFo | null>>;
}

// Tạo context với giá trị mặc định là undefined
const UserContext = createContext<IUserContext | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Khởi tạo `myInfo` với giá trị null
  const [myInfo, setMyInfo] = useState<MyInFo | null>(null);

  useEffect(() => {
    const fetchMyUserInfo = async () => {
      const token = await getToken(); // Lấy token
      if (!token) {
        console.error("Không có token hợp lệ");
        return;
      }
        const user = await fetchUserInfo(token); // Gọi API để lấy thông tin user
        setMyInfo(user.data); // Cập nhật state với dữ liệu user
    };

    fetchMyUserInfo();
  }, []); // Chạy 1 lần khi component render

//   // Theo dõi sự thay đổi của myInfo và log khi nó thay đổi
//   useEffect(() => {
//     if (myInfo) {
//       console.log("myInfo đã được cập nhật:", JSON.stringify(myInfo));
//     }
//   }, [myInfo]); // Theo dõi sự thay đổi của myInfo

  return (
    <UserContext.Provider value={{ myInfo, setMyInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Tạo hook useUserContext để sử dụng context dễ dàng hơn
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
