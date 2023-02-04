import React from "react";
import { Box, Avatar } from "@mui/material";
const options = [
    "Prompt1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10"
  ];


  const DropdownMenu = ({onSubmit, setAnimalInput}) => {

     const handleOptionsClick = (option, e) => {
        setAnimalInput(option);
    };
    return (
      <Box style={{ display: "flex", flexDirection: "row", width: "100%", height: "200px", overflowY: "scroll" }}>
  {Array.from({ length: 10 }, (_, i) => (
    <Avatar onClick={(e) => handleOptionsClick(options[i], e)}
     key={i} alt="Prompt1" src="/p1.png" sx={{ width: "200px", height: "200px" }} />
  ))}
      </Box>
    );
  };


  export default DropdownMenu;