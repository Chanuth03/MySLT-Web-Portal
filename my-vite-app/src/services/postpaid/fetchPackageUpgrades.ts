import axios from "axios";
import { Upgrades } from "../../types/types";

const fetchPackageUpgrades = async (type: string, packageName: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Access token is missing");
      return null;
    }
    const response = await axios.get(
      `https://omnitest.slt.com.lk/api/BBExternal/GetBBPackagesV2?type=${type}&package=${packageName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response:", response.data.dataBundle.Upgrades);
    if (response.data.isSuccess && response.data.dataBundle.Upgrades) {
      return response.data.dataBundle.Upgrades as Upgrades;
    } else {
      console.error("Failed to fetch package upgrades");
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch package upgrades: ${error}`);
  }
};

export default fetchPackageUpgrades;
