import axios from "axios";
import { CurrentPackageDetails} from "../../types/types";

const fetchCurrentPackage = async (type: string, packageName: string) => {
  try {

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }
    const url = `https://omnitest.slt.com.lk/api/BBExternal/GetCurrentBBPackageV2?type=${type}&package=${packageName}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data);

    // Check if the response contains the expected data
    if (response.data.isSuccess && response.data.dataBundle) {
      return response.data.dataBundle as CurrentPackageDetails;
    } else {
      console.error("Failed to current package data");
      return null;
    }
  } catch (error) {
    console.error(
      `Failed to current package data`,
      error
    );
    return null;
  }
};

export default fetchCurrentPackage;
