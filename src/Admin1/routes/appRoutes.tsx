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
import OrderTracking from "../pages/orders/OrderTracking";
import Dashboard from "../pages/installation/DashBoard";
import OnPromotion from "../pages/promotion/onPromotion";
const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "overview",
    element: <Dashboard />,
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
    path: "order",
    element: <OrderTracking />,
    state: "order",
    sidebarProps: {
      displayText: "Đơn hàng",
      icon: <FileDownloadOutlinedIcon />
    }
  },

  {
    path: "promotion",
    element: <OnPromotion />,
    state: "promotion",
    sidebarProps: {
      displayText: "Khuyến mãi",
      icon: <AppsOutlinedIcon />
    }
  },

  // {
  //   path: "employees",
  //   element: <EmployeesPage />,
  //   state: "employees",
  //   sidebarProps: {
  //     displayText: "Nhân viên",
  //     icon: <FaUserTie  />
  //   }
  // },  

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
