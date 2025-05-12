import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
  alpha,
  Chip,
  Tooltip,
  Modal,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import DevicesIcon from "@mui/icons-material/Devices";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AppleIcon from "@mui/icons-material/Apple";
import MuseumIcon from "@mui/icons-material/Museum";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { usePortfolio } from "../context/PortfolioContext";
import { motion, AnimatePresence } from "framer-motion";

// Custom styled Tabs component for horizontal scrolling tabs
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: "48px",
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-flexContainer": {
    gap: 0,
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
  "& .MuiTabs-scroller": {
    overflow: "auto !important",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
  },
}));

// Custom styled Tab component
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minHeight: "48px",
  fontSize: "14px",
  fontWeight: 500,
  color: "rgba(255, 255, 255, 0.7)",
  padding: "12px 24px",
  borderBottomWidth: "2px",
  borderBottomStyle: "solid",
  borderBottomColor: "transparent",
  transition: "all 0.3s ease",
  "&.Mui-selected": {
    color: "#ffffff",
    backgroundColor: "#8A2BE2",
  },
  "&:hover": {
    color: "#ffffff",
    opacity: 1,
  },
}));

// Modernized Project Card with glassmorphism
const ModernProjectCard = styled(Card)(({ theme }) => ({
  borderRadius: "22px",
  overflow: "hidden",
  background: "rgba(30, 15, 40, 0.55)",
  border: "1.5px solid rgba(162, 57, 255, 0.13)",
  boxShadow: "0 8px 32px 0 rgba(162,57,255,0.10)",
  backdropFilter: "blur(10px)",
  position: "relative",
  transition: "transform 0.32s cubic-bezier(.4,2,.6,1), box-shadow 0.32s",
  "&:hover": {
    transform: "scale(1.045)",
    boxShadow: "0 12px 48px 0 #A239FF33",
    borderColor: "rgba(162, 57, 255, 0.22)",
  },
  height: "100%",
  minHeight: 320,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  cursor: "pointer",
}));

const ModernProjectImage = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "65%",
  objectFit: "cover",
  borderTopLeftRadius: "22px",
  borderTopRightRadius: "22px",
  background: "linear-gradient(135deg, #A239FF22 0%, #5BFFB322 100%)",
}));

const ModernProjectOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(120deg, rgba(162,57,255,0.08) 0%, rgba(0,0,0,0.25) 100%)",
  opacity: 0.14,
  transition: "opacity 0.3s",
  zIndex: 1,
  pointerEvents: "none",
  borderRadius: "22px",
  "&:hover": {
    opacity: 0.25,
  },
}));

const ModernProjectContent = styled(CardContent)(({ theme }) => ({
  position: "relative",
  bottom: 0,
  left: 0,
  width: "100%",
  zIndex: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "28px",
  background:
    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.2) 100%)",
  borderBottomLeftRadius: "22px",
  borderBottomRightRadius: "22px",
}));

const ModernProjectTitle = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.5rem",
  letterSpacing: "0.04em",
  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
  mb: 1,
  fontFamily: "'Poppins', sans-serif",
}));

const ModernProjectDescription = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.9)",
  fontSize: "0.9rem",
  fontWeight: 400,
  lineHeight: 1.4,
  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  mb: 2,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const ModernProjectDate = styled(Typography)(({ theme }) => ({
  color: "#A239FF",
  fontSize: "0.95rem",
  fontWeight: 500,
  textShadow: "0 1px 6px #A239FF22",
  mb: 0.5,
}));

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

// Animated gradient underline for selected tab
const AnimatedTabIndicator = styled("span")(({ theme }) => ({
  display: "block",
  height: 4,
  width: "100%",
  borderRadius: 2,
  background: "linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)",
  boxShadow: "0 1px 8px #A239FF33",
  animation: "gradientMove 2.5s linear infinite",
  marginTop: 2,
}));

// New styled components for enhanced project cards
const ProjectDeviceFrame = styled(Box)(({ theme, deviceType }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2,
  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  transform: "translateY(-5%)",
  opacity: 0.85,
  pointerEvents: "none",
}));

