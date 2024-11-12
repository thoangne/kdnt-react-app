import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";
import InstallationPage from "../pages/installation/InstallationPage";
import CustomersPage from "../pages/customers/CustomersPage";
import EmployeesPage from "../pages/employees/EmployeesPage";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUserTie, FaUser } from "react-icons/fa";
const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "overview",
    element: <InstallationPage />,
    state: "overview",
    sidebarProps: {
      displayText: "Tổng quan",
      icon: <FileDownloadOutlinedIcon />
    }
  },



  {
    path: "product",
    element: <ComponentPageLayout />,
    state: "product",
    sidebarProps: {
      displayText: "Sản phẩm",
      icon: <RiProductHuntLine />
    },
    child: [
      {
        path: "product-page",
        element: <AlertPage />,
        state: "product.product",
        sidebarProps: {
          displayText: "Sản phẩm"
        },
      },
      {
        path: "category", // Đã sửa từ "/component/button" thành "button"
        element: <ButtonPage />,
        state: "product.category",
        sidebarProps: {
          displayText: "Danh mục"
        }
      }
    ]
  },

  {
    path: "orders",
    element: <ComponentPageLayout />,
    state: "orders",
    sidebarProps: {
      displayText: "Đơn hàng",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "delivered",
        element: <AlertPage />,
        state: "orders.delivered",
        sidebarProps: {
          displayText: "Đã giao"
        },
      },
      {
        path: "processing", // Đã sửa từ "/component/button" thành "button"
        element: <EmployeesPage />,
        state: "orders.processing",
        sidebarProps: {
          displayText: "Đang xử lý"
        }
      },
      {
        path: "delivering", // Đã sửa từ "/component/button" thành "button"
        element: <ButtonPage />,
        state: "orders.delivering",
        sidebarProps: {
          displayText: "Đang giao"
        }
      }
    ]
  },

  {
    path: "promotion",
    element: <ComponentPageLayout />,
    state: "promotion",
    sidebarProps: {
      displayText: "Khuyến mãi",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "on-promotion",
        element: <AlertPage />,
        state: "promotion.on-promotion",
        sidebarProps: {
          displayText: "Đang khuyến mãi"
        },
      },
      {
        path: "promotied", // Đã sửa từ "/component/button" thành "button"
        element: <EmployeesPage />,
        state: "promotion.processing",
        sidebarProps: {
          displayText: "Đã khuyến mãi"
        }
      },
      {
        path: "create-promotion", // Đã sửa từ "/component/button" thành "button"
        element: <ButtonPage />,
        state: "promotion.delivering",
        sidebarProps: {
          displayText: "Thêm khuyến mãi"
        }
      }
    ]
  },

  {
    path: "employees",
    element: <EmployeesPage />,
    state: "employees",
    sidebarProps: {
      displayText: "Nhân viên",
      icon: <FaUserTie  />
    }
  },  

  {
    path: "customers",
    element: <CustomersPage />,
    state: "customers",
    sidebarProps: {
      displayText: "Khách hàng",
      icon: <FaUser  />
    }
  },
];

export default appRoutes;
