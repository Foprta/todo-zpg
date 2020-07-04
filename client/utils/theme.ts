export const themeColors = {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#444",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
};

export default (theme) => ({
  "@global": {
    "body,html": { margin: 0, padding: 0 },
    body: {
      background:
        "linear-gradient(80deg, rgba(0,255,199,1) 0%, rgba(0,255,241,1) 100%)",
      [theme.breakpoints.only("xs")]: {
        background:
          "linear-gradient(170deg, rgba(0,255,199,1) 0%, rgba(0,255,241,1) 100%)",
      },
    },
  },
});
