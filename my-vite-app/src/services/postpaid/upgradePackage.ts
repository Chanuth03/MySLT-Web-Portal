import axios from "axios";

const upgradePackage = async (
    subscriberID:string,
    type:string,
    username:string,
    contactMobile:string,
    email:string,
    existingPackage:string,
    newPackage:string,
    currentMonthlyValue:string,
    newMonthlyValue:string,
    nic?:string,
)=>{
    try{
        const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }
    const url = `https://omnitest.slt.com.lk/api/BBExternal/BBPackageChangeRequest?subscriberID=${subscriberID}&type=${type}&name=${username}&nic=${nic}&contactMobile=${contactMobile}&email=${email}&exsistingPackage=${existingPackage}&newPackage=${newPackage}&currentMonthlyValue=${currentMonthlyValue}&newMonthlyValue=${newMonthlyValue}&changeType=upgrade&commitUser=MySLTWeb&channel=WEB`;
    const response = await axios.post(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.isSuccess && response.data.dataBundle) {
        return response;
      } else {
        console.error("Failed add package");
        return null;
      }
}
    catch(error){
        console.error("An error occurred while upgrading the package:", error);
        return null;
    }
}

export default upgradePackage;