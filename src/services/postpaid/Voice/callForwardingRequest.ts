import axios from "axios";

const callForwardingRequest = async (
  telephoneNo: string,
  mobileNo: string,
  requestType: string
) => {
  try {
    console.log(
      `Initiating call forwarding request for telephoneNo: ${telephoneNo}, mobileNo: ${mobileNo}, requestType: ${requestType}`
    );

  
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }

   
    const url = `https://omnitest.slt.com.lk/api/Voice/CallForwardingRequest?telephoneNo=${telephoneNo}&mobileNo=${mobileNo}&requestType=${requestType}`;
    console.log("API URL:", url);

    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data);

    
    if (response.data.isSuccess) {
      return response.data.dataBundle; 
    } else {
      console.error("Call Forwarding Request failed:", response.data.errorMessage);
      return null;
    }
  } catch (error) {
    console.error("Error during Call Forwarding Request:", error);
    return null;
  }
};

export default callForwardingRequest;
