import "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    customH1: React.CSSProperties;
    customL1: React.CSSProperties;
    customL2: React.CSSProperties;
    customL1SemiBold: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    customH1?: React.CSSProperties;
    customL1?: React.CSSProperties;
    customL2?: React.CSSProperties;
    customL1SemiBold?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    customH1: true;
    customL1: true;
    customL2: true;
    customL1SemiBold: true;
  }
}

const theme = createTheme({
  typography: {
    customH1: {
      fontFamily: "Inter",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "28px",
      color: "#e1eeff",
    },
    customL1: {
      fontFamily: "Inter",
      fontSize: "20px",
      fontWeight: 500,
      color: "#DCDDDE",
    },
    customL2: {
      fontFamily: "Inter",
      fontSize: "18px",
      fontWeight: 400,
      color: "#7A8598",
    },
    customL1SemiBold: {
      fontFamily: "Inter",
      fontSize: "20px",
      fontWeight: 600,
      color: "#fff",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "15vw",
          background: "#0E0E0E",
          color: "#e1eeff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
        },
        input: {
          color: "#fff",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        text: {
          alignSelf: "center",
          height: "40px",
          minWidth: "70px",
          "&.Mui-disabled": {
            color: "grey",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#364154",
            color: "white",
          },
          "&.Mui-selected": {
            backgroundColor: "#364154",
            color: "#e1eeff",
            ":hover": {
              backgroundColor: "#364154",
              color: "#e1eeff",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          root: {
            minWidth: 275,
            margin: 3,
            padding: 3,
            textAlign: "center",
            color: "text.primary",
            boxShadow: 3,
            borderRadius: 2,
          },
        },
      },
    },
  },
});

export default theme;
