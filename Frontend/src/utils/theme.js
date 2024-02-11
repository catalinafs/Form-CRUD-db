import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#C987E3",
            contrastText: "#f3e5f9",
        },
    },
    typography: {
        fontFamily: 'Helvetica, Arial, sans-serif',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                fontWeight: 500,
            },
        },
        MuiSkeleton: {
            defaultProps: {
                animation: "wave",
            },
            styleOverrides: {
                root: {
                    "-webkit-transform": "scale(1)",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    '&.Mui-focused': {
                        color: '#c987e3',
                    },
                    '&:not(.Mui-focused)': {
                        color: '#ad74c4',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    "& .MuiOutlinedInput-root": {
                        fontWeight: 500,
                        color: "#f8f8f8",
                        borderRadius: "8px",
                        '& fieldset': {
                            borderColor: '#ad74c4',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#c987e3',
                        },
                        '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) fieldset': {
                            borderColor: '#dc91fa',
                        },
                    },
                },
            },
            variants: [
                {
                    props: { variant: "outlined" },
                    style: {
                        borderColor: "red !important",
                        "input::before": {
                            borderBottomColor: "red !important"
                        }
                    }
                }
            ]
        },
        MuiButton: {
            defaultProps: {
                variant: "outlined",
            },
            variants: [
                {
                    props: { variant: "outlined" },
                    style: {
                        color: '#F3E5F9',
                        fontWeight: 600,
                        borderColor: '#861f40c9',
                        borderWidth: "2px",
                        ":hover": {
                            borderWidth: "2px",
                        },
                    },
                },
                {
                    props: { variant: "contained" },
                    style: {
                        color: '#221427',
                        backgroundColor: "#c987e3e0",
                        border: 0,
                        ":hover": {
                            backgroundColor: "#C987E3",
                        },
                    },
                },
            ],
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: "5px",
                    textTransform: "none",
                    padding: "8px 18px",
                },
            },
        },
    },
});

export default theme;