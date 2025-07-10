import IconButton from "@mui/material/IconButton";

interface VasIconProps {
  imagePath: string;
  url: string;
}
const handleButtonClick = (url?: string) => {
  if (url) {
    window.open(url, "_blank");
  }
};
const VasIcon = ({ imagePath, url }: VasIconProps) => {
  return (
    <IconButton
      onClick={() => handleButtonClick(url)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          scale: 1.05,
          backgroundColor: "Transparent",
          transition: "scale 0.3s ease",
        },
      }}
    >
      <img src={imagePath} style={{ height: "auto", minHeight: "30px" }} />
    </IconButton>
  );
};

export default VasIcon;
