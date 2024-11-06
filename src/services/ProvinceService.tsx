import axios from "./CustomizeAxios";

export const fetchAllProvince = async () => {
  try {
    const res = await axios.get("/api/province/getprovince");
    return res.data;
  } catch (error) {
    throw new Error("Unable to fetch provinces. Please try again later.");
  }
};


export const fetchDistrictsByProvinceId = async (provinceId: string) => {
  try {
    const res = await axios.get("/api/province/getdistricts", {
        params: {
            provinceId: provinceId
        }
    });
    return res.data;
  } catch (error) {
    throw new Error("Unable to fetch destrict. Please try again later.");
  }
};


export const fetchWardByDestrictId = async (destrictId: string) => {
    try {
      const res = await axios.get("/api/province/getward", {
          params: {
            destrictId: destrictId
          }
      });
      return res.data;
    } catch (error) {
      throw new Error("Unable to fetch Ward. Please try again later.");
    }
  };

