import React, { useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { usePortfolio } from "../context/PortfolioContext";

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

// Custom styled project card
const ProjectCard = styled(Card)(({ theme }) => ({
  borderRadius: "50%",
  overflow: "hidden",
  aspectRatio: "1/1",
  backgroundColor: "transparent",
  boxShadow: "none",
  position: "relative",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    "& .MuiCardContent-root": {
      opacity: 1,
    },
    "& .overlay": {
      opacity: 0.5,
    },
  },
}));

const CircularImage = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
}));

const ProjectDateTypography = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "10%",
  left: "10%",
  color: "white",
  fontSize: "14px",
  fontWeight: 500,
  zIndex: 10,
}));

const ProjectOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "black",
  opacity: 0.2,
  transition: "opacity 0.3s ease",
  zIndex: 1,
  borderRadius: "50%",
}));

const ProjectContent = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  bottom: "20%",
  right: "10%",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "transparent",
  padding: 0,
  zIndex: 2,
  transition: "all 0.3s ease",
}));

const SeeAllButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8A2BE2",
  color: "white",
  borderRadius: "50px",
  padding: "12px 24px",
  textTransform: "uppercase",
  fontWeight: 600,
  fontSize: "14px",
  letterSpacing: "1px",
  boxShadow: "0 4px 20px rgba(138, 43, 226, 0.4)",
  "&:hover": {
    backgroundColor: "#9B30FF",
    boxShadow: "0 6px 25px rgba(138, 43, 226, 0.6)",
  },
}));

const ProjectsSection = () => {
  const portfolioData = usePortfolio();
  const { title, categories, items, activeCategory } = portfolioData.projects;

  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
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
          }}
        >
          {title}
        </Typography>

        {/* Category Tabs */}
        <Box
          sx={{
            mb: { xs: 4, md: 6 },
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <StyledTabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="project categories"
          >
            {categories.map((category) => (
              <StyledTab key={category} label={category} value={category} />
            ))}
          </StyledTabs>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <ProjectCard>
                <ProjectDateTypography variant="body2">
                  {project.date}
                </ProjectDateTypography>
                <CircularImage
                  component="img"
                  image={project.image}
                  alt={project.title}
                />
                <ProjectOverlay className="overlay" />
                <CardActionArea
                  href={project.link}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 3,
                  }}
                >
                  <ProjectContent>
                    <Typography
                      variant="h6"
                      component="div"
                      color="white"
                      sx={{
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {project.title} <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </Typography>
                  </ProjectContent>
                </CardActionArea>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>

        {/* See All Projects Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: 6, md: 8 },
          }}
        >
          <SeeAllButton
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            href="#all-projects"
          >
            SEE ALL PROJECTS
          </SeeAllButton>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
