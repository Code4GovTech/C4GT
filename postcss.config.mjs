/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Use the correct package
    autoprefixer: {}, // Include autoprefixer if needed
  }
};

export default config;