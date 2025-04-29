# React Portfolio Website

A modern, responsive portfolio website built with React and Material UI.

## Features

- Dark theme with modern UI
- Fully responsive design
- Centralized data management through a JSON file
- Clean component architecture

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Customizing Your Portfolio

All portfolio content is stored in a single JSON file at `src/data/portfolio.json`. To customize the portfolio with your own information, simply edit this file.

### JSON Structure

```json
{
  "header": {
    "logo": "Your Logo Text",
    "navItems": [{ "name": "Menu Item", "path": "/path" }]
  },
  "hero": {
    "name": "Your Name"
  },
  "profile": {
    "biography": "Your bio text here...",
    "skills": "Your skills here...",
    "social": [
      { "platform": "facebook", "url": "your-url" },
      { "platform": "twitter", "url": "your-url" },
      { "platform": "instagram", "url": "your-url" }
    ],
    "image": "your-image-url",
    "stats": [{ "value": "123", "label": "STAT LABEL" }]
  },
  "services": {
    "title": "Section Title",
    "items": [
      {
        "number": "01",
        "title": "Service Title",
        "icon": "icon-name",
        "description": "Service description..."
      }
    ]
  }
}
```

## Technologies Used

- React 19+
- Material UI 5+
- React Router
- Context API for state management
