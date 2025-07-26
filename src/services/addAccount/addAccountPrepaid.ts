import axios from 'axios';

const addAccountPrepaid = async (telephoneNo: string, nic: string) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    const response = await axios.post(
      'https://omnitest.slt.com.lk/api/LTEPrepaid/AddAccountRequestLTE',
      null, // Empty body as we are using query parameters
      {
        params: {
          TelephoneNo: telephoneNo,
          nic: nic,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Add authorization header with the Bearer token
        },
      }
    );

    // Check if the response is successful and handle accordingly
    if (response.status === 200) {
      console.log("Account added successfully:", response.data);
      return response.data; // You can return or handle the data as needed
    } else {
      console.error("Failed to add account:", response);
    }
  } catch (error) {
    console.error("Error adding account:", error);
  }
};

export default addAccountPrepaid;
