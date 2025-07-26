import axios from "axios";

const getEbillStatus = async (accountNo: string, tpNo: string) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("Access token not found");
    return null; // Return null if no token is found
  }

  try {
    console.log("Calling eBill Status API with parameters:", { accountNo, tpNo });

    const response = await axios.get(
      `https://omnitest.slt.com.lk/api/ebill/eBillStatusRequest?accountNo=${accountNo}&tpNo=${tpNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (response.data) {
      console.log("eBill Status Response:", response.data);
      return response.data;
    } else {
      console.error("No data received from the eBill Status API");
      return null; // Return null if no data is received
    }
  } catch (error: unknown) {
    console.error("Error getting eBill status:", error);

    // Type-checking to ensure the error has a 'response' property
    if (axios.isAxiosError(error)) {
      console.error('Response Data:', error.response?.data);
      console.error('Response Status:', error.response?.status);
    } else {
      console.error('An unknown error occurred:', error);
    }

    return null; // Return null if an error occurs
  }
};

export default getEbillStatus;
