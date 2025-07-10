import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Usage } from "../../types/types";

interface ProgressBarProps {
    usage: Usage;
  }
  
const ProgressBar = ({ usage }: ProgressBarProps) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="body2"
          sx={{ color: "#0056A2", fontSize: "16px", fontWeight: 600 }}
        >{`${usage.offer_name} - ${usage.volume}GB`}</Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            width: "100%",
            height: 12,
            borderRadius: "5px",
            backgroundColor: "#E5E5EF",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: `${usage.percentage}%`,
              height: "100%",
              borderRadius: "5px",
              backgroundColor:
                usage.sorter === 1
                  ? "#4FD745"
                  : usage.sorter === 2
                  ? "#F6E901"
                  : usage.sorter === 3
                  ? "#CF1C1F"
                  : "#00B4EB",
            }}
          ></Box>
        </Box>
      </Box>
    );
  };

export default ProgressBar;