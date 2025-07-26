import axios from 'axios';

const removeAccount = async (accountNo: string, telephoneNo: string) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    const response = await axios.get(
      `https://omnitest.slt.com.lk/api/AccountOMNI/RemoveAccountRequest`,
      {
        params: {
          accountNo: accountNo,
          TelephoneNo: telephoneNo,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Add authorization header with the Bearer token
        },
      }
    );

    // Check if the response is successful and handle accordingly
    if (response.status === 200) {
      console.log("Account removed successfully:", response.data);
      return response.data; // You can return or handle the data as needed
    } else {
      console.error("Failed to remove account:", response);
    }
  } catch (error) {
    console.error("Error removing account:", error);
  }
};

export default removeAccount;
