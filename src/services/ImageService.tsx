import axios from "./CustomizeAxios";

export const fetchProdyctCardImage = (productId: string) => {
    return axios.get(`/img${productId}`);
}
