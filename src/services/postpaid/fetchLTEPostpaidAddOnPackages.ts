import axios from "axios";
import { PostpaidAddOnPackage } from "../../types/types";

const fetchLTEPostpaidAddOnPackages = async (
  packageName: string|undefined,
  subscriberID: string|undefined
) => {
  const token = localStorage.getItem("accessToken");
    const url = `https://omnitest.slt.com.lk/api/BBVAS/GetVASDataBundlePackages?packageName=${packageName}&subscriberID=${subscriberID}`; 

    try {
    const response = await axios.get(
        url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.data.isSuccess) {
      console.log(response.data);
      return response.data.dataBundle.categories as PostpaidAddOnPackage[];
      
    } else {
      console.error("Failed to fetch Addon packages");
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching LTE Postpaid Add-On Packages for ${subscriberID}:`,
      error
    );
    return null;
  }
};

export default fetchLTEPostpaidAddOnPackages;
