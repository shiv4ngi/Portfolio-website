import React from "react";
import { Grid, Box, styled } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

// Animation variants for projects container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const ProjectGrid = ({ projects, category, onProjectClick }) => {
  return (
    <AnimatePresence mode="wait">
      <Box
        key={category}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
      >
        <Grid container spacing={4}>
          {projects.map((project, index) => {
            // Define grid size based on index to create the mixed layout pattern
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

            return (
              <Grid item key={project.id} {...gridSize}>
                <ProjectCard project={project} onClick={onProjectClick} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </AnimatePresence>
  );
};

export default ProjectGrid;
