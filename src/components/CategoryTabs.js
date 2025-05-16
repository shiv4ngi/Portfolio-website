import React from "react";
import { Box, styled } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Add keyframes for gradient animation
const gradientAnimation = {
  "@keyframes gradientShift": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
};

// Add a background animation for the header
const headerAnimation = {
  "@keyframes headerGlow": {
    "0%": { boxShadow: "0 8px 30px rgba(162, 57, 255, 0.15)" },
    "50%": { boxShadow: "0 8px 30px rgba(162, 57, 255, 0.3)" },
    "100%": { boxShadow: "0 8px 30px rgba(162, 57, 255, 0.15)" },
  },
};

// ExpandableTab styled component
const ExpandableTabs = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "stretch",
  justifyContent: "stretch",
  borderRadius: "20px",
  background: "rgba(20, 10, 30, 0.7)",
  border: "1.5px solid rgba(162, 57, 255, 0.4)",
  boxShadow:
    "0 10px 30px rgba(162, 57, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.07)",
  overflow: "hidden",
  height: "60px",
  margin: theme.spacing(0, "auto", 6),
  position: "relative",
  backdropFilter: "blur(8px)",
  animation: "headerGlow 5s infinite",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to right, rgba(162, 57, 255, 0.05), rgba(91, 255, 179, 0.05))",
    opacity: 0.5,
    zIndex: 0,
  },
  // Add a subtle top highlight
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "5%",
    right: "5%",
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
    zIndex: 1,
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "auto",
    minHeight: "180px",
  },
  ...headerAnimation,
}));

const CategoryTab = styled(motion.div)(({ theme, isSelected }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  height: "100%",
  boxSizing: "border-box",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  zIndex: 1,
  willChange: "flex, background, opacity, transform", // Add will-change for hardware acceleration
  backgroundColor: isSelected ? "transparent" : "transparent",
  background: isSelected
    ? "linear-gradient(135deg, rgba(138, 43, 226, 0.9) 0%, rgba(153, 50, 204, 0.9) 50%, rgba(138, 43, 226, 0.9) 100%)"
    : "transparent",
  backgroundSize: isSelected ? "200% 200%" : "100% 100%",
  animation: isSelected ? "gradientShift 3s ease infinite" : "none",
  color: isSelected ? "#fff" : "rgba(255, 255, 255, 0.7)",
  fontWeight: isSelected ? 600 : 500,
  transition: "color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease", // Optimize transitions
  borderRight: "1px solid rgba(255, 255, 255, 0.08)",
  "&:last-child": {
    borderRight: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "10%",
    width: "80%",
    height: "2px",
    background: isSelected
      ? "linear-gradient(90deg, #A239FF, #5BFFB3)"
      : "transparent",
    opacity: isSelected ? 1 : 0,
    transition: "opacity 0.3s ease",
  },
  // Add subtle inner shadow for depth on active tab
  boxShadow: isSelected ? "inset 0 0 30px rgba(138, 43, 226, 0.3)" : "none",
  // Add a subtle top lighting effect
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: isSelected ? "rgba(255, 255, 255, 0.15)" : "transparent",
    opacity: isSelected ? 1 : 0,
  },
  // Add small dot indicator for active tab
  "& .active-dot": {
    position: "absolute",
    top: "15px",
    right: "15px",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #A239FF, #5BFFB3)",
    opacity: isSelected ? 1 : 0,
    transition: "opacity 0.3s ease",
    boxShadow: "0 0 5px rgba(162, 57, 255, 0.7)",
  },
  "&:hover": {
    backgroundColor: isSelected ? "transparent" : "rgba(50, 25, 70, 0.3)",
    color: "#fff",
  },
  "&:active": {
    transform: "scale(0.98)",
    transition: "transform 0.1s ease",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: isSelected ? "60px" : "40px",
    justifyContent: "flex-start",
    padding: theme.spacing(2, 3),
    borderRight: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    "&:last-child": {
      borderBottom: "none",
    },
  },
  ...(isSelected && gradientAnimation),
}));

const CategoryIcon = styled(Box)(({ theme, isSelected }) => ({
  marginRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: isSelected ? "1.7rem" : "1.5rem",
  transition: "transform 0.2s ease, filter 0.2s ease", // Optimize transitions
  transform: isSelected ? "scale(1.1)" : "scale(1)",
  filter: isSelected ? "drop-shadow(0 0 8px rgba(162, 57, 255, 0.7))" : "none",
  color: isSelected ? "#fff" : "rgba(255, 255, 255, 0.8)",
  willChange: "transform, filter",
}));

