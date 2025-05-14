import React from "react";
import { Box, Button, styled } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

const ModernSeeAllButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)",
  color: "white",
  borderRadius: "50px",
  padding: "13px 30px",
  textTransform: "uppercase",
  fontWeight: 700,
  fontSize: "15px",
  letterSpacing: "1.5px",
  boxShadow: "0 6px 28px #A239FF33",
  transition: "background 0.28s, box-shadow 0.28s, transform 0.28s",
  "&:hover": {
    background: "linear-gradient(90deg, #5BFFB3 0%, #A239FF 100%)",
    boxShadow: "0 10px 36px #A239FF55",
    transform: "scale(1.045)",
  },
}));

const SeeMoreButton = ({ href = "#all-projects", text = "See More" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: { xs: 6, md: 8 },
      }}
    >
      <ModernSeeAllButton
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        href={href}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {text}
      </ModernSeeAllButton>
    </Box>
  );
};

export default SeeMoreButton;
