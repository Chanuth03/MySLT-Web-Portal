import axios from "axios";
import { AccountDetails } from "../types/types";

const fetchAccountDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Access token not found");
      return;
    }

    //console.log("Access Token:", token); 

    try {
      const response = await axios.get(
        "https://omnitest.slt.com.lk/api/AccountOMNI/GetAccountDetailRequest",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //console.log("Full API Response:", response.data); 

     
      if (response.data && response.data.dataBundle) {
        const accountData: AccountDetails[] = response.data.dataBundle.map((item: AccountDetails) => {
          console.log("Account Item:", item); 
          return item;
        });
        return accountData;
      } else {
        console.error("No account data found in 'dataBundle'");
      }
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

export default fetchAccountDetails;