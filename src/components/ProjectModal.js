import React from "react";
import {
  Box,
  Typography,
  CardMedia,
  Chip,
  Button,
  Modal,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProjectModalWrapper = styled(Modal)(({ theme }) => ({
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

const ProjectModal = ({ open, project, onClose }) => {
  if (!project) return null;

  return (
    <ProjectModalWrapper
      open={open}
      onClose={onClose}
      aria-labelledby="project-modal-title"
    >
      <ModalContent>
        <IconButton
          onClick={onClose}
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

        <Box sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            image={project.image}
            alt={project.title}
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
            {project.title}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <Chip
              icon={getCategoryIcon(project.category)}
              label={project.category}
              sx={{
                background:
                  "linear-gradient(90deg, #A239FF22 0%, #5BFFB322 100%)",
                color: "white",
                mr: 2,
              }}
            />
            <Typography variant="body2" color="textSecondary">
              {project.date}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {project.description ||
              "A sophisticated project showcasing technical excellence and innovative design solutions."}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Technologies
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {(
                project.technologies || ["React", "Material UI", "Node.js"]
              ).map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </Box>
          </Box>

          <Button
            variant="contained"
            component="a"
            href={project.link}
            target="_blank"
            sx={{
              background: "linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)",
              borderRadius: "50px",
              padding: "12px 24px",
            }}
          >
            Visit Project
          </Button>
        </Box>
      </ModalContent>
    </ProjectModalWrapper>
  );
};

export default ProjectModal;
