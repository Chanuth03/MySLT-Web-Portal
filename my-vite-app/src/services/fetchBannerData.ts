// src/services/fetchBannerData.ts
import axios from 'axios';
import { BannerData } from '../types/types';

const fetchBannerData = async (): Promise<BannerData[] | null> => {
  try {
    const response = await axios.post(
      'https://bannerportal.slt.lk/API/getBannerUrls', 
      new URLSearchParams({
        category_ids: "08,08,08,03,04,08", 
        aspect_ratio: "16:9", 
      }), 
      {
        headers: {
          'Cookie': 'ci_session=166mf9a0qqd87jek1um8md4qcgae9mg4', 
          'Content-Type': 'application/x-www-form-urlencoded', 
        }
      }
    );

   
    return response.data as BannerData[]; 
  } catch (error) {
  
    if (error instanceof Error) {
      console.error("Error fetching banner data:", error.message); 
    } else {
      console.error("An unknown error occurred", error); 
    }
    return null; 
  }
};

export default fetchBannerData;
