import axios from "axios";
import { DailyUsageDetails } from "../../types/types";

const fetchDailyUsageData = async (subscriberID: string, billDate: string) => {
  try {
    console.log(
      `Fetching daily usage data for subscriberID: ${subscriberID} and billDate: ${billDate}`
    );

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }
    const url = `https://omnitest.slt.com.lk/api/BBVAS/EnhancedCurrentDailyUsage?subscriberID=${subscriberID}&billDate=${billDate}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data);

    // Check if the response contains the expected data
    if (response.data.isSuccess && response.data.dataBundle) {
      const dailyList = response.data.dataBundle
        .dailylist as DailyUsageDetails[];

      return dailyList;
    } else {
      console.error("Failed to fetch daily usage data");
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching daily usage data for ${subscriberID}:`,
      error
    );
    return null;
  }
};

export default fetchDailyUsageData;
