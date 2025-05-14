import React, { useState, useRef } from "react";
import { Box, Typography, Container, alpha } from "@mui/material";
import { usePortfolio } from "../context/PortfolioContext";
import CategoryTabs from "./CategoryTabs";
import ProjectGrid from "./ProjectGrid";
import ProjectModal from "./ProjectModal";
import SeeMoreButton from "./SeeMoreButton";

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

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          showRipple={showRipple}
          ripplePosition={ripplePosition}
        />

        {/* Projects Grid */}
        <ProjectGrid
          projects={filteredProjects}
          category={selectedCategory}
          onProjectClick={handleProjectClick}
        />

        {/* See More Button */}
        <SeeMoreButton />

        {/* Project Detail Modal */}
        <ProjectModal
          open={isModalOpen}
          project={selectedProject}
          onClose={handleCloseModal}
        />
      </Container>
    </Box>
  );
};

export default ProjectsSection;
