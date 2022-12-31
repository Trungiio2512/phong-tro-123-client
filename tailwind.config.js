/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            width: {
                1100: "1100px",
            },
            backgroundColor: {
                primary: "#f5f5f5",
                secondary1: "#1266dd",
                secondary2: "#f73859",
                "overlay-50": "rgba(0, 0, 0, 0.5)",
            },
            maxWidth: {
                600: "600px",
                1100: "1100px",
            },
            borderWidth: {
                1: "1px",
            },
            boxShadow: {
                type1: "0 0 10px 1px rgb(0 0 0 / 15%);",
                type2: "0 0 10px 1px rgb(0 0 0 / 5%);",
            },
            // caretColor: {
            //     primary: ''
            // }
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
