import axios from "axios";
import { ProtocolReportDetails } from "../../types/types";

const fetchProtocolReport = async (serviceId: string, date: string) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Access token is missing");
      return null;
    }

    const response = await axios.get(
      `https://omnitest.slt.com.lk/api/BBVAS/ProtocolReport`,
      {
        params: {
          subscriberID: serviceId,
          date: date,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.isSuccess && response.data.dataBundle) {
      return response.data.dataBundle as ProtocolReportDetails;
    }else{
        console.error("Error fetching protocol report:", response.data.errorShow);
        return null;
    }
  } catch (error) {
    console.error(`Error fetching protocol report for ${serviceId}:`, error);
    return null;
  }
};

export default fetchProtocolReport;
