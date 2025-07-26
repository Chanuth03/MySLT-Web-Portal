import axios from 'axios';

const updateContact = async (
  subscriberID: string, 
  email: string, 
  phone: string, 
  fullname: string
) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    const response = await axios.put(
      `https://omnitest.slt.com.lk/api/BBVAS/UpdateContact`,
      null, // Use null for an empty body if parameters are passed in the URL
      {
        params: {
          subscriberID: subscriberID,
          email: email,
          phone: phone,
          fullname: fullname,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Add authorization header with the Bearer token
        },
      }
    );

    // Check if the response is successful and handle accordingly
    if (response.status === 200) {
      console.log("Contact updated successfully:", response.data);
      return response.data; // Return or handle the data as needed
    } else {
      console.error("Failed to update contact:", response);
    }
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};

export default updateContact;
