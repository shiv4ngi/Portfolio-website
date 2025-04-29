import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MarqueeContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
  background: "#111",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  position: "relative",
  height: 64,
  display: "flex",
  alignItems: "center",
}));

const MarqueeTrack = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  animation: "marquee 18s linear infinite",
  "@keyframes marquee": {
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(-50%)" },
  },
}));

const MarqueeText = styled(Typography)(({ theme, active }) => ({
  color: active ? "#fff" : "rgba(255,255,255,0.5)",
  fontWeight: 500,
  fontSize: 32,
  letterSpacing: 2,
  margin: "0 48px",
  transition: "color 0.3s",
  display: "inline-block",
}));

const items = [
  { label: "BACK END", active: false },
  { label: "WEBFLOW", active: false },
  { label: "FULL STACK", active: false },
  { label: "FRONT END", active: true },
  { label: "BACK END", active: false },
];

const MarqueeStrip = () => {
  // Repeat the items to ensure smooth infinite scroll
  const marqueeItems = [...items, ...items];
  return (
    <MarqueeContainer>
      <MarqueeTrack>
        {marqueeItems.map((item, idx) => (
          <MarqueeText key={idx} active={item.active ? 1 : 0}>
            {item.label}
          </MarqueeText>
        ))}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default MarqueeStrip;
