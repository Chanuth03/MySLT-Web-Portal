import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CircularProgressBarProps {
  percentage: number;
  totalData: number; // Total data in GB
  unit?: string;
}

const CircularProgressBar = ({ percentage, totalData, unit = "GB"  }: CircularProgressBarProps) => {
  const { t } = useTranslation();
  // State to toggle between percentage and actual data display
  const [showDataAmount, setShowDataAmount] = useState(false);

  // Validate and clamp the percentage value to be between 0 and 100
  const value = Math.max(0, Math.min(100, percentage));

  // Calculate the remaining value for the pie chart
  const remainingValue = 100 - value;

  // Calculate the actual remaining data
  const remainingData = (value / 100) * totalData;
  
  // Toggle display between percentage and data amount
  const handleClick = () => {
    setShowDataAmount(!showDataAmount);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value, label: t("circularProgress.used"), color: "#40E734" }, // Used color for the filled portion
              {
                id: 1,
                value: remainingValue,
                label: t("circularProgress.remaining"),
                color: "#EAEAEA",
              }, // Remaining portion color
            ],
            innerRadius: 95, // Inner radius for the donut chart effect
            outerRadius: 115, // Outer radius of the pie chart
            paddingAngle: 0, // Angle between slices
            cornerRadius: 0, // Corner radius for slices
            startAngle: -0.5, // Start angle for the chart
            endAngle: 360, // End angle for the chart
            cx: 150, // Center X position
            cy: 120, // Center Y position
          },
        ]}
        width={300} // Set the desired width
        height={250} // Set the desired height
        tooltip={{ trigger: 'none' }} // Disable hover tooltip
        slotProps={{
          legend: { hidden: true },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-45%, -50%)",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {/* <Typography sx={{fontSize:40,fontWeight:900}} variant="body2">{`${value}%`}</Typography>
        <Typography sx={{fontSize:16,fontWeight:900}} variant="body2">REMAINING</Typography> */}
        {showDataAmount ? (
          // Show remaining data in GB when clicked
          <Typography sx={{ fontSize: 34, fontWeight: 900 }} variant="body2">
            {remainingData.toFixed(1)}{unit}
          </Typography>
        ) : (
          // Show percentage by default
          <Typography sx={{ fontSize: 34, fontWeight: 900 }} variant="body2">
            {`${value}%`}
          </Typography>
        )}
        <Typography sx={{ fontSize: 14, fontWeight: 900 }} variant="body2">
          {t("circularProgress.remaining")}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressBar;
