/**
 * @Note Please reset react app whenever you modify something inside
 */
module.exports = {
  // important: true,
  purge: ["./src/**/*.tsx"],
  darkMode: false,
  theme: {
    screens: {
      phone: "600px",
      // => @media (min-width: 600px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1270px",
      // => @media (min-width: 1270px) { ... }
    },
    colors: {
      primary: {
        light: "#334b89",
        DEFAULT: "#001E6C",
        dark: "#00154b",
      },
      secondary: "#035397",
      tertiary: "#F7F8FB",
      linear: "linear-gradient(180deg, #001E6C 0%, #035397 100%)",
      black: "#1B0F0F",
      white: "#FFFFFF",
      line: "#E9E9E9",
      body: "#959494",
      success: "#1E95EB",
      error: "#C72C41",
      warring: "#F88F01",
    },
    fontSize: {
      DEFAULT: "13px",
      none: "0",
      "2xs": "10px",
      xs: "12px",
      sm: "13px",
      md: "14px",
      lg: "16px",
      xl: "20px",
      mxl: "26px",
      "2xl": "30px",
      "3xl": "32px",
      "4xl": "48px",
    },
    /**
     * 1 means 10px
     */
    spacing: {
      0: "0",
      0.1: "1px",
      0.2: "2px",
      0.5: "5px",
      1: "10px",
      1.3: "13px",
      1.5: "15px",
      1.8: "18px",
      1.9: "19px",
      2: "20px",
      2.5: "25px",
      3: "30px",
      3.5: "35px",
      4: "40px",
      4.3: "43px",
      4.5: "45px",
      4.8: "48px",
      5: "50px",
      5.5: "55px",
      6: "60px",
      7: "70px",
      7.5: "75px",
      8: "80px",
      10: "100px",
      11: "110px",
      12: "120px",
      13: "130px",
      15: "150px",
      17: "170px",
      20: "200px",
      24: "240px",
      25: "250px",
      26: "260px",
      30: "300px",
      32: "320px",
      35: "350px",
      40: "400px",
      46: "460px",
      50: "500px",
      60: "600px",
    },
    opacity: {
      0: "0",
      20: "0.2",
      40: "0.4",
      60: "0.6",
      80: "0.8",
      100: "1",
    },
    fontWeight: {
      DEFAULT: 400,
      thin: 100,
      light: 200,
      "extra-light": 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      "extra-bold": 800,
      black: 900,
      heavy: 900,
    },

    fontFamily: {
      sans: ["SVN-Gilroy", "sans-serif"],
    },

    extend: {
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "1fr-auto": "1fr auto",
      },
      borderRadius: {
        md: "5px",
        lg: "8px",
        xl: "10px",
        xxl: "15px",
      },
      zIndex: {
        "-1": "-1",
      },
      cursor: {
        "zoom-in": "zoom-in",
      },
      boxShadow: {
        md: "2px 0px 20px -2px rgba(0, 0, 0, 0.05)",
      },
      minWidth: {
        17: "170px",
        20: "200px",
        30: "300px",
      },
      maxWidth: {
        11: "110px",
        36: "360px",
        55: "550px",
      },
      minHeight: {
        10: "100px",
        12: "120px",
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