// Animation variants for the category icon
const iconVariants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  selected: {
    scale: 1.1,
    rotate: 0,
    filter: "drop-shadow(0 0 10px rgba(162, 57, 255, 0.7))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
  unselected: {
    scale: 1,
    rotate: 0,
    filter: "none",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: (isSelected) => ({
    scale: isSelected ? 1.15 : 1.05,
    filter: isSelected
      ? "drop-shadow(0 0 12px rgba(162, 57, 255, 0.8))"
      : "drop-shadow(0 0 8px rgba(162, 57, 255, 0.5))",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  }),
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Typography animation for category tabs
const AnimatedText = styled(motion.p)(({ theme, isSelected }) => ({
  fontWeight: isSelected ? 600 : 500,
  fontSize: isSelected ? "1.05rem" : "0.9rem",
  whiteSpace: { xs: "normal", sm: "nowrap" },
  opacity: isSelected ? 1 : 0.85,
  textShadow: isSelected ? "0 0 10px rgba(162, 57, 255, 0.5)" : "none",
  letterSpacing: isSelected ? "0.03em" : "normal",
  position: "relative",
  zIndex: 1,
  transformOrigin: "left center",
  display: "inline-block",
  transition: "all 0.2s ease-out",
  willChange: "transform, opacity",
}));

// Animation variants for text in tabs
const textVariants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: (isSelected) => ({
    scale: isSelected ? 1.05 : 1.03,
    y: -1,
    textShadow: isSelected
      ? "0 0 15px rgba(162, 57, 255, 0.7)"
      : "0 0 10px rgba(162, 57, 255, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  }),
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
  selected: {
    scale: 1.05,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  unselected: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

// Animation variants for header tabs - optimized for performance
const headerTabVariants = {
  initial: {
    opacity: 0.8,
  },
  animate: (isSelected) => ({
    opacity: 1,
    flex: isSelected ? 2.5 : 1,
    transition: {
      flex: {
        type: "tween",
        duration: 0.25,
        ease: "easeOut",
      },
      opacity: {
        duration: 0.2,
      },
    },
  }),
  hover: (isSelected) => ({
    backgroundColor: isSelected ? undefined : "rgba(50, 25, 70, 0.3)",
    boxShadow: isSelected
      ? undefined
      : "0 0 15px rgba(162, 57, 255, 0.15) inset",
    transition: {
      duration: 0.2,
    },
  }),
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Function to get the appropriate icon based on category
const getCategoryIcon = (category) => {
  const DevicesIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
    >
      <path d="M440-120v-80h80v80h-80Zm-280 0q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-120h640v-440H160v440Zm0 0v-440 440Z" />
    </svg>
  );

  const PhoneAndroidIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
    >
      <path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-240h400v-400H280v400Z" />
    </svg>
  );

  const TouchAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
    >
      <path d="M560-40q-29 0-51-13t-33-37l-120-240q-11-23-8.5-47t21.5-41q15-14 35-18.5t39 .5q16 5 28.5 16t19.5 27l9 22v-329q0-26 17-43t43-17q26 0 43 17t17 43v240h40q56 0 93 37.5t37 92.5v80q0 67-41 122t-108 78l-54 20q-12 4-19 5.5t-9 1.5ZM280-600q-26 0-43-17t-17-43v-80q0-26 17-43t43-17q26 0 43 17t17 43v80q0 26-17 43t-43 17Z" />
    </svg>
  );

  switch (category) {
    case "Website Development":
      return <DevicesIcon />;
    case "Mobile Apps":
      return <PhoneAndroidIcon />;
    case "Kiosk Apps":
      return <TouchAppIcon />;
    default:
      return <DevicesIcon />;
  }
};

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <ExpandableTabs>
      <AnimatePresence mode="wait">
        {categories.map((category) => (
          <CategoryTab
            key={category}
            isSelected={selectedCategory === category}
            onClick={(e) => onCategoryChange(category, e)}
            custom={selectedCategory === category}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={headerTabVariants}
            layoutId={`category-${category}`}
            layout="position"
            layoutDependency={selectedCategory}
          >
            {/* <motion.div
              initial="initial"
              animate={
                selectedCategory === category ? "selected" : "unselected"
              }
              whileHover="hover"
              whileTap="tap"
              custom={selectedCategory === category}
              variants={iconVariants}
            >
              <CategoryIcon isSelected={selectedCategory === category}>
                {getCategoryIcon(category)}
              </CategoryIcon>
            </motion.div> */}
            <AnimatedText
              initial="initial"
              animate={
                selectedCategory === category ? "selected" : "unselected"
              }
              whileHover="hover"
              whileTap="tap"
              custom={selectedCategory === category}
              variants={textVariants}
              isSelected={selectedCategory === category}
            >
              {category}
            </AnimatedText>

            {/* Tab indicator line */}
            {selectedCategory === category && (
              <motion.div
                layoutId="activeTabIndicator"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "10%",
                  right: "10%",
                  height: 3,
                  borderRadius: 1.5,
                  background: "linear-gradient(90deg, #A239FF, #5BFFB3)",
                  boxShadow: "0 0 8px rgba(162, 57, 255, 0.5)",
                }}
              />
            )}
          </CategoryTab>
        ))}
      </AnimatePresence>
    </ExpandableTabs>
  );
};

export default CategoryTabs;
