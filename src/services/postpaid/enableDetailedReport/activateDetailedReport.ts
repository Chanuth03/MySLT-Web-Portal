import axios from "axios";

const activateDetailedReport = async (subscriberID:string,packageNumber:string)=>{
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error("Access token not found");
      return;
    }
    try{
        const response = await axios.post(
          `https://omnitest.slt.com.lk/api/BBVAS/PurchaseAdvancedReportsPostPaid?subscriberID=${subscriberID}&reporterPackage=${packageNumber}`,
          {},
          {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          return response.data;
    }catch(e){
        console.error(`Error activating detailed report:`, e);
        return null;
    }
}
export default activateDetailedReport;