const TechChip = styled(Chip)(({ theme }) => ({
  background: "rgba(162, 57, 255, 0.15)",
  color: "#5BFFB3",
  borderRadius: "14px",
  fontSize: "0.7rem",
  height: "24px",
  margin: "0 4px 4px 0",
  border: "1px solid rgba(91, 255, 179, 0.3)",
  boxShadow: "0 2px 8px rgba(162, 57, 255, 0.2)",
  "& .MuiChip-label": {
    padding: "0 10px",
  },
}));

const ProjectModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Box)(({ theme }) => ({
  background: "rgba(30, 15, 40, 0.95)",
  border: "1.5px solid rgba(162, 57, 255, 0.3)",
  borderRadius: "24px",
  padding: theme.spacing(4),
  maxWidth: "800px",
  width: "90%",
  maxHeight: "90vh",
  overflow: "auto",
  boxShadow: "0 10px 40px rgba(162, 57, 255, 0.3)",
  backdropFilter: "blur(20px)",
  position: "relative",
}));

const getCategoryIcon = (category) => {
  switch (category) {
    case "Website Development":
      return <DevicesIcon />;
    case "Android Development":
      return <PhoneAndroidIcon />;
    case "iOS Development":
      return <AppleIcon />;
    case "Museum Software":
      return <MuseumIcon />;
    case "Kiosk Applications":
      return <TouchAppIcon />;
    default:
      return <DevicesIcon />;
  }
};

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

// ExpandableTab styled component - replaces StyledTab and StyledTabs
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
  height: "80px",
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

// Animation variants for projects - optimized for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1 for faster loading
    },
  },
};

const projectVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween", // Changed from spring for more predictable timing
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

// Animation variants for category change
const tabContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: "easeIn",
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

// Add a ripple animation
const rippleAnimation = {
  "@keyframes selectRipple": {
    "0%": {
      opacity: 0.5,
      transform: "scale(0.5)",
    },
    "100%": {
      opacity: 0,
      transform: "scale(1.5)",
    },
  },
};

const SelectionRipple = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background:
    "radial-gradient(circle, rgba(162, 57, 255, 0.4) 0%, rgba(162, 57, 255, 0) 70%)",
  transform: "translate(-50%, -50%) scale(0.5)",
  pointerEvents: "none",
  zIndex: 0,
  animation: "selectRipple 0.8s ease-out forwards",
  ...rippleAnimation,
}));

