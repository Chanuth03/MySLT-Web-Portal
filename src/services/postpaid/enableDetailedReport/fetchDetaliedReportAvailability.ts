import axios from 'axios';

const fetchDetaliedReportAvailability = async (subscriberID:string) => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("Error: Access token is missing.");
          return null;
        }
        const response = await axios.get(
          `https://omnitest.slt.com.lk/api/VAS/GetProfileRequest?subscriberID=${subscriberID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
            console.log(" availablity of detailed report : ",response);
            return {"availability":response.data.dataBundle.priviledges.protocol_report,"email":response.data.dataBundle.email}; ;
    
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        return null;
      }
}

export default fetchDetaliedReportAvailability