import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { usePortfolio } from "../context/PortfolioContext";

// Styled components
const ModernOptionButton = styled(Button)(({ theme, active }) => ({
  background: active
    ? "linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)"
    : "rgba(255,255,255,0.07)",
  color: active ? "white" : "rgba(255,255,255,0.85)",
  borderRadius: "16px",
  boxShadow: active ? "0 4px 18px #A239FF33" : "none",
  padding: "15px 22px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "16px",
  letterSpacing: "0.01em",
  transition: "all 0.28s cubic-bezier(.4,2,.6,1)",
  "&:hover": {
    background: "linear-gradient(90deg, #5BFFB3 0%, #A239FF 100%)",
    color: "white",
    boxShadow: "0 8px 32px #A239FF33",
    transform: "scale(1.035)",
  },
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "relative",
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "white",
    background: "rgba(30,15,40,0.55)",
    borderRadius: "14px",
    boxShadow: "0 2px 12px #A239FF11",
    "& fieldset": {
      border: "1.5px solid rgba(162, 57, 255, 0.13)",
    },
    "&:hover fieldset": {
      border: "1.5px solid #A239FF99",
    },
    "&.Mui-focused fieldset": {
      border: "1.5px solid #A239FF",
      boxShadow: "0 0 0 2px #A239FF33",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px 20px",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.5)",
  },
}));

const ModernHireMeButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #A239FF 0%, #5BFFB3 100%)",
  color: "white",
  borderRadius: "50px",
  padding: "15px 36px",
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

const FadeInForm = styled(Box)(({ theme }) => ({
  opacity: 0,
  animation: "fadeInHireMe 1.2s cubic-bezier(.4,2,.6,1) 0.2s forwards",
}));

const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
@keyframes fadeInHireMe {
  0% { opacity: 0; transform: translateY(36px); }
  100% { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);

const HireMeSection = () => {
  const portfolioData = usePortfolio();
  const { title, services, budgets, activeService, activeBudget, termsText } =
    portfolioData.hire;

  const [selectedService, setSelectedService] = useState(activeService);
  const [selectedBudget, setSelectedBudget] = useState(activeBudget);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  const handleBudgetChange = (budget) => {
    setSelectedBudget(budget);
  };

  const handleTermsChange = (event) => {
    setAgreedToTerms(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", {
      service: selectedService,
      budget: selectedBudget,
      agreedToTerms,
    });
  };

  return (
    <Box
      component="section"
      id="hire-me"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(120deg, rgba(0,0,0,0.92) 0%, rgba(162,57,255,0.18) 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: { xs: 6, md: 8 },
            fontSize: { xs: "2.5rem", md: "4rem" },
            letterSpacing: "0.01em",
            textShadow: "0 2px 16px #A239FF22",
          }}
        >
          {title}
        </Typography>
        <FadeInForm>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Services Section */}
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: "1.125rem",
                    letterSpacing: "0.01em",
                    color: "#fff",
                  }}
                >
                  Services
                </Typography>
                <Grid container spacing={2}>
                  {services.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service}>
                      <ModernOptionButton
                        active={selectedService === service}
                        onClick={() => handleServiceChange(service)}
                      >
                        {service}
                      </ModernOptionButton>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Budget Section */}
              {/* <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: "1.125rem",
                    letterSpacing: "0.01em",
                    color: "#fff",
                  }}
                >
                  Budget in USD
                </Typography>
                <Grid container spacing={2}>
                  {budgets.map((budget) => (
                    <Grid item xs={6} md={3} key={budget}>
                      <ModernOptionButton
                        active={selectedBudget === budget}
                        onClick={() => handleBudgetChange(budget)}
                      >
                        {budget}
                      </ModernOptionButton>
                    </Grid>
                  ))}
                </Grid>
              </Grid> */}

              {/* Personal Data Section */}
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: "1.125rem",
                    letterSpacing: "0.01em",
                    color: "#fff",
                  }}
                >
                  Personal Data
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <ModernTextField
                      fullWidth
                      placeholder="First Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ModernTextField
                      fullWidth
                      placeholder="Last Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ModernTextField
                      fullWidth
                      placeholder="Email"
                      variant="outlined"
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ModernTextField
                      fullWidth
                      placeholder="Project Details (Optional)"
                      variant="outlined"
                      multiline
                      rows={1}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="attach file"
                              edge="end"
                              sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                            >
                              <AttachFileIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Privacy Policy Checkbox */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreedToTerms}
                      onChange={handleTermsChange}
                      sx={{
                        color: "#A239FF",
                        "&.Mui-checked": {
                          color: "#A239FF",
                        },
                      }}
                    />
                  }
                  label={termsText}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.95rem",
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <ModernHireMeButton
                  type="submit"
                  endIcon={<ArrowForwardIcon />}
                  disabled={!agreedToTerms}
                >
                  Hire Me
                </ModernHireMeButton>
              </Grid>
            </Grid>
          </form>
        </FadeInForm>
      </Container>
    </Box>
  );
};

export default HireMeSection;
