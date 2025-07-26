import axios from "axios";

const resendBill = async (eContact: string, accountNo: string, ebillMonth: string, tpNo: string) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("Access token not found");
    return;
  }

  // URL-encode the ebillMonth parameter to ensure it's in the desired format
  const encodedEbillMonth = encodeURIComponent(ebillMonth); // This will encode the `/` as `%2F`

  try {
    console.log("Calling Resend Bill API with parameters:", { eContact, accountNo, encodedEbillMonth, tpNo });

    const response = await axios.post(
      `https://omnitest.slt.com.lk/api/ebill/eBillResendRequest?eContact=${eContact}&accountNo=${accountNo}&ebillMonth=${encodedEbillMonth}&tpNo=${tpNo}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (response.data) {
      console.log("Resend Bill Response:", response.data);
      return response.data;
    } else {
      console.error("No data received from the Resend Bill API");
    }
  } catch (error: unknown) {
    console.error("Error resending bill:", error);

    // Type-checking to ensure the error has a 'response' property
    if (axios.isAxiosError(error)) {
      console.error('Response Data:', error.response?.data);
      console.error('Response Status:', error.response?.status);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
};

export default resendBill;
