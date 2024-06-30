// tailwind.config.js

import daisyui from 'daisyui';
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins:["Poppins"]
      }
    },
    
  },
  plugins: [
    daisyui,
    scrollbarHide,
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave", "black", "forest", "luxury", "halloween"],
  },
};
