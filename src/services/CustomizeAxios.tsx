import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8081'
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') || ''; // Nếu token là null, gán giá trị rỗng
    // Kiểm tra URL để xác định xem có cần thêm token không
    if (token && requiresAuth(config.url || '')) { // Kiểm tra URL, sử dụng chuỗi rỗng nếu config.url là undefined
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; // Trả về config
  },
  error => {
    return Promise.reject(error);
  }
);

// Hàm kiểm tra xem URL có cần token không
const requiresAuth = (url: string) => {
  const authRequiredEndpoints = [
    '/x',
    '/protected-route-2',
    // '/user/my-info',
    // Thêm các route cần xác thực vào đây
  ];

  return authRequiredEndpoints.some(endpoint => url.includes(endpoint));
};


export default instance;