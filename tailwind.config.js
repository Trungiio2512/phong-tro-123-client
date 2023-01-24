/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "#f5f5f5",
                secondary1: "#1266dd",
                secondary2: "#f73859",
                "overlay-50": "rgba(0, 0, 0, 0.5)",
                "overlay-70": "rgba(0, 0, 0, 0.7)",
            },
            width: {
                1100: "1100px",
                200: "200px",
            },
            maxWidth: {
                600: "600px",
                1100: "1100px",
            },
            minWidth: {
                200: "200px",
            },
            height: {
                200: "200px",
            },
            borderWidth: {
                1: "1px",
            },
            boxShadow: {
                type1: "0 0 10px 1px rgb(0 0 0 / 15%);",
                type2: "0 0 10px 1px rgb(0 0 0 / 5%);",
            },
            margin: {
                200: "200px",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
