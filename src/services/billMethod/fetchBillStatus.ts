import axios from "axios";

const fetchBillStatus = async (accountNo: string, tpNo: string) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    const response = await axios.get(
      `https://omnitest.slt.com.lk/api/ebill/BillStatusRequest?accountNo=${accountNo}&tpNo=${tpNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      console.log("Bill Status Response:", response.data);

      const billCode = response.data.bill_code;
      console.log("Bill Code:", billCode); 
      return response.data; // Return the response if needed
    } else {
      console.error("No data received from the Bill Status API");
    }
  } catch (error) {
    console.error("Error fetching bill status:", error);
  }
};

export default fetchBillStatus;
