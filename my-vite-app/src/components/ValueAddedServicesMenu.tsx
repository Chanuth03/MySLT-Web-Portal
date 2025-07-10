import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import vas1 from "../assets/Group 39680.png";
import vas2 from "../assets/Group 39681.png";
import vas3 from "../assets/Group 39682.png";
import vas4 from "../assets/Group 39683.png";
import vas5 from "../assets/Group 39684.png";
import VasIcon from "./VasIcon";

const ValueAddedServicesMenu = () => {
const items = [
  {image:vas1, url:"https://duthaya.lk/"},
  {image:vas2, url:"https://kaspersky-dp.slt.lk/customerProductList"},
  {image:vas3, url:"https://www.slt.lk/en/peotv-go"},
  {image:vas4, url:"https://play.google.com/store/apps/details?id=com.arimac.slt&hl=en&gl=US"},
  {image:vas5, url:"https://storage.slt.lk/portal/new-registration/"},
];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingX: 2,
        paddingY: 0.1,
        width: "100%",
        height: "7vh",
        minHeight: "60px",
        border: "2px solid #FFFFFF",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF80",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 20,
          color: "#0056A2",
          fontWeight: "bold",
    //       textShadow: `
    // -1px -1px 0 #0056A291,
    //  1px -1px 0 #0056A291,
    // -1px  1px 0 #0056A291,
    //  1px  1px 0 #0056A291`,
        }}
      >
        {" "}
        Value Added Services
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexGrow: 1,
          gap:0.3,
        }}
      >
        {items.map((item, index) => {
            return (
                <VasIcon key={index} imagePath={item.image} url={item.url} />
            )
        })}
      </Box>
    </Box>
  );
};

export default ValueAddedServicesMenu;
