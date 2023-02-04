import React from "react";
import { Box, Avatar } from "@mui/material";
const options = [
    "Where is the nearest Starburger?",
    "What is the best Starburger?",
    "What is the worst topping?",
    "What is the best coupon from Starburger?",
    "What is the store hours Starburger?",
    "What is the refund policy?",
    "How do I get a job at Starburger?",
    "How do I sign up for the Starburger newsletter?",
    "How do I get a Starburger gift card?",
    "How do I leave a review for Starburger?"
  ];


  const DropdownMenu = ({onSubmit, setMessageInput}) => {

     const handleOptionsClick = (option, e) => {
        setMessageInput(option);
        setTimeout(() => {
            onSubmit(e, option);
            }, 500);
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