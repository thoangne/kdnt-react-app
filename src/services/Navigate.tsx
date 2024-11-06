import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
    const navigate = useNavigate();

    const navigateTo = (destination: string) => {
        navigate(destination);
    };

    return { navigateTo };
};
