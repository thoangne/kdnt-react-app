import { useEffect, useState } from "react";
import { Product, Promotion, PromotionProduct, PromotionProductRequest } from "../initialize/type";
import axios from "./CustomizeAxios";
import { checkToken } from "./TokenService";

export const fetchAllPromotionAPI = async () => {
    const token = await checkToken();
      
    try {
      const res = await axios.get(`/promotion`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khuyến mãi:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  };

  export const fetchAllProductByPromotionIdAPI = async (promotionId: string): Promise<Product[]> => {
    const token = await checkToken();
  
    try {
      const res = await axios.get(`/promotion-pro/${promotionId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res && res.data && res.data.data) {
        const promotionProducts: PromotionProduct[] = res.data.data;
      
        // Đảm bảo trích xuất sản phẩm theo cách bất đồng bộ (nếu cần)
        const products: Product[] = await Promise.all(
          promotionProducts.map(async (pp) => {
            return pp.product; // Thay đổi xử lý bên trong nếu cần bất đồng bộ
          })
        );
        return products;
      }
      
  
      return []; // Trả về mảng rỗng nếu không có dữ liệu
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm theo mã khuyến mãi:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  };



  export const addPromotionAPI = async(promotion: Promotion) => {
    const token = await checkToken();
    try {
      const res = await axios.post(`/promotion`, promotion, {
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
      });
  
      return res.data;
    } catch (error) {
      console.error("Lỗi khi thêm khuyến mã mãi mới:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }

  export const updatePromotionAPI = async(promotionId: string,promotion: Promotion) => {
    const token = await checkToken();
    try {
      const res = await axios.put(`/promotion/${promotionId}`, promotion, {
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
      });
  
      return res.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật khuyến mã mãi mới:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }


  export const ApplyProductForPromotionAPI = async(promotionProduct: PromotionProductRequest) => {
    const token = await checkToken();
    try {
      const res = await axios.post(`/promotion-pro`, promotionProduct, {
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
      });
  
      return res.data;
    } catch (error) {
      console.error("Lỗi khi thêm khuyến mã mãi mới:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }



