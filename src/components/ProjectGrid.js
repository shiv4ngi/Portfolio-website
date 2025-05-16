import React, { memo } from "react";
import { Grid, Box } from "@mui/material";
import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects, category, onProjectClick }) => {
  return (
    <Box
      key={category}
      sx={{
        transition: "opacity 0.2s ease-out",
        willChange: "opacity",
      }}
    >
      <Grid container spacing={4}>
        {projects.map((project, index) => {
          // Define grid size based on index to create the mixed layout pattern
          let gridSize;

          if (index === 0) {
            // First item is large
            gridSize = { xs: 12, sm: 12, md: 8 };
          } else if (index === 1 || index === 2) {
            // Second and third items are small
            gridSize = { xs: 12, sm: 6, md: 4 };
          } else if (index === 3) {
            // Fourth item is medium
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
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(ProjectGrid);
