import React from "react";
import { Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { usePortfolio } from "../context/PortfolioContext";

const SocialIcons = () => {
  const portfolioData = usePortfolio();
  const { social } = portfolioData.profile;

  return (
    <Box display="flex" gap={1}>
      {social.map((item) => {
        let Icon;

        if (item.platform === "facebook") {
          Icon = FacebookIcon;
        } else if (item.platform === "twitter") {
          Icon = TwitterIcon;
        } else if (item.platform === "instagram") {
          Icon = InstagramIcon;
        }

        return (
          <IconButton
            key={item.platform}
            aria-label={item.platform}
            component="a"
            href={item.url}
            target="_blank"
            sx={{
              color: "white",
              "&:hover": { color: "primary.main" },
            }}
          >
            <Icon />
          </IconButton>
        );
      })}
    </Box>
  );
};

export default SocialIcons;
