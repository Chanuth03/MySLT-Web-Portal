export const textFieldStyle = (height?:number,width?:number) => {
    return {
        "& .MuiInputBase-root": {
            height: height? `${height}px` : "auto",
            backgroundColor: "#093050",
            borderRadius: "10px",
            width: width? `${width}px` : "auto",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              borderColor: "#0056A2",
            },
            transition: "border 0.3s ease",
          },
          "& input": {
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            color: "#fff",
            fontWeight: "medium",
          },
    }
}