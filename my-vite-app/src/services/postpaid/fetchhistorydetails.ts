import axios from "axios";
import { DataBundle, ApiResponse } from "../../types/types";

const fetchPurchaseHistory = async (
  subscriberID: string,
  historyFrom: string,
  historyTo: string
): Promise<DataBundle[] | null> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const url = `https://omnitest.slt.com.lk/api/BBVAS/GetPurchaseHistory?historyFrom=${historyFrom}&historyTo=${historyTo}&subscriberID=${subscriberID}`;
    const response = await axios.get<ApiResponse>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data?.isSuccess && Array.isArray(response.data?.dataBundle)
      ? response.data.dataBundle
      : null;
  } catch {
    return null;
  }
};

export default fetchPurchaseHistory;
