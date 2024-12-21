import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import { useUserContext } from "../../../context/UserContext";
import "./Topbar.scss";
import { LogoutAPI } from "../../../services/AuthorService";
import { getToken } from './../../../services/TokenService';
import { useNavigate } from "react-router-dom";



const Topbar = () => {
  const {myInfo} = useUserContext();

  const navigate = useNavigate();

  const Logouthandler = async() => {
    const token = await getToken();
    if(token){
      await LogoutAPI(token);
      
      navigate("/home");
      window.location.reload();
    }
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        zIndex: 100
      }}
    >
      <div className="topbar-info">
        <span> {` Chào, ${myInfo?.firstName} ${myInfo?.lastName}`}</span>
        <button onClick={Logouthandler} className="logout-btn">Đăng xuất</button>
      </div>
    </AppBar>
  );
};

export default Topbar;