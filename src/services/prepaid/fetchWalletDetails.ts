import axios from "axios";
import { BalanceDetail } from "../../types/types";

const fetchWalletDetail = async (serviceId: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(`https://omnitest.slt.com.lk/api/LTEPrepaid/GetWalletDetail?LTESLTNumber=${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.isSuccess && Array.isArray(response.data.dataBundle)) {
        const walletDetail: BalanceDetail = response.data.dataBundle[0]["balanceDetail"][0];
        //console.log(`Wallet Detail response for serviceId ${serviceId}:`, JSON.stringify(response.data, null, 2));
        return walletDetail;
      } else {
        console.error("Failed to fetch wallet details");
        return null;
      }
    } catch (error) {
      console.error(`Error fetching wallet detail for serviceId ${serviceId}:`, error);
      return null;
    }
  };

export default fetchWalletDetail;