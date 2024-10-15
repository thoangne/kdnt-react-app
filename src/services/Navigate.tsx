import { useNavigate } from "react-router-dom";

export const Navigate = (destination: string) => {
    const navigate = useNavigate();
    navigate(destination);
}