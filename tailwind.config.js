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
            backgroundImage: {
                "blue-rb":
                    "linear-gradient(to right bottom, #0245e6, #0072fb, #0094fd, #00b1f4, #04cae8)",
            },
            textColor: {
                333: "#333333",
            },
            width: {
                1100: "1100px",
                200: "200px",
            },
            maxWidth: {
                400: "400px",
                600: "600px",
                1100: "1100px",
            },
            minWidth: {
                200: "200px",
                100: "100px",
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
            colors: {
                "dark-purple": "#081a51",
                "light-white": "rgba(255,255,255,0.17)",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