const ProjectsSection = () => {
  const portfolioData = usePortfolio();
  const { title, categories, items, activeCategory } = portfolioData.projects;
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Enhanced category change handler with optimized animation logic
  const handleCategoryChange = (newCategory, e) => {
    if (selectedCategory !== newCategory && !isAnimating) {
      setIsAnimating(true);
      setSelectedCategory(newCategory);

      // Create ripple effect at click position
      if (e) {
        const tabElement = e.currentTarget;
        const rect = tabElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipplePosition({ x, y });
        setShowRipple(true);

        // Hide ripple after animation completes
        setTimeout(() => {
          setShowRipple(false);
        }, 800);
      }

      // Reset animation state after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Slightly longer than animation duration to ensure completion
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Filter projects based on selected category
  const filteredProjects = items.filter(
    (project) => project.category === selectedCategory
  );

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: alpha("#000", 0.3),
      }}
      ref={containerRef}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: { xs: 4, md: 6 },
            textAlign: "center",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            letterSpacing: "0.01em",
            textShadow: "0 2px 16px #A239FF22",
          }}
        >
          {title}
        </Typography>

        {/* Modern Expandable Category Tabs */}
        <ExpandableTabs>
          <AnimatePresence mode="wait">
            {categories.map((category) => (
              <CategoryTab
                key={category}
                isSelected={selectedCategory === category}
                onClick={(e) => handleCategoryChange(category, e)}
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
                {/* Add ripple effect when category is selected */}
                {showRipple && selectedCategory === category && (
                  <SelectionRipple
                    initial={{ opacity: 0.5, scale: 0.5 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      left: ripplePosition.x,
                      top: ripplePosition.y,
                      transformOrigin: `${ripplePosition.x}px ${ripplePosition.y}px`,
                    }}
                  />
                )}

                <motion.div
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
                </motion.div>
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

                {/* Active dot indicator */}
                <span className="active-dot" />

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

        {/* Projects Grid with Animation */}
        <AnimatePresence mode="wait">
          <Box
            key={selectedCategory}
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          >
            <Grid container spacing={4}>
              {filteredProjects.map((project, index) => {
                // Define grid size based on index or project property
                let gridSize;

                if (index === 0) {
                  // First item is large (Har Ghar Tiranga)
                  gridSize = { xs: 12, sm: 12, md: 8 };
                } else if (index === 1) {
                  // Second item is small (Digital Tribute)
                  gridSize = { xs: 12, sm: 6, md: 4 };
                } else if (index === 2) {
                  // Third item is small (Swachh Bharat)
                  gridSize = { xs: 12, sm: 6, md: 4 };
                } else if (index === 3) {
                  // Fourth item is medium (Raastragaan)
                  gridSize = { xs: 12, sm: 6, md: 8 };
                } else {
                  // Any additional items follow a pattern
                  gridSize =
                    index % 3 === 0
                      ? { xs: 12, sm: 6, md: 8 }
                      : { xs: 12, sm: 6, md: 4 };
                }

                // Get a random set of tech tags if not defined in the project
                const technologies =
                  project.technologies ||
                  ["React", "Redux", "Material UI"].slice(0, 2 + (index % 2));

                return (
                  <Grid
                    item
                    key={project.id}
                    {...gridSize}
                    component={motion.div}
                    variants={projectVariants}
                  >
                    <ModernProjectCard
                      onClick={() => handleProjectClick(project)}
                      sx={{
                        backgroundImage: `url(${project.image})`,
                      }}
                    >
                      {/* Dark gradient overlay for better text readability */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)",
                          zIndex: 1,
                        }}
                      />

                      <ModernProjectContent>
                        <ModernProjectTitle>{project.title}</ModernProjectTitle>

                        <ModernProjectDescription>
                          {project.description ||
                            "A sophisticated project showcasing technical excellence and innovative solutions."}
                        </ModernProjectDescription>

                        <Box display="flex" flexWrap="wrap" gap={0.8}>
                          {technologies.map((tech) => (
                            <TechChip
                              key={tech}
                              label={tech}
                              size="small"
                              sx={{
                                height: "22px",
                                backgroundColor: "rgba(91, 255, 179, 0.15)",
                                color: "#5BFFB3",
                                fontWeight: 500,
                                fontSize: "0.7rem",
                                border: "1px solid rgba(91, 255, 179, 0.3)",
                                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                              }}
                            />
                          ))}
                        </Box>
                      </ModernProjectContent>
                    </ModernProjectCard>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </AnimatePresence>

        {/* See More Button - Updated text to match image */}
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
            href="#all-projects"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See More
          </ModernSeeAllButton>
        </Box>

        {/* Project Detail Modal */}
        <ProjectModal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="project-modal-title"
        >
          <ModalContent>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "white",
                background: "rgba(162, 57, 255, 0.2)",
                "&:hover": {
                  background: "rgba(162, 57, 255, 0.4)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            {selectedProject && (
              <>
                <Box sx={{ mb: 3 }}>
                  <CardMedia
                    component="img"
                    image={selectedProject.image}
                    alt={selectedProject.title}
                    sx={{
                      height: 300,
                      borderRadius: "16px",
                      objectFit: "cover",
                      mb: 3,
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {selectedProject.title}
                  </Typography>
                  <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <Chip
                      icon={getCategoryIcon(selectedProject.category)}
                      label={selectedProject.category}
                      sx={{
                        background:
                          "linear-gradient(90deg, #A239FF22 0%, #5BFFB322 100%)",
                        color: "white",
                        mr: 2,
                      }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {selectedProject.date}
                    </Typography>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {selectedProject.description ||
                      "A sophisticated project showcasing technical excellence and innovative design solutions."}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 1 }}
                    >
                      Technologies
                    </Typography>
                    <Box display="flex" flexWrap="wrap">
                      {(
                        selectedProject.technologies || [
                          "React",
                          "Material UI",
                          "Node.js",
                        ]
                      ).map((tech) => (
                        <TechChip key={tech} label={tech} />
                      ))}
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    component="a"
                    href={selectedProject.link}
                    target="_blank"
                    sx={{
                      background:
                        "linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)",
                      borderRadius: "50px",
                      padding: "12px 24px",
                    }}
                  >
                    Visit Project
                  </Button>
                </Box>
              </>
            )}
          </ModalContent>
        </ProjectModal>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
