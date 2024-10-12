import { Login } from "../initialize/type";
import axios from "./CustomizeAxios";

export const LoginAPI = (loginInfo: Login) => {
    return axios.post("/token", loginInfo); // Truyền trực tiếp đối tượng loginInfo
};
