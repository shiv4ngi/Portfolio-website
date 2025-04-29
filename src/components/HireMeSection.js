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
const ServiceButton = styled(Button)(({ theme, active }) => ({
  backgroundColor: active ? "#A239FF" : "rgba(255, 255, 255, 0.05)",
  color: "white",
  borderRadius: 0,
  padding: "14px 20px",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "16px",
  "&:hover": {
    backgroundColor: active ? "#9B30FF" : "rgba(255, 255, 255, 0.1)",
  },
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  position: "relative",
}));

const BudgetButton = styled(Button)(({ theme, active }) => ({
  backgroundColor: active ? "#A239FF" : "rgba(255, 255, 255, 0.05)",
  color: "white",
  borderRadius: 0,
  padding: "14px 20px",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "16px",
  "&:hover": {
    backgroundColor: active ? "#9B30FF" : "rgba(255, 255, 255, 0.1)",
  },
  display: "flex",
  justifyContent: "center",
  width: "100%",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 0,
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px 20px",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.5)",
  },
}));

const ActiveDot = styled(Box)(({ theme }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "white",
  position: "absolute",
  left: "8px",
  top: "50%",
  transform: "translateY(-50%)",
}));

const HireMeButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#A239FF",
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
          "linear-gradient(to right, rgba(0,0,0,0.9), rgba(138, 43, 226, 0.2))",
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
          }}
        >
          {title}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Services Section */}
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: "1.125rem",
                }}
              >
                Services
              </Typography>
              <Grid container spacing={2}>
                {services.map((service) => (
                  <Grid item xs={12} md={6} lg={2.4} key={service}>
                    <ServiceButton
                      active={selectedService === service}
                      onClick={() => handleServiceChange(service)}
                    >
                      {/* {selectedService === service && <ActiveDot />} */}
                      <Box sx={{ pl: selectedService === service ? 2 : 0 }}>
                        {service}
                      </Box>
                    </ServiceButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Budget Section */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: "1.125rem",
                }}
              >
                Budget in USD
              </Typography>
              <Grid container spacing={2}>
                {budgets.map((budget) => (
                  <Grid item xs={6} md={3} key={budget}>
                    <BudgetButton
                      active={selectedBudget === budget}
                      onClick={() => handleBudgetChange(budget)}
                    >
                      {budget}
                    </BudgetButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Personal Data Section */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: "1.125rem",
                }}
              >
                Personal Data
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    placeholder="First Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    placeholder="Last Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StyledTextField
                    fullWidth
                    placeholder="Email"
                    variant="outlined"
                    type="email"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    placeholder="Project Details (Optional)"
                    variant="outlined"
                    multiline
                    rows={4}
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
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <HireMeButton
                type="submit"
                endIcon={<ArrowForwardIcon />}
                disabled={!agreedToTerms}
              >
                Hire Me
              </HireMeButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default HireMeSection;
