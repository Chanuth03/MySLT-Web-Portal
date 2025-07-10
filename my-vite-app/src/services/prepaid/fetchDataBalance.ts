import axios from "axios";
import { DataBalance } from "../../types/types";

const fetchDataBalance = async (serviceId: string) => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    try {
      const response = await axios.get(`https://omnitest.slt.com.lk/api/LTEPrepaid/getLTEFreeunitDetail?LTESLTNumber=${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(`Data Detail`, JSON.stringify(response.data, null, 2));
      if (response.data.isSuccess) {
        const dataBalanceDetails: DataBalance[] = response.data.dataBundle["listofFreeUnit"];
        dataBalanceDetails.sort((a, b) => {
          return parseInt(b.effectiveTime) - parseInt(a.effectiveTime);
        });
        return dataBalanceDetails;
      } else {
        console.error("Failed to fetch data balance details");
        return null;
      }
    } catch (error) {
      console.error(`Error fetching data balance detail for serviceId ${serviceId}:`, error);
      return null;
    }
  };

export default fetchDataBalance;