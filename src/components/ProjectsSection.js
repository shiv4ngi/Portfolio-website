import React, { useState, useCallback } from "react";
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

  // Simplified category change handler without ripple effect
  const handleCategoryChange = useCallback(
    (newCategory) => {
      if (selectedCategory !== newCategory) {
        setSelectedCategory(newCategory);
      }
    },
    [selectedCategory]
  );

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
        />

        {/* Projects Grid */}
        <ProjectGrid
          projects={filteredProjects}
          category={selectedCategory}
          onProjectClick={handleProjectClick}
        />

        {/* See More Button */}
        {/* <SeeMoreButton /> */}

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
