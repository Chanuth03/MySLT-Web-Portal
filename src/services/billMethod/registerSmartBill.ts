import axios from "axios";

const registerSmartBill = async (
  tpNo: string,
  accountNo: string,
  econtact: string,
  billCode: string
) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    console.log("Sending request with the following data:");
    console.log("tpNo:", tpNo);
    console.log("accountNo:", accountNo);
    console.log("econtact:", econtact);
    console.log("billCode:", billCode);

    const response = await axios.post(
      "https://omnitest.slt.com.lk/api/ebill/SmartBillRegistration",
      new URLSearchParams({
        tpNo,
        accountNo,
        econtact,
        billCode,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Response received from SmartBillRegistration API:", response);

    if (response.data) {
      console.log("Smart Bill Registration Response Data:", response.data);

      const { isSuccess, dataBundle, errorMessege } = response.data;
      if (isSuccess) {
     
        return response.data; // Return the response if needed
      } else {
        // Directly log the error message from the response
        console.error("Error:", dataBundle?.errorShow || errorMessege);
      }
    } else {
      console.error("No data received from the SmartBillRegistration API");
    }
  } catch (error) {
    console.error("Error registering smart bill:", error);
  }
};

export default registerSmartBill;
