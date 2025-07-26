import axios from "axios";

const addAccountRequest = async (accountNo: string, telephoneNo: string, nic: string) => {
  // Retrieve the access token from localStorage
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found");
    return;
  }

  console.log("Request Parameters:", {
    accountNo,
    telephoneNo,
    nic,
  });

  try {
    const response = await axios.post(
      `https://omnitest.slt.com.lk/api/AccountOMNI/AddAccountRequest`,
      null, // No body data, data will be passed via URL params
      {
        params: {
          accountNo,
          TelephoneNo: telephoneNo,
          nic,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Adding the Bearer token to the Authorization header
          "Content-Type": "application/x-www-form-urlencoded", // Specifying the content type
        },
      }
    );

    console.log("API Response:", response.data);

    // Return response data upon success
    return response.data;
  } catch (error) {
    console.error("Error adding account:", error);
    // Handle the error by rethrowing or showing an error message
    throw error;
  }
};

export default addAccountRequest;
