import React, { memo } from "react";
import { Card, Box, Typography, Chip, styled } from "@mui/material";

// Modernized Project Card with optimized performance
const ModernProjectCard = styled(Card)(({ theme }) => ({
  borderRadius: "22px",
  overflow: "hidden",
  background: "rgba(30, 15, 40, 0.55)",
  // border: "1.5px solid rgba(162, 57, 255, 0.13)",
  boxShadow: "0 8px 32px 0 rgba(162,57,255,0.10)",
  position: "relative",
  transform: "translateZ(0)", // Force GPU acceleration
  willChange: "transform, box-shadow", // Hint to browser about properties that will change
  transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
  "&:hover": {
    transform: "translateZ(0) scale(1.03)",
    boxShadow: "0 12px 48px 0 rgba(162,57,255,0.2)",
    borderColor: "rgba(162, 57, 255, 0.22)",
  },
  height: "100%",
  minHeight: 320,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  cursor: "pointer",
}));

const ModernProjectContent = styled(Box)(({ theme }) => ({
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

const TechChip = styled(Chip)(({ theme }) => ({
  height: "22px",
  backgroundColor: "rgba(91, 255, 179, 0.15)",
  color: "#5BFFB3",
  fontWeight: 500,
  fontSize: "0.7rem",
  border: "1px solid rgba(91, 255, 179, 0.3)",
  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
  margin: "0 4px 4px 0",
}));

// Preload image to avoid layout shifts
const preloadImage = (src) => {
  if (!src) return;
  const img = new Image();
  img.src = src;
};

const ProjectCard = ({ project, onClick }) => {
  // Preload image when component mounts
  React.useEffect(() => {
    if (project.image) {
      preloadImage(project.image);
    }
  }, [project.image]);

  return (
    <ModernProjectCard
      onClick={() => onClick(project)}
      sx={{
        backgroundImage: `url(${project.image})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
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

        <Box display="flex" flexWrap="wrap" gap={0.8} pt={1}>
          {(project.technologies || ["React", "Redux", "Material UI"]).map(
            (tech) => (
              <TechChip key={tech} label={tech} size="small" />
            )
          )}
        </Box>
      </ModernProjectContent>
    </ModernProjectCard>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(ProjectCard);
