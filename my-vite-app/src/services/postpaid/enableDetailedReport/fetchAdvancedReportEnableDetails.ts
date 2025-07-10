import axios from "axios";
import { EnableAdvancedReportDetails } from "../../../types/types";

const fetchAdvancedReportEnableDetails = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Error: Access token is missing.");
      return null;
    }
    const response = await axios.get(
      `https://omnitest.slt.com.lk/api/BBVAS/GetAdvancedReportingPackage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
        return response.data.dataBundle.packages as EnableAdvancedReportDetails[];

    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export default fetchAdvancedReportEnableDetails;
