import axios from "axios";
import { DailyUsageDetails } from "../../types/types";

const fetchPreviousDailyUsageData = async (
  subscriberID: string,
  billDate: string = "01",
  monthIndex: number = 0
) => {
  try {
    console.log(
      `Fetching previous daily usage data for subscriberID: ${subscriberID}, billDate: ${billDate}, monthIndex: ${monthIndex}`
    );

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }

    const apiUrl = `https://omnitest.slt.com.lk/api/BBVAS/EnhancedPreviousDailyUsage?subscriberID=${subscriberID}&billDate=${billDate}&monthIndex=${monthIndex}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data);

    if (response.data.isSuccess && response.data.dataBundle) {
      const dailyList = response.data.dataBundle
        .dailylist as DailyUsageDetails[];

      return dailyList;
    } else {
      console.error("Failed to fetch previous daily usage data");
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching previous daily usage data for ${subscriberID}:`,
      error
    );
    return null; // Return null if an error occurs
  }
};

export default fetchPreviousDailyUsageData;
