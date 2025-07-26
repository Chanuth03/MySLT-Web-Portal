import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useStore from "../../services/useAppStore";
import fetchProtocolReport from "../../services/postpaid/fetchProtocolReport";
import { Button, CircularProgress, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import {
  MappedData,
  ProtocolData,
  ProtocolReportDetails,
} from "../../types/types";

const ProtocolReport = () => {
  const { usageDetails, serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Total");
  const [protocolReport, setProtocolReport] = useState<ProtocolReportDetails>();
  const tabs = ["Total", "Download", "Upload"];
  const colorArray = [
    "#3070F5",
    "#57BEB5",
    "#AE59DC",
    "#5B61D6",
    "#EA334B",
    "#F2A73B",
    "#F5C242",
    "#9F6EDD",
    "#F56991",
    "#67D968",
    "#B0B0B0",
  ];
  useEffect(() => {
    const getProtocolReport = async () => {
      setLoading(true);
      if (serviceID && usageDetails?.date) {
        const response = await fetchProtocolReport(serviceID, usageDetails?.date);
        if (response) {
          setProtocolReport(response);
          console.log("protocol report : ", response);
        }
      }
      setLoading(false);
    };
    getProtocolReport();
  }, [serviceID, usageDetails]);

  const mapObjectToDataFormat = (
    data: ProtocolData[] | undefined,
    colorArray: string[]
  ): MappedData[] => {
    return (data || []).map((item, index) => ({
      id: index,
      value: item.presentage,
      label: item.protocol,
      color: colorArray[index % colorArray.length],
    }));
  };

  const totalMappedData = protocolReport
    ? mapObjectToDataFormat(protocolReport.total, colorArray)
    : [];
  const downloadMappedData = protocolReport
    ? mapObjectToDataFormat(protocolReport.download, colorArray)
    : [];
  const uploadMappedData = protocolReport
    ? mapObjectToDataFormat(protocolReport.upload, colorArray)
    : [];

  const currentMappedData =
    selectedTab === "Total"
      ? totalMappedData
      : selectedTab === "Download"
      ? downloadMappedData
      : uploadMappedData;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#082444",
        padding: 2,
        borderRadius: "10px",
        height:"480px",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: 2,
              border: "0.5px solid #334B64",
              borderRadius: "15px",
            }}
          >
            <Box sx={{display:"flex",width:"100%",justifyContent:"center",backgroundColor:"#1a3564",borderRadius: "10px",marginBottom: 2,height: 38,}}>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop:"5px",
                  color: "#FFFFFF",
                  fontFamily: "Poppins, sans-serif",
                   textTransform: "uppercase",
                }}
              >
                {selectedTab} 
              </Typography>
            </Box>
            {currentMappedData.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginBottom: 1.5,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                  }}
                ></Box>
                <Typography variant="body2" sx={{color:"#FFFFFF", fontWeight: 500,fontFamily: "Poppins, sans-serif" }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ color: "#FFFFFF",fontFamily: "Poppins, sans-serif" }}>
                  ({item.value.toFixed(2)}%)
                </Typography>
                
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              minHeight: "450px",
              border: "0.5px solid #334B64",
              borderRadius: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: "40px",
                gap: 2,
                mt: 2,
                mx: 3,
                mb: 1,
                width: "80%",
                border: "0.5px solid #FFFFFF",
                borderRadius: "8px",
                px: 1,
              }}
            >
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  sx={{
                    flex: 1,
                    flexGrow: 1,
                    height: "80%",
                    backgroundColor:
                      selectedTab === tab ? "#0056A2" : "#FFFFFF",
                    color: selectedTab === tab ? "#FFFFFF" : "#0056A2",
                    fontWeight: selectedTab === tab ? 700 : 500,
                    borderRadius: "6px",
                    boxShadow:
                      selectedTab === tab
                        ? "0px 4px 6px rgba(0, 86, 162, 0.3)"
                        : "none",
                    "&:hover": {
                      backgroundColor: "#0056A2",
                      color: "#FFFFFF",
                    },
                    textTransform: "none",
                  }}
                >
                  <Typography variant="body2">{tab}</Typography>
                </Button>
              ))}
            </Box>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value.toFixed(2)}%`,
                  arcLabelMinAngle: 20,
                  arcLabelRadius: "105%",
                  data: currentMappedData,
                  innerRadius: 100,
                  outerRadius: 150,
                  paddingAngle: 0.5,
                  cornerRadius: 0,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 200,
                  cy: 100,
                },
              ]}
              sx={{
                mt:2,
                "& .MuiPieArc-root": {
                  border: "2px solid ",
                  color: "#0056A2",
                },
                [`& .${pieArcLabelClasses.root}`]: {
                  fontWeight: "bold",
                  fill: "#ffffff",
                  fontSize: 12,
                  fontFamily: "Poppins, sans-serif",
                },
              }}
              width={400}
              height={250}
              slotProps={{
                legend: { hidden: true },
              }}
            />
            <Typography sx ={{position:"relative",bottom:"20px", color: "#FFFFFF",fontFamily: "Poppins, sans-serif",}}>
            Data Usage for Date : {usageDetails?.displaydate}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProtocolReport;
